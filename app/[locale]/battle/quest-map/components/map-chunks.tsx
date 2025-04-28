'use client';

import React from 'react';
import { useMemo } from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

import { OUTPOSTS, RAID_BUILDINGS, SPECIAL_BUILDINGS } from '../lib/constant';
import { MapChunk } from '../schema/map-chunk';

export default function MapChunks({ mapChunks }: { mapChunks: MapChunk[] }) {
  const chunkMap = useMemo(() => {
    const chunkMap: Map<string, MapChunk> = new Map();
    mapChunks.forEach((chunk) => {
      chunkMap.set(`${chunk.coord.x}-${chunk.coord.y}`, chunk);
    });
    return chunkMap;
  }, [mapChunks]);

  return (
    <TooltipProvider>
      <div className="absolute inset-0 grid grid-cols-30">
        {Array.from({ length: 540 }, (_, i) => {
          const y = Math.floor(i / 30);
          const x = i % 30;
          const chunk = chunkMap.get(`${x + 1}-${y + 1}`);

          return (
            <Tooltip key={`${x}-${y}`}>
              <Popover>
                <PopoverTrigger asChild>
                  <TooltipTrigger asChild>
                    <div className={getChunkClass(chunk, x, y)}></div>
                  </TooltipTrigger>
                </PopoverTrigger>
                <PopoverContent className="flex flex-col gap-2 border-1 border-muted">
                  {chunk && <MapChunkContent mapChunk={chunk} />}
                </PopoverContent>
              </Popover>
              <TooltipContent sideOffset={15} className="flex flex-col gap-2 border-1 border-muted">
                {chunk && <MapChunkContent mapChunk={chunk} />}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}

function getChunkClass(chunk?: MapChunk, x: number, y: number) {
  return cn(
    'border-[0.5px] md:border-1 border-stone-800',
    'hover:animate-pulse hover:inset-ring-1 md:hover:inset-ring-1 hover:inset-ring-white',
    'data-[state=open]:animate-pulse data-[state=open]:inset-ring-1 md:data-[state=open]:inset-ring-1 data-[state=open]:inset-ring-white',
    chunk?.hasSpecialBuilding && 'bg-orange-400/30',
    chunk?.hasRaidBuilding && 'bg-red-900/30',
    chunk?.hasOutpost && 'bg-green-700/30',
    chunk?.isPvPZone && 'bg-red-500/30',
    x % 6 === 5 && 'border-r-[0.5px] md:border-r-1 border-r-stone-600',
    x % 6 === 0 && 'border-l-[0.5px] md:border-l-1 border-l-stone-600',
    y % 6 === 5 && 'border-b-[0.5px] md:border-b-1 border-b-stone-600',
    y % 6 === 0 && 'border-t-[0.5px] md:border-t-1 border-t-stone-600',
    x === 0 && y === 0 && 'rounded-tl-sm md:rounded-tl-lg',
    x === 0 && y === 17 && 'rounded-bl-sm md:rounded-bl-lg',
    x === 29 && y === 0 && 'rounded-tr-sm md:rounded-tr-lg',
    x === 29 && y === 17 && 'rounded-br-sm md:rounded-br-lg',
  );
}

function MapChunkContent({ mapChunk }: { mapChunk: MapChunk }) {
  return (
    <>
      <h2 className="text-base font-medium">
        {mapChunk.district} (Lv.{mapChunk?.level})
      </h2>
      {mapChunk.buildings && mapChunk.buildings.length > 0 && (
        <>
          <Separator />
          <ul className="ml-4 list-disc gap-1 text-sm">
            {mapChunk.buildings.map((building, index) => (
              <li
                key={index}
                className={cn(
                  OUTPOSTS.has(building) && 'text-green-700 dark:text-green-500',
                  RAID_BUILDINGS.has(building) && 'text-red-700 dark:text-red-500',
                  SPECIAL_BUILDINGS.has(building) && 'text-orange-700 dark:text-orange-500',
                )}
              >
                {building}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
