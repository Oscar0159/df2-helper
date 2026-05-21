'use client';

import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  closestCenter,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  AlertCircle,
  Check,
  ChevronDown,
  ChevronUp,
  ChevronUpCircle,
  Hash,
  Lightbulb,
  LightbulbOff,
  Pause,
  Play,
  RefreshCcw,
  Shuffle,
  SkipForward,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';

import {
  startTransition,
  useDeferredValue,
  useEffect,
  useEffectEvent,
  useMemo,
  useState,
} from 'react';

import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { cn } from '@/lib/utils';

import {
  type SlidingPuzzleGrid,
  type SlidingPuzzleStepDirection,
  canSlideTile,
  createGoalGrid,
  createShuffledGrid,
  findValue,
  getSolutionDetails,
  isSolved,
  slideTile,
  swapTiles,
} from './utils/sliding-puzzle-solver';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

const sizeOptions = [
  { label: '3x2', rows: 3, cols: 2 },
  { label: '3x3', rows: 3, cols: 3 },
] as const;

const imageOptions = [
  { id: 'musee', src: '/images/musee.png' },
  { id: 'saint', src: '/images/saint.png' },
  { id: 'witches', src: '/images/witches.png' },
  { id: 'dragon', src: '/images/dragon.png' },
  { id: 'horse', src: '/images/horse.png' },
  { id: 'saturn', src: '/images/saturn.png' },
  { id: 'satan', src: '/images/satan.png' },
  { id: 'severed', src: '/images/severed.png' },
] as const;

const defaultSize = sizeOptions[1];
const defaultImageId = imageOptions[0].id;
const playbackSpeedOptions = [0.5, 1.0, 1.5, 2.0] as const;
type SizeOption = (typeof sizeOptions)[number];

function formatImageLabel(id: string) {
  return id.charAt(0).toUpperCase() + id.slice(1);
}

function createResetBoard(rows: number, cols: number) {
  return createGoalGrid(rows, cols);
}

function createShuffledBoard(rows: number, cols: number) {
  return createShuffledGrid(rows, cols);
}

function getGoalPosition(tile: number, cols: number, rows: number) {
  if (tile === 0) {
    return { row: rows - 1, col: cols - 1 };
  }

  return {
    row: Math.floor((tile - 1) / cols),
    col: (tile - 1) % cols,
  };
}

function getDirectionLabel(
  direction: SlidingPuzzleStepDirection,
  t: ReturnType<typeof useTranslations>,
) {
  return t(`directions.${direction}`);
}

function getBoardGridClass(size: SizeOption) {
  if (size.label === '3x2') {
    return 'h-[min(72vw,26rem)] gap-2 sm:h-104 sm:gap-2.5';
  }

  return 'h-[min(72vw,26rem)] gap-2 sm:h-104 sm:gap-3';
}

function getSuggestionBadgeClass(cols: number) {
  return cols === 2 ? 'top-1.5 right-1.5 size-5.5 text-[10px]' : 'top-2 right-2 size-6 text-[11px]';
}

function getNumberBadgeClass(cols: number) {
  return cols === 2
    ? 'bottom-1.5 left-1.5 px-1.5 py-0.5 text-[10px]'
    : 'bottom-2 left-2 px-2 py-1 text-[11px]';
}

