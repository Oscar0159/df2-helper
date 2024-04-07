'use client';

import { ArrowLeftRightIcon, ArrowRightIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Toggle } from '@/components/ui/toggle';

import { cn } from '@/lib/utils';

export default function LightOut() {
    const [grid, setGrid] = useState(Array.from({ length: 5 }).map(() => Array.from({ length: 5 }).map(() => false)));
    const [solvePairs, setSolvePairs] = useState<number[][]>([]);
    const [editing, setEditing] = useState(false);

    const reverseGrid = () => {
        setGrid(grid.map((row) => row.map((cell) => !cell)));
    };

    const transposeGrid = () => {
        setGrid(grid[0].map((_, i) => grid.map((row) => row[i])));
    };

    const clearGrid = () => {
        setGrid(grid.map((row) => row.map(() => false)));
    };

    const setGridRows = (rows: number) => {
        const gridTemp = [...grid];
        if (rows > grid.length) {
            gridTemp.push(
                ...Array.from({ length: rows - grid.length }).map(() =>
                    Array.from({ length: grid[0].length }).map(() => false)
                )
            );
        } else {
            gridTemp.splice(rows);
        }
        setGrid(gridTemp);
    };

    const setGridCols = (cols: number) => {
        const gridTemp = [...grid];
        if (cols > grid[0].length) {
            gridTemp.forEach((row) => {
                row.push(...Array.from({ length: cols - row.length }).map(() => false));
            });
        } else {
            gridTemp.forEach((row) => {
                row.splice(cols);
            });
        }
        setGrid(gridTemp);
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
        <>
            <div className="flex flex-col items-center gap-1">
                <div className="grid w-full grid-cols-7 place-items-center p-5 lg:grid-cols-7">
                    <Button
                        variant="outline"
                        className="col-start-3"
                        onClick={() => {
                            reverseGrid();
                        }}
                    >
                        <ArrowRightIcon />
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => {
                            clearGrid();
                        }}
                    >
                        Clear
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => {
                            setEditing(!editing);
                        }}
                    >
                        {editing ? 'Edit' : '!Edit'}
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => {
                            // const solvePairs = solveLightOut(grid);
                            // setSolvePairs(solvePairs);
                        }}
                    >
                        Solve
                    </Button>
                </div>

                <div className="flex flex-col gap-1">
                    {Array.from({ length: grid.length }).map((_, i) => (
                        <div key={i} className="flex gap-1">
                            {Array.from({ length: grid[0].length }).map((_, j) => (
                                <Toggle
                                    pressed={grid[i][j]}
                                    onPressedChange={(pressed) => {
                                        onPressedGrid(i, j, pressed);
                                    }}
                                    variant="outline"
                                    key={j}
                                    className={cn(
                                        'h-16 w-16 rounded-[50%] border-2 data-[state=on]:bg-foreground lg:h-20 lg:w-20 xl:h-24 xl:w-24',
                                        grid[0].length > 5 && 'h-12 w-12 lg:h-16 lg:w-16 xl:h-20 xl:w-20',
                                        solvePairs.some(([x, y]) => x === i && y === j) && 'bg-red-500'
                                    )}
                                />
                            ))}
                        </div>
                    ))}
                </div>

                <div className="grid w-full grid-cols-5 place-items-center p-5 lg:grid-cols-7">
                    <div className="col-start-2 flex flex-col items-center gap-3 lg:col-start-3">
                        <Label htmlFor="rows" className="text-4xl">
                            Rows
                        </Label>
                        <Input
                            id="rows"
                            type="number"
                            className="h-20 w-24 text-center text-4xl"
                            value={grid.length}
                            onChange={(e) => {
                                setGridRows(parseInt(e.target.value));
                            }}
                        />
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => {
                            transposeGrid();
                        }}
                    >
                        <ArrowLeftRightIcon />
                    </Button>
                    <div className="flex flex-col items-center gap-3">
                        <Label htmlFor="cols" className="text-4xl">
                            Cols
                        </Label>
                        <Input
                            id="cols"
                            type="number"
                            className="h-20 w-24 text-center text-4xl"
                            value={grid[0].length}
                            onChange={(e) => {
                                setGridCols(parseInt(e.target.value));
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
