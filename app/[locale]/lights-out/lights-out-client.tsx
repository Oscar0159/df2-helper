'use client';

import {
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Eraser,
  Lightbulb,
  LightbulbOff,
  PaintBucket,
  PencilLine,
  Shuffle,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import {
  type LightsOutGrid,
  createGrid,
  createRandomGrid,
  fillGrid,
  getSolutionSteps,
  invertGrid,
  resizeGrid,
  solve,
  toggleCrossCell,
  toggleSingleCell,
} from './utils/lights-out-solver';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertTitle } from '@/components/ui/alert';

const sizeOptions = [
  { rows: 2, cols: 3 },
  { rows: 2, cols: 4 },
  { rows: 3, cols: 3 },
  { rows: 3, cols: 4 },
  { rows: 5, cols: 3 },
] as const;

function getCellSizeClass(rows: number, cols: number) {
  const largerSide = Math.max(rows, cols);

  if (largerSide >= 5) {
    return 'size-15 sm:size-18';
  }

  if (largerSide === 4) {
    return 'size-15 sm:size-18';
  }

  return 'size-20 sm:size-24';
}

function getModeLabel(editing: boolean, t: ReturnType<typeof useTranslations>) {
  return editing ? t('boardMode.edit') : t('boardMode.cross');
}

