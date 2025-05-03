'use client';

import React from 'react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

import {
  OUTPOSTS,
  RAID_BUILDINGS,
  SPECIAL_BUILDINGS,
} from '../../lib/constant';
import { MapChunk } from '../../schema/map-chunk';

const MapChunkCell = React.memo(
  function MapChunkCell({
    x,
    y,
    chunk,
    highlightDist,
    highlightGiver,
    buildingCount,
  }: {
    x: number;
    y: number;
    chunk?: MapChunk;
    highlightDist?: boolean;
    highlightGiver?: boolean;
    buildingCount: Record<string, number>;
  }) {
    return (
      <Tooltip>
        <Popover>
          <PopoverTrigger asChild>
            <TooltipTrigger asChild>
              <div
                data-highlight-dist={highlightDist}
                data-highlight-giver={highlightGiver}
                className={getChunkClass(x, y, chunk)}
              ></div>
            </TooltipTrigger>
          </PopoverTrigger>
          <PopoverContent className="flex flex-col gap-2 border-1 border-muted">
            {chunk && (
              <MapChunkContent chunk={chunk} buildingCount={buildingCount} />
            )}
          </PopoverContent>
        </Popover>
        <TooltipContent
          sideOffset={15}
          className="flex flex-col gap-2 border-1 border-muted"
        >
          {chunk && (
            <MapChunkContent chunk={chunk} buildingCount={buildingCount} />
          )}
        </TooltipContent>
      </Tooltip>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.x === nextProps.x &&
      prevProps.y === nextProps.y &&
      prevProps.chunk === nextProps.chunk &&
      prevProps.highlightDist === nextProps.highlightDist &&
      prevProps.highlightGiver === nextProps.highlightGiver &&
      JSON.stringify(prevProps.buildingCount) ==
        JSON.stringify(nextProps.buildingCount)
    );
  },
);

function getChunkClass(x: number, y: number, chunk?: MapChunk) {
  return cn(
    'border-[0.5px] md:border-1 border-stone-800 ring-inset',
    'data-[highlight-dist=true]:ring-1 md:data-[highlight-dist=true]:ring-2 data-[highlight-dist=true]:ring-blue-500',
    'data-[highlight-giver=true]:ring-1 md:data-[highlight-giver=true]:ring-2 data-[highlight-giver=true]:ring-yellow-500',
    'data-[state=open]:animate-pulse data-[state=open]:ring-1 md:data-[state=open]:ring-2 data-[state=open]:ring-white',
    'hover:animate-pulse hover:ring-1 md:hover:ring-2 hover:ring-white md:hover:ring-white',
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

const MapChunkContent = React.memo(
  function MapChunkContent({
    chunk,
    buildingCount,
  }: {
    chunk: MapChunk;
    buildingCount: Record<string, number>;
  }) {
    return (
      <>
        <h2 className="text-base font-medium">
          {chunk.district} (Lv.{chunk?.level})
        </h2>
        {chunk.buildings && chunk.buildings.length > 0 && (
          <>
            <Separator />
            <ul className="ml-4 list-disc gap-1 text-sm">
              {chunk.buildings.map((building, index) => (
                <li
                  key={index}
                  className={cn(
                    OUTPOSTS.has(building) &&
                      'text-green-700 dark:text-green-500',
                    RAID_BUILDINGS.has(building) &&
                      'text-red-700 dark:text-red-500',
                    SPECIAL_BUILDINGS.has(building) &&
                      'text-orange-700 dark:text-orange-500',
                    buildingCount[building.split('(')[0].trim()] &&
                      'font-bold text-fuchsia-700 dark:text-fuchsia-500',
                  )}
                >
                  {building}
                  {buildingCount[building.split('(')[0].trim()] &&
                    ` - ( ${buildingCount[building.split('(')[0].trim()]} )`}
                </li>
              ))}
            </ul>
          </>
        )}
      </>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.chunk === nextProps.chunk &&
      JSON.stringify(prevProps.buildingCount) ==
        JSON.stringify(nextProps.buildingCount)
    );
  },
);

export default MapChunkCell;
