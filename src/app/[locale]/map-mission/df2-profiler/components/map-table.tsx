import { DownloadIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { cn } from '@/lib/utils';

import mapBackground from '@/../public/images/map_background.png';

import type { DrawOption, DrawState, MapCell, Mission } from '../types';

type Props = {
    mapUrl: string;
    mapCellList: MapCell[][];
    outposts: string[];
    raidBuildings: string[];
    chunkSize: number;
    drawState?: DrawState;
};

export function MapTable({ mapUrl, mapCellList, outposts, raidBuildings, chunkSize, drawState }: Props) {
    const [showOutpost, setShowOutpost] = useState(true);
    const [showPvP, setShowPvP] = useState(true);
    const [showRaidBuilding, setShowRaidBuilding] = useState(false);

    const t = useTranslations('MapTable');

    const downloadMap = useCallback(() => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) return;

        // set canvas size and draw map
        const img = new Image();
        img.src = mapUrl;
        img.onload = () => {
            alert("onload")
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            // // draw grid
            // const cellWidth = img.width / mapCellList[0].length;
            // const cellHeight = img.height / mapCellList.length;
            // ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            // ctx.lineWidth = 1;
            // for (let y = 1; y < mapCellList.length; y++) {
            //     if (y % chunkSize === 0) continue;
            //     ctx.beginPath();
            //     ctx.moveTo(0, y * cellHeight);
            //     ctx.lineTo(img.width, y * cellHeight);
            //     ctx.stroke();
            // }
            // for (let x = 1; x < mapCellList[0].length; x++) {
            //     if (x % chunkSize === 0) continue;
            //     ctx.beginPath();
            //     ctx.moveTo(x * cellWidth, 0);
            //     ctx.lineTo(x * cellWidth, img.height);
            //     ctx.stroke();
            // }

            // // draw chunk border
            // ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            // ctx.lineWidth = 2;
            // for (let y = chunkSize; y < mapCellList.length; y += chunkSize) {
            //     ctx.beginPath();
            //     ctx.moveTo(0, y * cellHeight);
            //     ctx.lineTo(img.width, y * cellHeight);
            //     ctx.stroke();
            // }
            // for (let x = chunkSize; x < mapCellList[0].length; x += chunkSize) {
            //     ctx.beginPath();
            //     ctx.moveTo(x * cellWidth, 0);
            //     ctx.lineTo(x * cellWidth, img.height);
            //     ctx.stroke();
            // }

            // // draw outpost, pvp, raid building
            // if (showOutpost) {
            //     ctx.fillStyle = 'rgba(34, 197, 94, 0.4)';
            //     mapCellList.forEach((row, y) => {
            //         row.forEach((data, x) => {
            //             if (data.isOutpost) {
            //                 ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
            //             }
            //         });
            //     });
            // }
            // if (showPvP) {
            //     ctx.fillStyle = 'rgba(239, 68, 68, 0.4)';
            //     mapCellList.forEach((row, y) => {
            //         row.forEach((data, x) => {
            //             if (data.isPvP) {
            //                 ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
            //             }
            //         });
            //     });
            // }
            // if (showRaidBuilding) {
            //     ctx.fillStyle = 'rgba(252, 165, 165, 0.4)';
            //     mapCellList.forEach((row, y) => {
            //         row.forEach((data, x) => {
            //             if (data.isRaidBuilding) {
            //                 ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
            //             }
            //         });
            //     });
            // }

            // // draw point
            // if (drawState) {
            //     drawState.pointColor.forEach((point) => {
            //         ctx.fillStyle = point.color;
            //         ctx.fillRect((point.x - 1) * cellWidth, (point.y - 1) * cellHeight, cellWidth, cellHeight);
            //     });
            // }

            // download
            const a = document.createElement('a');
            // img.crossOrigin="anonymous"
            a.href = canvas.toDataURL('image/png');
            a.download = 'map.png';
            a.click();
        };

    }, [mapUrl]);

    return (
        <div className="w-full flex flex-col gap-4">
            {/* options */}
            <div className="flex gap-2">
                <Button
                    variant={showOutpost ? 'default' : 'outline'}
                    onClick={() => {
                        setShowOutpost((prev) => !prev);
                    }}
                >
                    {t('outpost')}
                </Button>
                <Button
                    variant={showPvP ? 'default' : 'outline'}
                    onClick={() => {
                        setShowPvP((prev) => !prev);
                    }}
                >
                    {t('pvp')}
                </Button>
                <Button
                    variant={showRaidBuilding ? 'default' : 'outline'}
                    onClick={() => {
                        setShowRaidBuilding((prev) => !prev);
                    }}
                >
                    {t('red-building')}
                </Button>
                <Button
                    size="icon"
                    variant="outline"
                    onClick={() => {
                        downloadMap();
                    }}
                    className="ml-auto"
                >
                    <DownloadIcon />
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
                                                (point) => point.x - 1 === x && point.y - 1 === y
                                            )?.color,
                                        }}
                                        className={cn(
                                            'group relative border-collapse border border-white border-opacity-0',
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
                                                        showRaidBuilding &&
                                                            data.isRaidBuilding &&
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
                                                                        raidBuildings.includes(building)
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