export function LightsOutClient() {
  const t = useTranslations('tools.lightsOut');
  const [grid, setGrid] = useState<LightsOutGrid>(() => createGrid(3, 3));
  const [editing, setEditing] = useState(false);
  const [showSolution, setShowSolution] = useState(true);
  const [solutionExpanded, setSolutionExpanded] = useState(false);

  const { solution, hasSolution } = solve(invertGrid(grid));
  const solutionSteps = getSolutionSteps(solution);
  const previewSteps = solutionSteps.slice(0, 3);
  const solutionStepMap = new Map(solutionSteps.map((step) => [`${step.row}-${step.col}`, step]));
  const boardRows = grid.map((row, rowIndex) => ({
    id: `row-${rowIndex + 1}`,
    cells: row.map((isLit, colIndex) => ({
      id: `cell-${rowIndex + 1}-${colIndex + 1}`,
      isLit,
      rowIndex,
      colIndex,
      step: solutionStepMap.get(`${rowIndex}-${colIndex}`),
    })),
  }));

  const setGridSize = (rows: number, cols: number) => {
    if (rows === grid.length && cols === grid[0].length) {
      return;
    }

    setGrid((current) => resizeGrid(current, rows, cols));
  };

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    setGrid((current) =>
      editing
        ? toggleSingleCell(current, rowIndex, colIndex)
        : toggleCrossCell(current, rowIndex, colIndex),
    );
  };

  const cellSizeClass = getCellSizeClass(grid.length, grid[0].length);

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(300px,0.95fr)] xl:items-start">
      <div className="space-y-6 xl:col-start-1 xl:row-start-1">
        <Card>
          <CardHeader>
            <p className="mr-auto text-sm leading-none font-medium">{t('controlsTitle')}</p>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-3">
              <p className="text-muted-foreground text-xs">{t('sizeTitle')}</p>
              <div className="flex flex-wrap items-center gap-2">
                {sizeOptions.map(({ rows, cols }) => {
                  const isActive = grid.length === rows && grid[0].length === cols;

                  return (
                    <Button
                      key={`${rows}x${cols}`}
                      variant={isActive ? 'default' : 'outline'}
                      onClick={() => setGridSize(rows, cols)}
                    >
                      {rows}x{cols}
                    </Button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-muted-foreground text-xs">{t('actionsTitle')}</p>
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setGrid((current) => fillGrid(current, false))}
                >
                  <Eraser />
                  {t('actions.clear')}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setGrid((current) => fillGrid(current, true))}
                >
                  <PaintBucket />
                  {t('actions.fill')}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setGrid((current) => createRandomGrid(current))}
                >
                  <Shuffle />
                  {t('actions.shuffle')}
                </Button>
                <Button
                  variant={editing ? 'default' : 'outline'}
                  onClick={() => setEditing((current) => !current)}
                >
                  <PencilLine />
                  {t('actions.edit')}
                </Button>
                <Button
                  variant={showSolution ? 'default' : 'outline'}
                  onClick={() => setShowSolution((current) => !current)}
                  disabled={!hasSolution}
                >
                  {showSolution ? <Lightbulb /> : <LightbulbOff />}
                  {t('actions.showSolution')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-wrap items-center justify-between gap-3">
            <Badge variant="secondary">
              {grid.length}x{grid[0].length}
            </Badge>
            <Badge variant="secondary">{getModeLabel(editing, t)}</Badge>
          </CardHeader>
          <CardContent>
            <Item variant="muted">
              <ItemContent>
                <div className="flex justify-center overflow-x-auto">
                  <div className="bg-background/80 ring-border/40 inline-flex rounded-[20px] px-4 py-5 ring-1 sm:px-5">
                    <div className="flex flex-col gap-3">
                      {boardRows.map((row) => (
                        <div key={row.id} className="flex gap-3">
                          {row.cells.map(({ id, isLit, rowIndex, colIndex, step }) => {
                            return (
                              <button
                                type="button"
                                key={id}
                                onClick={() => handleCellClick(rowIndex, colIndex)}
                                className={cn(
                                  'focus-visible:ring-ring/50 relative flex items-center justify-center rounded-full border transition-colors duration-200 outline-none focus-visible:ring-3',
                                  cellSizeClass,
                                  isLit
                                    ? 'border-primary/30 bg-primary text-primary-foreground'
                                    : 'border-border bg-muted text-muted-foreground',
                                  !editing && 'hover:border-primary/45 hover:bg-primary/90',
                                  editing && 'hover:border-primary/60 hover:bg-accent',
                                )}
                                aria-label={t('cellAriaLabel', {
                                  row: rowIndex + 1,
                                  col: colIndex + 1,
                                  state: isLit ? t('lightState.on') : t('lightState.off'),
                                })}
                              >
                                <span
                                  className={cn(
                                    'pointer-events-none absolute inset-[18%] rounded-full border',
                                    isLit ? 'border-primary-foreground/30' : 'border-foreground/10',
                                  )}
                                />
                                {showSolution && step ? (
                                  <span className="border-background bg-primary text-primary-foreground absolute -top-1 -right-1 flex size-6 items-center justify-center rounded-full border text-[11px] font-semibold shadow-sm">
                                    {step.index}
                                  </span>
                                ) : null}
                              </button>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ItemContent>
            </Item>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex items-center gap-2">
          <p className="mr-auto text-sm leading-none font-medium">{t('solutionTitle')}</p>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setSolutionExpanded((current) => !current)}
          >
            {solutionExpanded ? (
              <ChevronUp className="size-4" />
            ) : (
              <ChevronDown className="size-4" />
            )}
            {solutionExpanded ? t('actions.collapseSolution') : t('actions.expandSolution')}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {!hasSolution ? (
            <Alert variant="destructive" className="border-destructive/50 bg-destructive/10">
              <AlertCircle />
              <AlertTitle>{t('noSolution')}</AlertTitle>
            </Alert>
          ) : showSolution && solutionSteps.length > 0 ? (
            <div className="space-y-4">
              <Item variant="muted">
                <ItemContent>
                  <ItemTitle>{t('solutionCount', { count: solutionSteps.length })}</ItemTitle>
                  <ItemDescription>{t('solutionHint')}</ItemDescription>
                </ItemContent>
              </Item>

              {solutionExpanded ? (
                <ScrollArea type="auto" className="h-80 max-h-80 pr-4">
                  <div className="space-y-2">
                    {solutionSteps.map((step) => (
                      <Item key={`${step.row}-${step.col}`} variant="outline">
                        <ItemMedia>
                          <Badge className="aspect-square size-8 text-sm font-semibold">
                            {step.index}
                          </Badge>
                        </ItemMedia>
                        <ItemContent>
                          <ItemTitle>
                            {t('stepLabel', {
                              row: step.row + 1,
                              col: step.col + 1,
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
                    <Item key={`${step.row}-${step.col}`} variant="outline">
                      <ItemMedia>
                        <Badge className="aspect-square size-8 text-sm font-semibold">
                          {step.index}
                        </Badge>
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle>
                          {t('stepLabel', {
                            row: step.row + 1,
                            col: step.col + 1,
                          })}
                        </ItemTitle>
                      </ItemContent>
                    </Item>
                  ))}

                  {solutionSteps.length > previewSteps.length ? (
                    <p className="text-muted-foreground px-1 text-sm">
                      {t('solutionCollapsedHint', {
                        count: solutionSteps.length - previewSteps.length,
                      })}
                    </p>
                  ) : null}
                </div>
              )}
            </div>
          ) : (
            <Item variant="muted">
              <ItemContent>
                <ItemDescription>
                  {showSolution ? t('alreadySolved') : t('solutionHidden')}
                </ItemDescription>
              </ItemContent>
            </Item>
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