export function SlidingPuzzleClient() {
  const t = useTranslations('tools.slidingPuzzle');
  const [size, setSize] = useState<SizeOption>(defaultSize);
  const [imageId, setImageId] = useState<(typeof imageOptions)[number]['id']>(defaultImageId);
  const [board, setBoard] = useState<SlidingPuzzleGrid>(() =>
    createResetBoard(defaultSize.rows, defaultSize.cols),
  );
  const [showNumbers, setShowNumbers] = useState(false);
  const [showSolution, setShowSolution] = useState(true);
  const [solutionExpanded, setSolutionExpanded] = useState(false);
  const [isPlayingSolution, setIsPlayingSolution] = useState(false);
  const [isImageDrawerOpen, setIsImageDrawerOpen] = useState(false);
  const [isDesktopImageDrawer, setIsDesktopImageDrawer] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<(typeof playbackSpeedOptions)[number]>(1);
  const [activeDragId, setActiveDragId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const deferredBoard = useDeferredValue(board);
  const solution = useMemo(() => getSolutionDetails(deferredBoard), [deferredBoard]);
  const solved = useMemo(() => isSolved(board), [board]);
  const currentImage = imageOptions.find((option) => option.id === imageId) ?? imageOptions[0];

  const cells = useMemo(() => {
    return board.flatMap((row, rowIndex) =>
      row.map((tile, colIndex) => {
        const goalPosition = getGoalPosition(tile, size.cols, size.rows);

        return {
          cellId: `cell-${rowIndex}-${colIndex}`,
          tileId: tile === 0 ? null : `tile-${tile}`,
          rowIndex,
          colIndex,
          tile,
          goalRow: goalPosition.row,
          goalCol: goalPosition.col,
          isBlank: tile === 0,
          isMovable: tile === 0 ? false : canSlideTile(board, rowIndex, colIndex),
        };
      }),
    );
  }, [board, size.cols, size.rows]);

  const cellMap = useMemo(() => new Map(cells.map((cell) => [cell.cellId, cell])), [cells]);
  const tileMap = useMemo(
    () => new Map(cells.filter((cell) => cell.tileId).map((cell) => [cell.tileId as string, cell])),
    [cells],
  );

  const activeTile = activeDragId ? tileMap.get(activeDragId) : undefined;
  const previewSteps = solution.steps.slice(0, 3);
  const boardGridClass = getBoardGridClass(size);

  const boardStatusLabel = solved
    ? t('status.solved')
    : solution.hasSolution
      ? t('status.solvable')
      : t('status.unsolvable');

  const resetBoard = (rows = size.rows, cols = size.cols) => {
    startTransition(() => {
      setBoard(createResetBoard(rows, cols));
    });
  };

  const shuffleBoard = (rows = size.rows, cols = size.cols) => {
    startTransition(() => {
      setBoard(createShuffledBoard(rows, cols));
    });
  };

  const handleSizeChange = (nextSize: SizeOption) => {
    if (nextSize.label === size.label) {
      return;
    }

    setIsPlayingSolution(false);
    setSize(nextSize);
    resetBoard(nextSize.rows, nextSize.cols);
  };

  const handleTileClick = (tile: number) => {
    if (tile === 0) {
      return;
    }

    setIsPlayingSolution(false);

    setBoard((current) => {
      const [row, col] = findValue(current, tile);
      return slideTile(current, row, col) ?? current;
    });
  };

  const applyNextStep = useEffectEvent(() => {
    setBoard((current) => {
      const nextMove = getSolutionDetails(current).steps[0];

      if (!nextMove) {
        return current;
      }

      const [row, col] = findValue(current, nextMove.tile);
      return slideTile(current, row, col) ?? current;
    });
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1280px)');

    const updateDrawerDirection = (event?: MediaQueryListEvent) => {
      setIsDesktopImageDrawer(event?.matches ?? mediaQuery.matches);
    };

    updateDrawerDirection();
    mediaQuery.addEventListener('change', updateDrawerDirection);

    return () => {
      mediaQuery.removeEventListener('change', updateDrawerDirection);
    };
  }, []);

  useEffect(() => {
    if (!isPlayingSolution || !showSolution || !solution.hasSolution || solved) {
      return;
    }

    const timer = window.setInterval(() => {
      applyNextStep();
    }, 700 / playbackSpeed);

    return () => window.clearInterval(timer);
  }, [applyNextStep, isPlayingSolution, playbackSpeed, showSolution, solution.hasSolution, solved]);

  useEffect(() => {
    if (solved || !showSolution || !solution.hasSolution) {
      setIsPlayingSolution(false);
    }
  }, [showSolution, solution.hasSolution, solved]);

  const handleDragStart = (event: DragStartEvent) => {
    setIsPlayingSolution(false);
    setActiveDragId(String(event.active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const activeId = String(event.active.id);
    const overId = event.over ? String(event.over.id) : null;

    setActiveDragId(null);

    if (!overId) {
      return;
    }

    const sourceCell = tileMap.get(activeId);
    const targetCell = cellMap.get(overId);

    if (!sourceCell || !targetCell) {
      return;
    }

    if (
      sourceCell.rowIndex === targetCell.rowIndex &&
      sourceCell.colIndex === targetCell.colIndex
    ) {
      return;
    }

    setBoard((current) =>
      swapTiles(
        current,
        sourceCell.rowIndex,
        sourceCell.colIndex,
        targetCell.rowIndex,
        targetCell.colIndex,
      ),
    );
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] xl:items-start">
      <div className="space-y-6 xl:col-start-1 xl:row-start-1">
        <Card>
          <CardHeader>
            <p className="mr-auto text-sm leading-none font-medium">{t('controlsTitle')}</p>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-3">
              <p className="text-muted-foreground text-xs">{t('sizeTitle')}</p>
              <div className="flex flex-wrap items-center gap-2">
                {sizeOptions.map((option) => (
                  <Button
                    key={option.label}
                    variant={size.label === option.label ? 'default' : 'outline'}
                    onClick={() => handleSizeChange(option)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-muted-foreground text-xs">{t('actionsTitle')}</p>
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="outline" onClick={() => resetBoard()}>
                  <RefreshCcw />
                  {t('actions.reset')}
                </Button>
                <Button variant="outline" onClick={() => shuffleBoard()}>
                  <Shuffle />
                  {t('actions.shuffle')}
                </Button>
                <Button
                  variant={showSolution ? 'default' : 'outline'}
                  onClick={() => setShowSolution((current) => !current)}
                >
                  {showSolution ? <Lightbulb /> : <LightbulbOff />}
                  {t('actions.showSolution')}
                </Button>
                <Button
                  variant={showNumbers ? 'default' : 'outline'}
                  onClick={() => setShowNumbers((current) => !current)}
                >
                  <Hash />
                  {t('actions.showNumbers')}
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-muted-foreground text-xs">{t('imageTitle')}</p>

              <Drawer
                direction={isDesktopImageDrawer ? 'left' : 'bottom'}
                open={isImageDrawerOpen}
                onOpenChange={setIsImageDrawerOpen}
              >
                <DrawerTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    <span>{formatImageLabel(currentImage.id)}</span>
                    <ChevronDown />
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>{t('imageTitle')}</DrawerTitle>
                    <DrawerDescription>{t('imageDescription')}</DrawerDescription>
                  </DrawerHeader>
                  <div className="px-4 pb-6">
                    <ImagePickerGrid
                      imageId={imageId}
                      onSelect={(nextImageId) => {
                        setImageId(nextImageId);
                        setIsImageDrawerOpen(false);
                      }}
                    />
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-wrap items-center justify-between gap-3">
            <Badge variant="secondary">{size.label}</Badge>
            <Badge variant="secondary">{boardStatusLabel}</Badge>
          </CardHeader>
          <CardContent>
            <Item variant="muted">
              <ItemContent>
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                >
                  <div className="flex justify-center">
                    <div
                      className={cn('grid', boardGridClass)}
                      style={{
                        gridTemplateColumns: `repeat(${size.cols}, minmax(0, 1fr))`,
                        aspectRatio: `${size.cols} / ${size.rows}`,
                      }}
                    >
                      {cells.map((cell) => {
                        return (
                          <PuzzleCell
                            key={cell.cellId}
                            id={cell.cellId}
                            imageSrc={currentImage.src}
                            rows={size.rows}
                            cols={size.cols}
                            showNumbers={showNumbers}
                            emptyLabel={t('emptySlot')}
                            highlightBlank={false}
                            suggestedIndex={undefined}
                            suggestedTile={false}
                            onTileClick={handleTileClick}
                            {...cell}
                          />
                        );
                      })}
                    </div>
                  </div>

                  <DragOverlay>
                    {activeTile ? (
                      <PuzzleTilePreview
                        tile={activeTile.tile}
                        imageSrc={currentImage.src}
                        goalRow={activeTile.goalRow}
                        goalCol={activeTile.goalCol}
                        rows={size.rows}
                        cols={size.cols}
                        showNumbers={showNumbers}
                        isOverlay
                      />
                    ) : null}
                  </DragOverlay>
                </DndContext>
              </ItemContent>
            </Item>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex items-center gap-2">
          <p className="mr-auto text-sm leading-none font-medium">{t('solutionTitle')}</p>
          <Button variant="ghost" onClick={() => setSolutionExpanded((current) => !current)}>
            {solutionExpanded ? <ChevronUpCircle /> : <ChevronDown />}
            {solutionExpanded ? t('actions.collapseSolution') : t('actions.expandSolution')}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {!solution.hasSolution ? (
            <Alert variant="destructive" className="border-destructive/50 bg-destructive/10">
              <AlertCircle />
              <AlertTitle>{t('noSolution')}</AlertTitle>
            </Alert>
          ) : !showSolution ? (
            <Item variant="muted">
              <ItemContent>
                <ItemDescription>{t('solutionHidden')}</ItemDescription>
              </ItemContent>
            </Item>
          ) : solved ? (
            <Item variant="muted">
              <ItemContent>
                <ItemDescription>{t('alreadySolved')}</ItemDescription>
              </ItemContent>
            </Item>
          ) : (
            <div className="space-y-4">
              <Item variant="muted">
                <ItemContent className="space-y-4">
                  <div className="space-y-3">
                    <p className="text-muted-foreground text-xs">{t('playbackSpeedTitle')}</p>
                    <ButtonGroup>
                      {playbackSpeedOptions.map((speed) => (
                        <Button
                          key={speed}
                          variant={playbackSpeed === speed ? 'default' : 'outline'}
                          onClick={() => setPlaybackSpeed(speed)}
                          disabled={solved || !solution.hasSolution}
                          className="px-4"
                        >
                          {speed.toFixed(1)}
                        </Button>
                      ))}
                    </ButtonGroup>
                  </div>
                  <div className="space-y-3">
                    <p className="text-muted-foreground text-xs">{t('solutionTitle')}</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <Button
                        variant="outline"
                        onClick={applyNextStep}
                        disabled={!solution.hasSolution || solved}
                      >
                        <SkipForward className="size-4" />
                        {t('actions.applyNext')}
                      </Button>
                      <Button
                        variant={isPlayingSolution ? 'default' : 'outline'}
                        onClick={() => setIsPlayingSolution((current) => !current)}
                        disabled={solved || !solution.hasSolution}
                      >
                        {isPlayingSolution ? (
                          <Pause className="size-4" />
                        ) : (
                          <Play className="size-4" />
                        )}
                        {t('actions.playSolution')}
                      </Button>
                    </div>
                  </div>
                </ItemContent>
              </Item>

              <Item variant="muted">
                <ItemContent>
                  <ItemTitle>{t('solutionCount', { count: solution.steps.length })}</ItemTitle>
                  <ItemDescription>{t('solutionHint')}</ItemDescription>
                </ItemContent>
              </Item>

              {solutionExpanded ? (
                <ScrollArea type="auto" className="h-80 max-h-80 pr-4">
                  <div className="space-y-2">
                    {solution.steps.map((step) => (
                      <Item key={`${step.index}-${step.tile}`} variant="outline">
                        <ItemMedia>
                          <Badge className="aspect-square size-8 text-sm font-semibold">
                            {step.index}
                          </Badge>
                        </ItemMedia>
                        <ItemContent>
                          <ItemTitle>
                            {t('stepLabel', {
                              tile: step.tile,
                              direction: getDirectionLabel(step.direction, t),
                            })}
                          </ItemTitle>
                        </ItemContent>
                      </Item>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="grid gap-2">
                  {previewSteps.map((step) => (
                    <Item key={`${step.index}-${step.tile}`} variant="outline">
                      <ItemMedia>
                        <Badge className="aspect-square size-8 text-sm font-semibold">
                          {step.index}
                        </Badge>
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle>
                          {t('stepLabel', {
                            tile: step.tile,
                            direction: getDirectionLabel(step.direction, t),
                          })}
                        </ItemTitle>
                      </ItemContent>
                    </Item>
                  ))}

                  {solution.steps.length > previewSteps.length ? (
                    <p className="text-muted-foreground px-1 text-sm">
                      {t('solutionCollapsedHint', {
                        count: solution.steps.length - previewSteps.length,
                      })}
                    </p>
                  ) : null}
                </div>
              )}
            </div>
          )}

          <Item variant="outline">
            <ItemContent>
              <ItemTitle>{t('rulesTitle')}</ItemTitle>
              <ItemDescription>{t('rulesDescription')}</ItemDescription>
            </ItemContent>
          </Item>
        </CardContent>
      </Card>
    </div>
  );
}

function ImagePickerGrid({
  imageId,
  onSelect,
}: {
  imageId: (typeof imageOptions)[number]['id'];
  onSelect: (imageId: (typeof imageOptions)[number]['id']) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 xl:grid-cols-2">
      {imageOptions.map((option) => {
        const active = option.id === imageId;

        return (
          <motion.button
            type="button"
            key={option.id}
            onClick={() => onSelect(option.id)}
            whileHover={{ y: -2, scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
            className={cn(
              'group relative aspect-square overflow-hidden rounded-[16px] text-left transition-all duration-200',
              active ? '-translate-y-0.5' : 'hover:-translate-y-0.5',
              active ? 'ring-primary ring-2' : 'ring-border/50 hover:ring-foreground/20 ring-1',
            )}
          >
            <Image
              src={option.src}
              alt={formatImageLabel(option.id)}
              fill
              sizes="(max-width: 768px) 24vw, (max-width: 1280px) 120px, 144px"
              className={cn(
                'object-fill transition-all duration-200 group-hover:scale-[1.02]',
                !active && 'saturate-[0.88] group-hover:saturate-100',
              )}
            />
            <div
              className={cn(
                'absolute inset-0 bg-linear-to-t from-black/45 via-black/10 to-transparent transition-colors',
                active ? 'from-black/52' : 'group-hover:from-black/50',
              )}
            />
            <AnimatePresence>
              {active ? (
                <motion.span
                  initial={{ opacity: 0, scale: 0.7, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.7, y: -4 }}
                  transition={{
                    type: 'spring',
                    stiffness: 380,
                    damping: 24,
                  }}
                  className="bg-primary text-primary-foreground absolute top-2 right-2 flex size-6 items-center justify-center rounded-full shadow-sm"
                >
                  <Check className="size-3.5" />
                </motion.span>
              ) : null}
            </AnimatePresence>
            <div className="absolute inset-x-0 bottom-0 p-2.5 text-white">
              <p className="truncate text-xs font-medium sm:text-sm">
                {formatImageLabel(option.id)}
              </p>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}

function PuzzleCell({
  id,
  tile,
  goalRow,
  goalCol,
  rows,
  cols,
  imageSrc,
  isBlank,
  isMovable,
  showNumbers,
  emptyLabel,
  highlightBlank,
  suggestedIndex,
  suggestedTile,
  onTileClick,
}: {
  id: string;
  tile: number;
  goalRow: number;
  goalCol: number;
  rows: number;
  cols: number;
  imageSrc: string;
  isBlank: boolean;
  isMovable: boolean;
  showNumbers: boolean;
  emptyLabel: string;
  highlightBlank: boolean;
  suggestedIndex?: number;
  suggestedTile: boolean;
  onTileClick: (tile: number) => void;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <motion.div
      layout
      transition={{ type: 'spring', stiffness: 260, damping: 26 }}
      ref={setNodeRef}
      className={cn(
        'relative overflow-hidden rounded-lg transition-all duration-200',
        isBlank
          ? 'bg-background/75 ring-border/60 ring-dashed ring-1'
          : 'bg-background/35 ring-border/40 ring-1',
        highlightBlank && 'ring-primary/70 shadow-[0_0_0_4px_rgba(24,24,27,0.06)] ring-2',
        isOver && 'ring-primary/60 ring-2',
      )}
    >
      <div className="aspect-square">
        {isBlank ? (
          <div className="text-muted-foreground absolute inset-0 grid place-items-center text-center text-xs leading-none tracking-[0.18em] uppercase">
            {emptyLabel}
          </div>
        ) : (
          <DraggablePuzzleTile
            id={`tile-${tile}`}
            tile={tile}
            goalRow={goalRow}
            goalCol={goalCol}
            rows={rows}
            cols={cols}
            imageSrc={imageSrc}
            isMovable={isMovable}
            showNumbers={showNumbers}
            suggestedIndex={suggestedIndex}
            suggestedTile={suggestedTile}
            onClick={() => onTileClick(tile)}
          />
        )}
      </div>
    </motion.div>
  );
}

function DraggablePuzzleTile({
  id,
  tile,
  goalRow,
  goalCol,
  rows,
  cols,
  imageSrc,
  isMovable,
  showNumbers,
  suggestedIndex,
  suggestedTile,
  onClick,
}: {
  id: string;
  tile: number;
  goalRow: number;
  goalCol: number;
  rows: number;
  cols: number;
  imageSrc: string;
  isMovable: boolean;
  showNumbers: boolean;
  suggestedIndex?: number;
  suggestedTile: boolean;
  onClick: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
  });
  const suggestionBadgeClass = getSuggestionBadgeClass(cols);

  return (
    <motion.button
      layout
      type="button"
      ref={setNodeRef}
      whileHover={
        isDragging ? undefined : { y: isMovable ? -2 : -1, scale: isMovable ? 1.01 : 1.005 }
      }
      whileTap={{ scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      className={cn(
        'bg-card focus-visible:ring-ring/50 relative size-full overflow-hidden rounded-lg text-left transition-all duration-200 outline-none focus-visible:ring-3',
        isMovable && 'ring-primary/60 cursor-pointer ring-2',
        isMovable && 'shadow-[0_10px_24px_rgba(24,24,27,0.08)]',
        !isMovable && 'ring-border/50 cursor-grab ring-1',
        !isMovable && 'hover:ring-foreground/20 shadow-[0_8px_20px_rgba(24,24,27,0.06)]',
        suggestedTile && 'shadow-[0_10px_30px_rgba(24,24,27,0.12)]',
        isDragging && 'z-10 opacity-0',
      )}
      style={{
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        touchAction: 'none',
      }}
      onClick={onClick}
      {...attributes}
      {...listeners}
    >
      <PuzzleTilePreview
        tile={tile}
        imageSrc={imageSrc}
        goalRow={goalRow}
        goalCol={goalCol}
        rows={rows}
        cols={cols}
        showNumbers={showNumbers}
        suggestedTile={suggestedTile}
      />

      <AnimatePresence>
        {suggestedIndex ? (
          <motion.span
            initial={{ opacity: 0, scale: 0.78, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.78, y: -4 }}
            transition={{ type: 'spring', stiffness: 380, damping: 24 }}
            className={cn(
              'bg-primary text-primary-foreground absolute flex items-center justify-center rounded-full font-semibold shadow-sm',
              suggestionBadgeClass,
            )}
          >
            {suggestedIndex}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </motion.button>
  );
}

function PuzzleTilePreview({
  tile,
  imageSrc,
  goalRow,
  goalCol,
  rows,
  cols,
  showNumbers,
  suggestedTile = false,
  isOverlay = false,
}: {
  tile: number;
  imageSrc: string;
  goalRow: number;
  goalCol: number;
  rows: number;
  cols: number;
  showNumbers: boolean;
  suggestedTile?: boolean;
  isOverlay?: boolean;
}) {
  const numberBadgeClass = getNumberBadgeClass(cols);

  return (
    <motion.div
      layout
      transition={{ type: 'spring', stiffness: 280, damping: 24 }}
      className={cn(
        'bg-muted relative size-full overflow-hidden rounded-lg transition-all duration-200',
        suggestedTile && 'shadow-[inset_0_0_0_2px_rgba(24,24,27,0.12)]',
        isOverlay && 'scale-[1.03] shadow-xl',
      )}
    >
      <div
        className="absolute inset-0"
        style={{
          width: `${cols * 100}%`,
          height: `${rows * 100}%`,
          left: `${goalCol * -100}%`,
          top: `${goalRow * -100}%`,
        }}
      >
        <Image
          src={imageSrc}
          alt={`Tile ${tile}`}
          fill
          sizes="(max-width: 768px) 30vw, 180px"
          className="object-fill"
        />
      </div>

      <div
        className={cn(
          'pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/12',
          suggestedTile && 'to-primary/14',
        )}
      />

      <AnimatePresence>
        {showNumbers ? (
          <motion.span
            initial={{ opacity: 0, scale: 0.84, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.84, y: 4 }}
            transition={{ type: 'spring', stiffness: 360, damping: 24 }}
            className={cn(
              'bg-background/92 absolute rounded-full leading-none font-semibold shadow-sm',
              numberBadgeClass,
            )}
          >
            {tile}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
