'use client';

import {
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
} from './lights-out-solver';

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
    return 'size-17 sm:size-22';
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
        <section className="tool-panel space-y-5">
          <p className="tool-section-title">{t('controlsTitle')}</p>

          <div className="space-y-3">
            <p className="tool-section-label">{t('sizeTitle')}</p>
            <div className="tool-action-row">
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
            <p className="tool-section-label">{t('actionsTitle')}</p>
            <div className="tool-action-row">
              <ActionButton
                icon={Eraser}
                label={t('actions.clear')}
                onClick={() => setGrid((current) => fillGrid(current, false))}
              />
              <ActionButton
                icon={PaintBucket}
                label={t('actions.fill')}
                onClick={() => setGrid((current) => fillGrid(current, true))}
              />
              <ActionButton
                icon={Shuffle}
                label={t('actions.shuffle')}
                onClick={() => setGrid((current) => createRandomGrid(current))}
              />
              <ActionButton
                icon={PencilLine}
                label={t('actions.edit')}
                active={editing}
                onClick={() => setEditing((current) => !current)}
              />
              <ActionButton
                icon={showSolution ? Lightbulb : LightbulbOff}
                label={t('actions.showSolution')}
                active={showSolution}
                activeVariant={hasSolution ? 'default' : 'destructive'}
                onClick={() => setShowSolution((current) => !current)}
              />
            </div>
          </div>
        </section>

        <section className="tool-panel space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-xs font-medium tracking-[0.18em] uppercase">
              {grid.length}x{grid[0].length}
            </div>
            <div className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-xs font-medium tracking-[0.18em] uppercase">
              {getModeLabel(editing, t)}
            </div>
          </div>

          <div className="bg-muted/35 rounded-[20px] p-4 sm:p-5">
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
          </div>
        </section>
      </div>

      <section className="tool-panel space-y-4 xl:col-start-2 xl:row-start-1 xl:min-h-168">
        <div className="flex items-start justify-between gap-3">
          <p className="tool-section-title">{t('solutionTitle')}</p>
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
        </div>

        {!hasSolution ? (
          <div className="tool-feedback-danger">{t('noSolution')}</div>
        ) : showSolution && solutionSteps.length > 0 ? (
          <div className="space-y-4">
            <div className="tool-subpanel">
              <p className="tool-section-label">
                {t('solutionCount', { count: solutionSteps.length })}
              </p>
              <p className="mt-2 text-sm leading-6">{t('solutionHint')}</p>
            </div>

            {solutionExpanded ? (
              <div className="grid max-h-80 gap-2 overflow-auto pr-1 xl:max-h-144">
                {solutionSteps.map((step) => (
                  <div
                    key={`${step.row}-${step.col}`}
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
                        row: step.row + 1,
                        col: step.col + 1,
                      })}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid gap-2">
                {previewSteps.map((step) => (
                  <div
                    key={`${step.row}-${step.col}`}
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
                        row: step.row + 1,
                        col: step.col + 1,
                      })}
                    </span>
                  </div>
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
          <div className="tool-feedback-empty">
            {showSolution ? t('alreadySolved') : t('solutionHidden')}
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

function ActionButton({
  icon: Icon,
  label,
  onClick,
  active = false,
  activeVariant = 'default',
  className,
}: {
  icon: typeof Shuffle;
  label: string;
  onClick: () => void;
  active?: boolean;
  activeVariant?: 'default' | 'destructive';
  className?: string;
}) {
  return (
    <Button
      type="button"
      variant={active ? activeVariant : 'outline'}
      onClick={onClick}
      className={cn('justify-start', className)}
      aria-label={label}
    >
      <Icon className="size-4" />
      {label}
    </Button>
  );
}
