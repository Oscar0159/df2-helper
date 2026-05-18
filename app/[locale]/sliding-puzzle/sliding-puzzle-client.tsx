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
  Check,
  ChevronDown,
  ChevronUp,
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
const playbackSpeedOptions = [0.5, 1, 1.5, 2] as const;
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

function getTileRadiusClass(cols: number) {
  return cols === 2 ? 'rounded-[16px]' : 'rounded-[18px]';
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
      <div className="order-1 space-y-6 xl:col-start-1 xl:row-start-1">
        <section className="tool-panel space-y-4">
          <p className="tool-section-title">{t('controlsTitle')}</p>

          <div className="space-y-3">
            <p className="tool-section-label">{t('sizeTitle')}</p>
            <div className="tool-action-row">
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
            <p className="tool-section-label">{t('actionsTitle')}</p>
            <div className="tool-action-row">
              <IconActionButton
                icon={RefreshCcw}
                label={t('actions.reset')}
                onClick={() => resetBoard()}
              />
              <IconActionButton
                icon={Shuffle}
                label={t('actions.shuffle')}
                onClick={() => shuffleBoard()}
              />
              <IconActionButton
                icon={showSolution ? Lightbulb : LightbulbOff}
                label={t('actions.showSolution')}
                active={showSolution}
                onClick={() => setShowSolution((current) => !current)}
              />
              <IconActionButton
                icon={Hash}
                label={t('actions.showNumbers')}
                active={showNumbers}
                onClick={() => setShowNumbers((current) => !current)}
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <p className="tool-section-label">{t('imageTitle')}</p>
              <p className="text-muted-foreground text-sm">{formatImageLabel(currentImage.id)}</p>
            </div>

            <Drawer
              direction={isDesktopImageDrawer ? 'right' : 'bottom'}
              open={isImageDrawerOpen}
              onOpenChange={setIsImageDrawerOpen}
            >
              <DrawerTrigger asChild>
                <Button type="button" variant="outline" className="w-full justify-between">
                  <span>{formatImageLabel(currentImage.id)}</span>
                  <ChevronDown className="size-4" />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="xl:data-[vaul-drawer-direction=right]:w-[24rem] xl:data-[vaul-drawer-direction=right]:max-w-[24rem]">
                <DrawerHeader>
                  <DrawerTitle>{t('imageTitle')}</DrawerTitle>
                  <DrawerDescription>{formatImageLabel(currentImage.id)}</DrawerDescription>
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
        </section>

        <section className="tool-panel space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-xs font-medium tracking-[0.18em] uppercase">
              {size.label}
            </div>
            <div className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-xs font-medium tracking-[0.18em] uppercase">
              {boardStatusLabel}
            </div>
          </div>

          <div className="tool-subpanel space-y-4">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <div className="bg-muted/35 rounded-[20px] p-3 sm:p-4">
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
          </div>
        </section>
      </div>

      <section className="tool-panel order-3 space-y-4 xl:col-start-2 xl:row-start-1 xl:min-h-184">
        <div className="flex items-start justify-between gap-3">
          <p className="tool-section-title">{t('solutionTitle')}</p>
          <IconActionButton
            icon={solutionExpanded ? ChevronUp : ChevronDown}
            label={solutionExpanded ? t('actions.collapseSolution') : t('actions.expandSolution')}
            variant="ghost"
            size="sm"
            onClick={() => setSolutionExpanded((current) => !current)}
          />
        </div>

        {!solution.hasSolution ? (
          <div className="tool-feedback-danger">{t('noSolution')}</div>
        ) : !showSolution ? (
          <div className="tool-feedback-empty">{t('solutionHidden')}</div>
        ) : solved ? (
          <div className="tool-feedback-empty">{t('alreadySolved')}</div>
        ) : (
          <div className="space-y-4">
            <div className="tool-subpanel space-y-4">
              <div className="space-y-2 sm:flex sm:items-center sm:justify-between sm:gap-3 sm:space-y-0">
                <span className="tool-section-label">{t('playbackSpeedTitle')}</span>
                <ButtonGroup className="border-border/60 bg-background/75 relative isolate flex w-full flex-wrap overflow-hidden rounded-2xl border p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.24)] backdrop-blur-sm sm:ml-auto sm:w-auto sm:rounded-full">
                  {playbackSpeedOptions.map((speed) => (
                    <Button
                      key={speed}
                      size="xs"
                      variant={playbackSpeed === speed ? 'default' : 'ghost'}
                      className={cn(
                        'relative min-w-0 flex-1 rounded-xl border-0 bg-transparent px-2.5 shadow-none transition-colors duration-200 sm:min-w-10 sm:flex-none sm:rounded-full',
                        playbackSpeed === speed
                          ? 'text-foreground hover:text-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-transparent',
                      )}
                      onClick={() => setPlaybackSpeed(speed)}
                      disabled={solved || !solution.hasSolution}
                    >
                      {playbackSpeed === speed ? (
                        <motion.span
                          layoutId="playback-speed-pill"
                          className="border-border/70 bg-card absolute inset-0 rounded-xl border shadow-[0_1px_2px_rgba(24,24,27,0.06),0_6px_18px_rgba(24,24,27,0.08)] sm:rounded-full"
                          transition={{
                            type: 'spring',
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      ) : null}
                      <motion.span
                        className="relative z-10"
                        whileTap={{ scale: 0.94 }}
                        transition={{
                          type: 'spring',
                          stiffness: 420,
                          damping: 26,
                        }}
                      >
                        {speed}x
                      </motion.span>
                    </Button>
                  ))}
                </ButtonGroup>
              </div>

              <div className="space-y-2">
                <span className="tool-section-label">{t('solutionTitle')}</span>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <IconActionButton
                    icon={SkipForward}
                    label={t('actions.applyNext')}
                    onClick={() => {
                      setShowSolution(true);
                      applyNextStep();
                    }}
                    disabled={!solution.hasSolution || solved}
                  />
                  <IconActionButton
                    icon={isPlayingSolution ? Pause : Play}
                    label={
                      isPlayingSolution ? t('actions.pauseSolution') : t('actions.playSolution')
                    }
                    active={isPlayingSolution}
                    onClick={() => {
                      setShowSolution(true);
                      setIsPlayingSolution((current) => !current);
                    }}
                    disabled={!solution.hasSolution || solved}
                  />
                </div>
              </div>
            </div>

            <div className="tool-subpanel">
              <p className="tool-section-label">
                {t('solutionCount', { count: solution.steps.length })}
              </p>
              <p className="mt-2 text-sm leading-6">{t('solutionHint')}</p>
            </div>

            {solutionExpanded ? (
              <div className="grid max-h-80 gap-2 overflow-auto pr-1 xl:max-h-160">
                {solution.steps.map((step) => (
                  <div
                    key={`${step.index}-${step.tile}`}
                    className={cn(
                      'tool-subpanel-inset flex items-center gap-3',
                      step.index === 1 && 'ring-primary/60 ring-2',
                    )}
                  >
                    <span className="bg-primary text-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
                      {step.index}
                    </span>
                    <span className="text-sm font-medium">
                      {t('stepLabel', {
                        tile: step.tile,
                        direction: getDirectionLabel(step.direction, t),
                      })}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid gap-2">
                {previewSteps.map((step) => (
                  <div
                    key={`${step.index}-${step.tile}`}
                    className={cn(
                      'tool-subpanel-inset flex items-center gap-3',
                      step.index === 1 && 'ring-primary/60 ring-2',
                    )}
                  >
                    <span className="bg-primary text-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
                      {step.index}
                    </span>
                    <span className="text-sm font-medium">
                      {t('stepLabel', {
                        tile: step.tile,
                        direction: getDirectionLabel(step.direction, t),
                      })}
                    </span>
                  </div>
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

        <div className="tool-subpanel-inset text-sm leading-6">
          <p className="font-medium">{t('rulesTitle')}</p>
          <p className="text-muted-foreground mt-2">{t('rulesDescription')}</p>
        </div>
      </section>
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

function IconActionButton({
  icon: Icon,
  label,
  onClick,
  active = false,
  disabled = false,
  variant,
  size = 'default',
}: {
  icon: typeof RefreshCcw;
  label: string;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm';
}) {
  const buttonVariant = variant ?? (active ? 'default' : 'outline');

  return (
    <Button
      type="button"
      variant={buttonVariant}
      size={size}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
    >
      <Icon className="size-4" />
      {label}
    </Button>
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
  const radiusClass = getTileRadiusClass(cols);

  return (
    <motion.div
      layout
      transition={{ type: 'spring', stiffness: 260, damping: 26 }}
      ref={setNodeRef}
      className={cn(
        'relative overflow-hidden transition-all duration-200',
        radiusClass,
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
  const radiusClass = getTileRadiusClass(cols);
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
        'bg-card focus-visible:ring-ring/50 relative size-full overflow-hidden text-left transition-all duration-200 outline-none focus-visible:ring-3',
        radiusClass,
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
  const radiusClass = getTileRadiusClass(cols);
  const numberBadgeClass = getNumberBadgeClass(cols);

  return (
    <motion.div
      layout
      transition={{ type: 'spring', stiffness: 280, damping: 24 }}
      className={cn(
        'bg-muted relative size-full overflow-hidden transition-all duration-200',
        radiusClass,
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
