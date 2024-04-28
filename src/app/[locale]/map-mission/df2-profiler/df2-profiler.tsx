'use client';

import { DownloadIcon, FlagIcon, Grid2X2Icon, LayoutGridIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRef, useState } from 'react';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { cn } from '@/lib/utils';

import mapBackground from '@/../public/images/map_background.png';

import type { MapCell, Mission } from './types';

type Props = {
    mapUrl: string;
    mapCells: MapCell[][];
    missions: Mission[];
    outposts: string[];
    raidBuildings: string[];
    chunkSize: number;
};

export default function DF2Profiler({ mapUrl, mapCells, missions, outposts, raidBuildings, chunkSize }: Props) {
    const [selectXY, setSelectXY] = useState<[number, number]>([-1, -1]);
    const [showGrid, setShowGrid] = useState(true);
    const [showChunk, setShowChunk] = useState(true);
    const [showOutpost, setShowOutpost] = useState(true);
    const [showPvP, setShowPvP] = useState(true);
    const [showRaidBuilding, setShowRaidBuilding] = useState(false);
    const [showHospital, setShowHospital] = useState(false);
    const [showPolice, setShowPolice] = useState(false);
    const [showHumanRemainsMission, setShowHumanRemainsMission] = useState(false);
    const [showStalkerMission, setShowStalkerMission] = useState(false);
    const mapRef = useRef<HTMLTableElement>(null);

    const t = useTranslations('df2profiler-page');

    const downloadMap = async () => {
        const map = mapRef.current;
        if (!map) return;

        try {
            const html2canvas = await import('html2canvas');
            const canvas = await html2canvas.default(map, {
                backgroundColor: null,
                scale: 2,
            });

            const link = document.createElement('a');
            link.download = 'map.png';
            link.href = canvas.toDataURL('image/png');
            link.click();

            canvas.remove();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="grid grid-cols-6 gap-4">
            <div className="col-span-6 xl:col-span-4 flex flex-col gap-4">
                {/* options */}
                <div className="grid grid-cols-10 gap-2">
                    <div className="flex col-span-10 gap-2">
                        <Button
                            size="icon"
                            variant={showChunk ? 'default' : 'outline'}
                            onClick={() => {
                                setShowChunk((prev) => !prev);
                            }}
                        >
                            <Grid2X2Icon />
                        </Button>
                        <Button
                            size="icon"
                            variant={showGrid ? 'default' : 'outline'}
                            onClick={() => {
                                setShowGrid((prev) => !prev);
                            }}
                        >
                            <LayoutGridIcon />
                        </Button>
                    </div>
                    <div className="flex col-span-10 sm:col-span-6 xl:col-span-4 gap-2">
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
                            variant={showHospital ? 'default' : 'outline'}
                            onClick={() => {
                                setShowHospital((prev) => !prev);
                            }}
                        >
                            {t('hospital')}
                        </Button>
                        <Button
                            variant={showPolice ? 'default' : 'outline'}
                            onClick={() => {
                                setShowPolice((prev) => !prev);
                            }}
                        >
                            {t('police')}
                        </Button>
                    </div>
                    <div className="flex col-span-10 sm:col-span-10 xl:col-span-5 xl:col-start-6 gap-2">
                        <Button
                            variant={showHumanRemainsMission ? 'default' : 'outline'}
                            onClick={() => {
                                setShowHumanRemainsMission((prev) => !prev);
                            }}
                        >
                            {t('human-remains')}
                        </Button>
                        <Button
                            variant={showStalkerMission ? 'default' : 'outline'}
                            onClick={() => {
                                setShowStalkerMission((prev) => !prev);
                            }}
                        >
                            {t('stalker')}
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
                </div>

                {/* map */}
                <AspectRatio ratio={5 / 3} ref={mapRef} className="sm:ml-4 sm:mt-4 ml-2 mt-2 xl:ml-6 xl:mt-6">
                    <Image
                        src={mapUrl || mapBackground.src}
                        alt="map"
                        priority
                        fill
                        sizes="100% 100%"
                        className="rounded-md pointer-events-none bg-cover bg-no-repeat bg-center"
                    />
                    <table className="h-full w-full">
                        <tbody>
                            {mapCells.map((row, y) => (
                                <tr key={y}>
                                    {row.map((data, x) => (
                                        <td className="relative" key={x}>
                                            {/* tooltip */}
                                            <TooltipProvider delayDuration={0} skipDelayDuration={0}>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <div
                                                            className={cn(
                                                                'absolute inset-0 hover:bg-white/30 rounded-sm',
                                                                x === 0 && y === 0 && 'rounded-tl-md',
                                                                x === row.length - 1 && y === 0 && 'rounded-tr-md',
                                                                x === 0 && y === mapCells.length - 1 && 'rounded-bl-md',
                                                                x === row.length - 1 &&
                                                                    y === mapCells.length - 1 &&
                                                                    'rounded-br-md',
                                                                showGrid && 'border border-gray-500/20 border-collapse',
                                                                showChunk &&
                                                                    x % chunkSize === 0 &&
                                                                    x !== 0 &&
                                                                    'border-l border-l-white/30',
                                                                showChunk &&
                                                                    y % chunkSize === 0 &&
                                                                    y !== 0 &&
                                                                    'border-t border-t-white/30',
                                                                showChunk &&
                                                                    x % chunkSize === chunkSize - 1 &&
                                                                    x !== row.length - 1 &&
                                                                    'border-r border-r-white/30',
                                                                showChunk &&
                                                                    y % chunkSize === chunkSize - 1 &&
                                                                    y !== mapCells.length - 1 &&
                                                                    'border-b border-b-white/30'
                                                            )}
                                                            onClick={() => {
                                                                if (selectXY[0] === x && selectXY[1] === y) {
                                                                    setSelectXY([-1, -1]);
                                                                } else {
                                                                    setSelectXY([x, y]);
                                                                }
                                                            }}
                                                        >
                                                            <TooltipContent sideOffset={15} side="bottom">
                                                                <p className="text-base font-semibold">
                                                                    {data.district} (Lv.{data.level})
                                                                </p>
                                                                <Separator className="my-1" />
                                                                <div className="mt-1 space-y-[0.5]">
                                                                    {data.buildings.map((building, i) => (
                                                                        <p
                                                                            key={i}
                                                                            className={cn(
                                                                                outposts.includes(building) &&
                                                                                    'text-green-700 dark:text-green-500',
                                                                                raidBuildings.includes(building) &&
                                                                                    'text-red-700 dark:text-red-500',
                                                                                showHumanRemainsMission &&
                                                                                    missions.some(
                                                                                        (mission) =>
                                                                                            mission.requirement.includes(
                                                                                                'Human Remains'
                                                                                            ) &&
                                                                                            building.includes(
                                                                                                mission.building
                                                                                            )
                                                                                    ) &&
                                                                                    'underline text-yellow-600 dark:text-yellow-300',
                                                                                showStalkerMission &&
                                                                                    missions.some(
                                                                                        (mission) =>
                                                                                            mission.requirement.includes(
                                                                                                'Stalker'
                                                                                            ) &&
                                                                                            building.includes(
                                                                                                mission.giverbuilding
                                                                                            )
                                                                                    ) &&
                                                                                    'underline text-rose-600 dark:text-rose-400',
                                                                                showHospital &&
                                                                                    building.includes('(Hospital)') &&
                                                                                    'underline text-gray-600',
                                                                                showPolice &&
                                                                                    building.includes('(Police)') &&
                                                                                    'underline text-sky-500'
                                                                            )}
                                                                        >
                                                                            {building}
                                                                            {showHumanRemainsMission &&
                                                                                missions.some(
                                                                                    (mission) =>
                                                                                        mission.requirement.includes(
                                                                                            'Human Remains'
                                                                                        ) &&
                                                                                        building.includes(
                                                                                            mission.building
                                                                                        )
                                                                                ) &&
                                                                                ' 【HR】'}
                                                                            {showStalkerMission &&
                                                                                missions.some(
                                                                                    (mission) =>
                                                                                        mission.requirement.includes(
                                                                                            'Stalker'
                                                                                        ) &&
                                                                                        building.includes(
                                                                                            mission.giverbuilding
                                                                                        )
                                                                                ) &&
                                                                                ' 【SM】'}
                                                                        </p>
                                                                    ))}
                                                                </div>
                                                            </TooltipContent>
                                                        </div>
                                                    </TooltipTrigger>
                                                </Tooltip>
                                            </TooltipProvider>

                                            {/* outpost & pvp & raid building */}
                                            <div
                                                className={cn(
                                                    'absolute inset-0 rounded-sm pointer-events-none',
                                                    showOutpost && data.isOutpost && 'bg-green-500/40',
                                                    showPvP && data.isPvP && 'bg-red-500/40',
                                                    showRaidBuilding && data.isRaidBuilding && 'bg-red-300/40'
                                                )}
                                            />

                                            {/* human remains mission */}
                                            <div
                                                className={cn(
                                                    'absolute inset-0 rounded-sm pointer-events-none',
                                                    showHumanRemainsMission &&
                                                        missions.some(
                                                            (mission) =>
                                                                mission.requirement.includes('Human Remains') &&
                                                                mission.xcoord - 1 === x &&
                                                                mission.ycoord - 1 === y
                                                        ) &&
                                                        'border-2 border-yellow-500'
                                                )}
                                            />

                                            {/* stalker mission */}
                                            <div
                                                className={cn(
                                                    'absolute inset-0 rounded-sm pointer-events-none',
                                                    showStalkerMission &&
                                                        missions.some(
                                                            (mission) =>
                                                                mission.requirement.includes('Stalker') &&
                                                                mission.giverxcoord - 1 === x &&
                                                                mission.giverycoord - 1 === y
                                                        ) &&
                                                        'border-2 border-pink-500'
                                                )}
                                            />

                                            {/* hospital & police */}
                                            <div
                                                className={cn(
                                                    'absolute inset-0 rounded-sm pointer-events-none',
                                                    showHospital &&
                                                        data.types.includes('HOS') &&
                                                        'border-2 border-gray-300'
                                                )}
                                            />
                                            <div
                                                className={cn(
                                                    'absolute inset-0 rounded-sm pointer-events-none',
                                                    showPolice &&
                                                        data.types.includes('POL') &&
                                                        'border-2 border-sky-500'
                                                )}
                                            />

                                            {/* selected */}
                                            <div
                                                className={cn(
                                                    'absolute inset-0 rounded-sm pointer-events-none',
                                                    selectXY[0] === x &&
                                                        selectXY[1] === y &&
                                                        'sm:border-4 border-2 border-dashed animate-pulse text-white border-white'
                                                )}
                                            >
                                                {selectXY[0] === x && selectXY[1] === y && (
                                                    <FlagIcon
                                                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2"
                                                        fill="currentColor"
                                                    />
                                                )}
                                            </div>

                                            {/* col and row index */}
                                            {x === 0 && (
                                                <div className="absolute inset-0 -translate-x-full flex justify-center items-center text-xs sm:text-base">
                                                    <span>{y + 1}</span>
                                                </div>
                                            )}
                                            {y === 0 && (
                                                <div className="absolute inset-0 -translate-y-full flex justify-center items-center text-xs sm:text-base">
                                                    <span>{x + 1}</span>
                                                </div>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </AspectRatio>
            </div>

            <div className="col-span-6 xl:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            {selectXY[0] !== -1 || selectXY[1] !== -1 ? (
                                <span>
                                    {mapCells[selectXY[1]][selectXY[0]].district} (Lv.{' '}
                                    {mapCells[selectXY[1]][selectXY[0]].level}) [{selectXY[1] + 1}, {selectXY[0] + 1}]
                                </span>
                            ) : (
                                t('no-selected')
                            )}
                            <Separator className={selectXY[0] === -1 && selectXY[1] === -1 ? 'hidden' : 'mt-4'} />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className={selectXY[0] === -1 && selectXY[1] === -1 ? 'hidden' : ''}>
                        {(selectXY[0] !== -1 || selectXY[1] !== -1) && (
                            <div className="space-y-4">
                                {mapCells[selectXY[1]][selectXY[0]].buildings.map((building, i) => (
                                    <div
                                        key={i}
                                        className={cn(
                                            '',
                                            outposts.includes(building) && 'text-green-700 dark:text-green-500',
                                            raidBuildings.includes(building) && 'text-red-700 dark:text-red-500',
                                            showHumanRemainsMission &&
                                                missions.some(
                                                    (mission) =>
                                                        mission.requirement.includes('Human Remains') &&
                                                        building.includes(mission.building)
                                                ) &&
                                                'underline text-yellow-600 dark:text-yellow-300',
                                            showStalkerMission &&
                                                missions.some(
                                                    (mission) =>
                                                        mission.requirement.includes('Stalker') &&
                                                        building.includes(mission.giverbuilding)
                                                ) &&
                                                'underline text-rose-600 dark:text-rose-400',
                                            showHospital &&
                                                building.includes('(Hospital)') &&
                                                'underline text-gray-600',
                                            showPolice && building.includes('(Police)') && 'underline text-sky-500'
                                        )}
                                    >
                                        {building}
                                        {showHumanRemainsMission &&
                                            missions.some(
                                                (mission) =>
                                                    mission.requirement.includes('Human Remains') &&
                                                    building.includes(mission.building)
                                            ) &&
                                            ' 【HR】'}
                                        {showStalkerMission &&
                                            missions.some(
                                                (mission) =>
                                                    mission.requirement.includes('Stalker') &&
                                                    building.includes(mission.giverbuilding)
                                            ) &&
                                            ' 【SM】'}
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
