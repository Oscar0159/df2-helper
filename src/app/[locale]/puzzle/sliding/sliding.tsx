'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const sizeOptions = [
    { rows: 3, cols: 2 },
    { rows: 3, cols: 3 },
];

export default function Sliding() {
    const [grid, setGrid] = useState(Array.from({ length: 3 }).map(() => Array.from({ length: 3 }).map(() => 0)));

    const gridSet = new Set(grid.flat());
    const isSetupFinished = Array.from({ length: grid.length * grid[0].length }, (_, i) => i).every((i) =>
        gridSet.has(i)
    );

    const t = useTranslations('SlidingPage');

    const setGridSize = (rows: number, cols: number) => {
        if (!rows || !cols) return;
        if (rows === grid.length && cols === grid[0].length) return;

        const newGrid = Array.from({ length: rows }).map(() => Array.from({ length: cols }).map(() => 0));

        setGrid(newGrid);
    };

    return (
        <div className="grid grid-cols-5 gap-4 h-full">
            <div className="col-span-5 flex flex-col gap-2 lg:col-span-3 bg-red-500">
                <h1>Grid</h1>
                <pre>{JSON.stringify(grid)}</pre>
                <br />
                <h1>Grid flat</h1>
                <pre>{JSON.stringify(grid.flat())}</pre>
                <br />
                <h1>Grid Set</h1>
                <pre>{gridSet}</pre>
                <br />
                <h1>Is Setup Finished</h1>
                <pre>{JSON.stringify(isSetupFinished)}</pre>
            </div>

            <div className="col-span-5 flex flex-col gap-2 lg:col-span-2 bg-blue-500">
                <div className="flex gap-2">
                    <div className="flex flex-col gap-2">
                        {Array.from({ length: grid.length }).map((_, i) => (
                            <div key={i} className="flex gap-2">
                                {Array.from({ length: grid[0].length }).map((_, j) => (
                                    <Button
                                        key={j}
                                        onClick={() => {
                                            const newGrid = [...grid];
                                            newGrid[i][j] = (newGrid[i][j] + 1) % (grid.length * grid[0].length);
                                            setGrid(newGrid);
                                        }}
                                    >
                                        {grid[i][j]}
                                    </Button>
                                ))}
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-2">
                        {sizeOptions.map(({ rows, cols }) => (
                            <Button key={`${rows}x${cols}`} onClick={() => setGridSize(rows, cols)}>
                                {rows}x{cols}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
