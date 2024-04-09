'use client';

import {
    ArrowLeftRightIcon,
    EclipseIcon,
    EraserIcon,
    LightbulbIcon,
    LightbulbOffIcon,
    PaintBucketIcon,
    PencilLineIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import * as lightOutSolver from '@/lib/light-out-solver';
import { cn } from '@/lib/utils';

export default function LightOut() {
    // const [rows, setRows] = useState('3');
    // const [cols, setCols] = useState('3');
    const [puzzle, setPuzzle] = useState(
        Array.from({ length: 3 }).map(() => Array.from({ length: 3 }).map(() => false))
    );
    const [editing, setEditing] = useState(false);
    const [showSolution, setShowSolution] = useState(true);

    const { solution, hasSolution } = lightOutSolver.solve(puzzle.map((row) => row.map((cell) => !cell)));

    const t = useTranslations('LightOutPage');

    const reversePuzzle = () => {
        setPuzzle(puzzle.map((row) => row.map((cell) => !cell)));
    };

    const transposePuzzle = () => {
        setPuzzle(puzzle[0].map((_, i) => puzzle.map((row) => row[i])));
    };

    const fillPuzzle = () => {
        setPuzzle(puzzle.map((row) => row.map(() => true)));
    };

    const clearPuzzle = () => {
        setPuzzle(puzzle.map((row) => row.map(() => false)));
    };

    const setPuzzleRows = (rows: number) => {
        if (!rows) return;
        const puzzleTemp = [...puzzle];
        if (rows > puzzle.length) {
            puzzleTemp.push(
                ...Array.from({ length: rows - puzzle.length }).map(() =>
                    Array.from({ length: puzzle[0].length }).map(() => false)
                )
            );
        } else {
            puzzleTemp.splice(rows);
        }
        setPuzzle(puzzleTemp);
    };

    const setPuzzleCols = (cols: number) => {
        if (!cols) return;
        const puzzleTemp = [...puzzle];
        if (cols > puzzle[0].length) {
            puzzleTemp.forEach((row) => {
                row.push(...Array.from({ length: cols - row.length }).map(() => false));
            });
        } else {
            puzzleTemp.forEach((row) => {
                row.splice(cols);
            });
        }
        setPuzzle(puzzleTemp);
    };

    const onPressedPuzzle = (i: number, j: number, pressed: boolean) => {
        const puzzleTemp = [...puzzle];
        puzzleTemp[i][j] = pressed;
        if (editing) {
            setPuzzle(puzzleTemp);
            return;
        }
        if (i > 0) puzzleTemp[i - 1][j] = !puzzleTemp[i - 1][j];
        if (i < puzzle.length - 1) puzzleTemp[i + 1][j] = !puzzleTemp[i + 1][j];
        if (j > 0) puzzleTemp[i][j - 1] = !puzzleTemp[i][j - 1];
        if (j < puzzle[0].length - 1) puzzleTemp[i][j + 1] = !puzzleTemp[i][j + 1];
        setPuzzle(puzzleTemp);
    };

    return (
        <div className="flex flex-col items-center gap-8 h-full">
            {/* toolbar */}
            <div className="flex sm:gap-6 flex-col items-center gap-2 sm:flex-row">
                <div className="flex gap-1">
                    <Input
                        id="rows"
                        type="number"
                        className="w-16 text-center text-xl"
                        value={puzzle.length}
                        onChange={(e) => {
                            setPuzzleRows(parseInt(e.target.value));
                        }}
                    />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                            transposePuzzle();
                        }}
                    >
                        <ArrowLeftRightIcon />
                    </Button>
                    <Input
                        id="cols"
                        type="number"
                        className="w-16 text-center text-xl"
                        value={puzzle[0].length}
                        onChange={(e) => {
                            setPuzzleCols(parseInt(e.target.value));
                        }}
                    />
                </div>

                <div className="flex gap-1">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="col-start-3"
                                    onClick={() => {
                                        reversePuzzle();
                                    }}
                                >
                                    <EclipseIcon />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>{t('toggle')}</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => {
                                        fillPuzzle();
                                    }}
                                >
                                    <PaintBucketIcon />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>{t('fill')}</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => {
                                        clearPuzzle();
                                    }}
                                >
                                    <EraserIcon />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>{t('clear')}</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant={editing ? 'default' : 'outline'}
                                    size="icon"
                                    onClick={() => {
                                        setEditing(!editing);
                                    }}
                                >
                                    <PencilLineIcon />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>{t('edit')}</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant={!hasSolution ? 'destructive' : showSolution ? 'default' : 'outline'}
                                    size="icon"
                                    onClick={() => {
                                        setShowSolution(!showSolution);
                                    }}
                                >
                                    {hasSolution && showSolution ? <LightbulbIcon /> : <LightbulbOffIcon />}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>{t('show-solution')}</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>

            {/* puzzle */}
            <div className="w-full flex justify-center sm:h-full h-[calc(50dvh)]">
                <div className="flex flex-col gap-1 justify-center">
                    {Array.from({ length: puzzle.length }).map((_, i) => (
                        <div key={i} className="flex gap-1 w-full justify-center">
                            {Array.from({ length: puzzle[0].length }).map((_, j) => (
                                <Toggle
                                    pressed={puzzle[i][j]}
                                    onPressedChange={(pressed) => {
                                        onPressedPuzzle(i, j, pressed);
                                    }}
                                    variant="outline"
                                    key={j}
                                    className={cn(
                                        'relative rounded-[50%] border-2 data-[state=on]:bg-foreground aspect-square h-16 shrink sm:h-24'
                                    )}
                                >
                                    <div
                                        className={cn(
                                            'absolute inset-0 rounded-md',
                                            !showSolution && 'hidden',
                                            solution[i][j] ? 'ring ring-foreground/50' : ''
                                        )}
                                    />
                                </Toggle>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
