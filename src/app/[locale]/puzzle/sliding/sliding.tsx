'use client';

import { useDebounce } from '@uidotdev/usehooks';
import { FileDigitIcon, KeyboardIcon, LightbulbIcon, LightbulbOffIcon, MouseIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import * as slidingPuzzleSolver from '@/lib/sliding-puzzle-solver';
import { cn } from '@/lib/utils';

import horseImage from '@/../public/images/puzzle/sliding/Diomedes-Devoured-by-His-Horses.png';
import museeImage from '@/../public/images/puzzle/sliding/Musee.jpg';
import satanAndDeathImage from '@/../public/images/puzzle/sliding/Satan-and-Death.webp';
import saturnDevouringImage from '@/../public/images/puzzle/sliding/Saturn-Devouring-His-Son.jpg';
import severedHeadsImage from '@/../public/images/puzzle/sliding/The-Severed-Heads.jpg';
import dragonImage from '@/../public/images/puzzle/sliding/The-great-red-dragon.webp';
import saintAnthonyImage from '@/../public/images/puzzle/sliding/The-temptation-of-Saint-Anthony.webp';
import witchesSabbathImage from '@/../public/images/puzzle/sliding/Witches-Sabbath.jpg';

const sizeOptions = [
    { rows: 3, cols: 2 },
    { rows: 3, cols: 3 },
];

const images = [
    { src: dragonImage.src, alt: 'El gran dragón rojo', id: 'dragon' },
    { src: horseImage.src, alt: 'Diomedes Devoured by His Horses by Gustave Moreau', id: 'horse' },
    { src: satanAndDeathImage.src, alt: 'Satan and Death', id: 'satan' },
    { src: saintAnthonyImage.src, alt: 'La tentation de saint Antoine', id: 'saint' },
    { src: severedHeadsImage.src, alt: 'Théodore Géricault - Têtes coupées', id: 'severed' },
    { src: witchesSabbathImage.src, alt: 'Francisco de Goya y Lucientes - Witches Sabbath', id: 'witches' },
    { src: museeImage.src, alt: "franz von stuck wilde jagd 1899 - musee d'orsay paris", id: 'musee' },
    { src: saturnDevouringImage.src, alt: 'Saturn Devouring His Son by Francisco Goya', id: 'saturn' },
];

const cropImages = {
    dragon: {
        '3x2': [],
        '3x3': [],
    },
    horse: {
        '3x2': [],
        '3x3': [],
    },
    satan: {
        '3x2': [],
        '3x3': [],
    },
    saint: {
        '3x2': [],
        '3x3': [],
    },
    severed: {
        '3x2': [],
        '3x3': [],
    },
    witches: {
        '3x2': [],
        '3x3': [],
    },
    musee: {
        '3x2': [],
        '3x3': [],
    },
    saturn: {
        '3x2': [],
        '3x3': [],
    },
};

export default function Sliding() {
    const [grid, setGrid] = useState(
        Array.from({ length: 3 }, (_, i) => Array.from({ length: 3 }, (_, j) => (i * 3 + j + 1) % 9))
    );
    const debouncedGrid = useDebounce(grid, 1500);
    const [isSolving, setIsSolving] = useState(false);
    const [solution, setSolution] = useState<string[]>([]);
    const [solutionMode, setSolutionMode] = useState<'keyboard' | 'mouse'>('mouse');
    const [hasSolution, setHasSolution] = useState(false);
    const [showNumbers, setShowNumbers] = useState(true);
    const [showSolution, setShowSolution] = useState(true);
    const [currentImageId, setCurrentImageId] = useState(images[0].id);

    const gridSet = new Set(grid.flat());
    const isSetupFinished = Array.from({ length: grid.length * grid[0].length }, (_, i) => i).every((i) =>
        gridSet.has(i)
    );

    const t = useTranslations('SlidingPage');

    const setGridSize = (rows: number, cols: number) => {
        if (!rows || !cols) return;
        if (rows === grid.length && cols === grid[0].length) return;

        const newGrid = Array.from({ length: rows }, (_, i) =>
            Array.from({ length: cols }, (_, j) => (i * cols + j + 1) % (rows * cols))
        );

        setGrid(newGrid);
    };

    const swapTiles = (row1: number, col1: number, row2: number, col2: number) => {
        const newGrid = [...grid];
        const temp = newGrid[row1][col1];
        newGrid[row1][col1] = newGrid[row2][col2];
        newGrid[row2][col2] = temp;
        setGrid(newGrid);
    };

    const handleTileClick = (row: number, col: number) => {
        if (row > 0 && grid[row - 1][col] === 0) {
            swapTiles(row, col, row - 1, col);
        } else if (row < 2 && grid[row + 1][col] === 0) {
            swapTiles(row, col, row + 1, col);
        } else if (col > 0 && grid[row][col - 1] === 0) {
            swapTiles(row, col, row, col - 1);
        } else if (col < 2 && grid[row][col + 1] === 0) {
            swapTiles(row, col, row, col + 1);
        }
    };

    useEffect(() => {
        const solve = async () => {
            const { solution, hasSolution } = await slidingPuzzleSolver.solve(debouncedGrid);
            setSolution(solution);
            setHasSolution(hasSolution);
            setIsSolving(false);
        };

        if (isSetupFinished) {
            setIsSolving(true);
            solve();
        }
    }, [debouncedGrid, isSetupFinished]);

    return (
        <div className="grid grid-cols-6 gap-4 h-full items-center">
            {/* puzzle */}
            <div
                className={cn(
                    'col-span-6 flex flex-col gap-4 items-center justify-between h-full pb-2',
                    showSolution ? 'lg:col-span-4' : 'lg:col-span-6'
                )}
            >
                {/* toolbar */}
                <div className="flex sm:gap-6 items-center gap-2 sm:flex-row">
                    <div className="flex items-center gap-1 justify-between">
                        {sizeOptions.map(({ rows, cols }) => (
                            <Button
                                key={`${rows}x${cols}`}
                                variant={grid.length === rows && grid[0].length === cols ? 'default' : 'outline'}
                                onClick={() => setGridSize(rows, cols)}
                                className="text-lg"
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
                                        variant={showNumbers ? 'default' : 'outline'}
                                        size="icon"
                                        onClick={() => {
                                            setShowNumbers(!showNumbers);
                                        }}
                                    >
                                        {showNumbers ? <FileDigitIcon /> : <FileDigitIcon />}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>{t('show-number')}</TooltipContent>
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

                {/* image selector for mobile */}
                <Carousel className={cn('md:order-last w-3/5 md:flex md:w-5/6 flex-col')} opts={{ dragFree: true }}>
                    <CarouselContent>
                        {images.map((image, index) => (
                            <CarouselItem
                                key={index}
                                className={cn(showSolution ? 'md:basis-1/4' : 'md:basis-1/4 xl:basis-1/6')}
                            >
                                <Card
                                    className={cn(
                                        'relative border-none transition-opacity duration-300 group/card',
                                        currentImageId !== image.id &&
                                            'dark:opacity-35 opacity-60 dark:hover:opacity-60 hover:opacity-85'
                                    )}
                                    onClick={() => {
                                        setCurrentImageId((prev) => (prev === image.id ? '' : image.id));
                                    }}
                                >
                                    <CardContent className="relative flex aspect-square items-center justify-center">
                                        <Image
                                            src={image.src}
                                            alt={image.alt}
                                            fill
                                            className={cn('cursor-pointer rounded-md object-cover object-top')}
                                        />
                                    </CardContent>
                                    <div className="absolute p-3 group-hover/card:translate-y-0 translate-y-[110%] bg-secondary/70 inset-x-0 bottom-0 rounded-md pointer-events-none transition-all duration-300 group-hover/card:delay-500">
                                        <p>{image.alt}</p>
                                    </div>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>

                {/* grid */}
                <div className="flex flex-col items-center">
                    {grid.map((row, rowIndex) => (
                        <div key={rowIndex} className="flex">
                            {row.map((tile, colIndex) => (
                                <div
                                    key={colIndex}
                                    onClick={() => handleTileClick(rowIndex, colIndex)}
                                    className={cn(
                                        'm-1 w-28 md:w-36 aspect-square relative border-foreground flex items-center justify-center rounded-md text-6xl',
                                        tile !== 0 && 'border bg-primary text-secondary',
                                        tile !== 0 && 'cursor-pointer'
                                    )}
                                >
                                    <span
                                        className={cn(
                                            'absolute origin-bottom-left transition-all duration-500 hidden bottom-1/2 left-1/2 aspect-square w-16 h-16',
                                            showNumbers && tile !== 0 && 'flex justify-center items-center',
                                            images.map((image, index) => image.id).includes(currentImageId)
                                                ? 'bottom-0 left-0 scale-50'
                                                : '-translate-x-1/2 translate-y-1/2'
                                        )}
                                    >
                                        {tile !== 0 && tile}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* solution */}
            <div
                className={cn(
                    'col-span-6 flex-col gap-4 lg:col-span-2 lg:items-start h-full items-center',
                    showSolution ? 'flex' : 'hidden'
                )}
            >
                <div className="flex items-center gap-1 sm:flex-row">
                    <TooltipProvider delayDuration={0} skipDelayDuration={0} disableHoverableContent>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    size="icon"
                                    variant={solutionMode === 'keyboard' ? 'default' : 'outline'}
                                    onClick={() => {
                                        setSolutionMode('keyboard');
                                    }}
                                >
                                    <KeyboardIcon />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>{t('keyboard-solution')}</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider delayDuration={0} skipDelayDuration={0} disableHoverableContent>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    size="icon"
                                    variant={solutionMode === 'mouse' ? 'default' : 'outline'}
                                    onClick={() => {
                                        setSolutionMode('mouse');
                                    }}
                                >
                                    <MouseIcon />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>{t('mouse-solution')}</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>

                <div className="text-xl grid-rows-14 grid-cols-3 grid gap-x-2 gap-y-4 grid-flow-col px-8 sm:w-11/12 lg:w-full lg:px-2">
                    {isSolving ? (
                        <>
                            {Array.from({ length: 40 - solution.length }, (_, i) => (
                                <div key={i} className="grid grid-cols-3 gap-2 w-28 col-span-1">
                                    <Skeleton className="h-6 w-20" />
                                    <Skeleton className="h-6 w-20" />
                                </div>
                            ))}
                        </>
                    ) : (
                        <>
                            {solution.map((step, index) => (
                                <div key={index} className="grid grid-cols-3 gap-2 w-28 col-span-1">
                                    <span>{index + 1}.</span>
                                    <span className={cn(solutionMode === 'keyboard' && 'hidden')}>
                                        {step
                                            .replace(/U/g, '↑')
                                            .replace(/D/g, '↓')
                                            .replace(/L/g, '←')
                                            .replace(/R/g, '→')}
                                    </span>
                                    <span className={cn(solutionMode === 'mouse' && 'hidden')}>
                                        {step
                                            .replace(/U/g, '↓')
                                            .replace(/D/g, '↑')
                                            .replace(/L/g, '→')
                                            .replace(/R/g, '←')}
                                    </span>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
