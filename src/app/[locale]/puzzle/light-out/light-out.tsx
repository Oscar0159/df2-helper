'use client';

import {
    EclipseIcon,
    EraserIcon,
    LightbulbIcon,
    LightbulbOffIcon,
    PaintBucketIcon,
    PencilLineIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import * as lightOutPuzzleSolver from '@/lib/light-out-puzzle-solver';
import { cn } from '@/lib/utils';

const sizeOptions = [
    { rows: 2, cols: 3 },
    { rows: 2, cols: 4 },
    { rows: 3, cols: 3 },
    { rows: 3, cols: 4 },
    { rows: 5, cols: 3 },
];

export default function LightOut() {
    const [grid, setGrid] = useState(Array.from({ length: 3 }).map(() => Array.from({ length: 3 }).map(() => false)));
    const [editing, setEditing] = useState(false);
    const [showSolution, setShowSolution] = useState(true);

    const { solution, hasSolution } = lightOutPuzzleSolver.solve(grid.map((row) => row.map((cell) => !cell)));

    const t = useTranslations('light-out-page');

    const reversePuzzle = () => {
        setGrid(grid.map((row) => row.map((cell) => !cell)));
    };

    const fillPuzzle = () => {
        setGrid(grid.map((row) => row.map(() => true)));
    };

    const clearPuzzle = () => {
        setGrid(grid.map((row) => row.map(() => false)));
    };

    const setGridSize = (rows: number, cols: number) => {
        if (!rows || !cols) return;
        if (rows === grid.length && cols === grid[0].length) return;

        const newPuzzle = Array.from({ length: rows }).map((_, i) =>
            Array.from({ length: cols }).map((_, j) => (i < grid.length && j < grid[0].length ? grid[i][j] : false))
        );

        setGrid(newPuzzle);
    };

    const onPressedGrid = (i: number, j: number, pressed: boolean) => {
        const gridTemp = [...grid];
        gridTemp[i][j] = pressed;
        if (editing) {
            setGrid(gridTemp);
            return;
        }
        if (i > 0) gridTemp[i - 1][j] = !gridTemp[i - 1][j];
        if (i < grid.length - 1) gridTemp[i + 1][j] = !gridTemp[i + 1][j];
        if (j > 0) gridTemp[i][j - 1] = !gridTemp[i][j - 1];
        if (j < grid[0].length - 1) gridTemp[i][j + 1] = !gridTemp[i][j + 1];
        setGrid(gridTemp);
    };

    return (
        <div className="flex flex-col items-center gap-8 h-full">
            {/* toolbar */}
            <div className="flex flex-col gap-2">
                <div className="flex sm:gap-6 flex-col items-center gap-2 sm:flex-row">
                    <div className="flex items-center gap-1 justify-between">
                        {sizeOptions.map(({ rows, cols }) => (
                            <Button
                                key={`${rows}x${cols}`}
                                variant={grid.length === rows && grid[0].length === cols ? 'default' : 'outline'}
                                className="text-lg"
                                onClick={() => {
                                    setGridSize(rows, cols);
                                }}
                            >
                                {rows}x{cols}
                            </Button>
                        ))}
                    </div>

                    <div className="flex gap-1">
                        <TooltipProvider delayDuration={0} skipDelayDuration={0} disableHoverableContent>
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
                        <TooltipProvider delayDuration={0} skipDelayDuration={0} disableHoverableContent>
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
                        <TooltipProvider delayDuration={0} skipDelayDuration={0} disableHoverableContent>
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
                        <TooltipProvider delayDuration={0} skipDelayDuration={0} disableHoverableContent>
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
                        <TooltipProvider delayDuration={0} skipDelayDuration={0} disableHoverableContent>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant={!hasSolution ? 'destructive' : showSolution ? 'default' : 'outline'}
                                        size="icon"
                                        onClick={() => {
                                            setShowSolution(!showSolution);
                                        }}
                                    >
                                        {showSolution ? <LightbulbIcon /> : <LightbulbOffIcon />}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>{t('show-solution')}</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
            </div>

            {/* puzzle */}
            <div className="w-full flex justify-center sm:h-full h-[calc(50dvh)]">
                <div className="flex flex-col gap-1 justify-center">
                    {Array.from({ length: grid.length }).map((_, i) => (
                        <div key={i} className="flex gap-1 w-full justify-center">
                            {Array.from({ length: grid[0].length }).map((_, j) => (
                                <Toggle
                                    pressed={grid[i][j]}
                                    onPressedChange={(pressed) => {
                                        onPressedGrid(i, j, pressed);
                                    }}
                                    variant="outline"
                                    key={j}
                                    className={cn(
                                        'relative rounded-[50%] border-2 data-[state=on]:bg-foreground aspect-square h-20 shrink sm:h-28'
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
