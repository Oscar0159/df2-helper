import { useState } from 'react';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { cn } from '@/lib/utils';

import mapBackground from '../../../../../../public/images/map_background.png';
import type { DrawOption, DrawState, MapCell, Mission } from '../types';

type Props = {
    mapUrl: string;
    mapCellList: MapCell[][];
    outposts: string[];
    redBuilding: string[];
    chunkSize: number;
    drawState?: DrawState;
};

export function MapTable({ mapUrl, mapCellList, outposts, redBuilding, chunkSize, drawState }: Props) {
    const [showOutpost, setShowOutpost] = useState(true);
    const [showPvP, setShowPvP] = useState(true);
    const [showRedBuilding, setShowRedBuilding] = useState(true);

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex gap-2">
                <Button onClick={() => setShowOutpost((prev) => !prev)}>{showOutpost ? 'Hide' : 'Show'} Outpost</Button>
                <Button onClick={() => setShowPvP((prev) => !prev)}>{showPvP ? 'Hide' : 'Show'} PvP</Button>
                <Button onClick={() => setShowRedBuilding((prev) => !prev)}>
                    {showRedBuilding ? 'Hide' : 'Show'} Red Building
                </Button>
            </div>

            <AspectRatio ratio={5 / 3}>
                {/* draw states */}
                <table className="absolute h-full w-full z-10 pointer-events-none">
                    <tbody>
                        {mapCellList.map((row, y) => (
                            <tr key={y}>
                                {row.map((data, x) => (
                                    // drawState: { x: number; y: number; color: string }
                                    <td
                                        key={x}
                                        style={{
                                            backgroundColor: drawState?.pointColor.find(
                                                (point) => point.x-1 === x && point.y-1 === y
                                            )?.color,
                                        }}
                                        className={cn(
                                            'group relative border-collapse border border-white/10 border-opacity-0',
                                            x === 0 && y === 0 && 'rounded-tl-md',
                                            x === row.length - 1 && y === 0 && 'rounded-tr-md',
                                            x === 0 && y === mapCellList.length - 1 && 'rounded-bl-md',
                                            x === row.length - 1 && y === mapCellList.length - 1 && 'rounded-br-md',
                                            x % chunkSize === 0 ? (x === 0 ? 'border-l-0 pl-[1.3px]' : 'border-l') : '',
                                            x % chunkSize === chunkSize - 1
                                                ? x === row.length - 1
                                                    ? 'border-r-0 pr-[1.3px]'
                                                    : 'border-r'
                                                : '',
                                            y % chunkSize === 0 ? (y === 0 ? 'border-t-0 pt-[1.3px]' : 'border-t') : '',
                                            y % chunkSize === chunkSize - 1
                                                ? y === mapCellList.length - 1
                                                    ? 'border-b-0 pb-[1.3px]'
                                                    : 'border-b'
                                                : ''
                                        )}
                                    ></td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* map */}
                <table
                    style={{ backgroundImage: `url(${mapUrl || mapBackground.src})` }}
                    className="absolute h-full w-full rounded-md bg-contain bg-no-repeat"
                >
                    <tbody>
                        {mapCellList.map((row, y) => (
                            <tr key={y}>
                                {row.map((data, x) => (
                                    <TooltipProvider
                                        key={x}
                                        delayDuration={0}
                                        skipDelayDuration={0}
                                        disableHoverableContent
                                    >
                                        <Tooltip delayDuration={0} disableHoverableContent>
                                            <TooltipTrigger asChild>
                                                <td
                                                    className={cn(
                                                        'group relative border-collapse border border-white/10 hover:bg-white/30',
                                                        x === 0 && y === 0 && 'rounded-tl-md',
                                                        x === row.length - 1 && y === 0 && 'rounded-tr-md',
                                                        x === 0 && y === mapCellList.length - 1 && 'rounded-bl-md',
                                                        x === row.length - 1 &&
                                                            y === mapCellList.length - 1 &&
                                                            'rounded-br-md',
                                                        x % chunkSize === 0
                                                            ? x === 0
                                                                ? 'border-l-0 pl-[1.3px]'
                                                                : 'border-l border-l-white/50'
                                                            : '',
                                                        x % chunkSize === chunkSize - 1
                                                            ? x === row.length - 1
                                                                ? 'border-r-0 pr-[1.3px]'
                                                                : 'border-r border-r-white/50'
                                                            : '',
                                                        y % chunkSize === 0
                                                            ? y === 0
                                                                ? 'border-t-0 pt-[1.3px]'
                                                                : 'border-t border-t-white/50'
                                                            : '',
                                                        y % chunkSize === chunkSize - 1
                                                            ? y === mapCellList.length - 1
                                                                ? 'border-b-0 pb-[1.3px]'
                                                                : 'border-b border-b-white/50'
                                                            : '',
                                                        showOutpost &&
                                                            data.isOutpost &&
                                                            'bg-green-500/40 hover:bg-green-500/70',
                                                        showPvP && data.isPvP && 'bg-red-500/40 hover:bg-red-500/70',
                                                        showRedBuilding &&
                                                            data.isRedBuilding &&
                                                            'bg-red-300/40 hover:bg-red-300/70'
                                                    )}
                                                >
                                                    <TooltipContent
                                                        sideOffset={10}
                                                        side="bottom"
                                                        className="block bg-background/80"
                                                    >
                                                        <p className="text-base font-semibold">
                                                            {data.district} (Lv.{data.level})
                                                        </p>
                                                        <div className="mt-1 flex flex-col gap-0.5">
                                                            {data.buildings.map((building, i) => (
                                                                <p
                                                                    key={i}
                                                                    className={cn(
                                                                        '',
                                                                        outposts.includes(building)
                                                                            ? 'text-green-700 dark:text-green-500'
                                                                            : '',
                                                                        redBuilding.includes(building)
                                                                            ? 'text-red-700 dark:text-red-500'
                                                                            : ''
                                                                    )}
                                                                >
                                                                    {building}
                                                                </p>
                                                            ))}
                                                        </div>
                                                    </TooltipContent>
                                                </td>
                                            </TooltipTrigger>
                                        </Tooltip>
                                    </TooltipProvider>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </AspectRatio>
        </div>
    );
}
