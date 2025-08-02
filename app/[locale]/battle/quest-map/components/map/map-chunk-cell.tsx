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
  MISSION_BUILDINGS,
  OUTPOSTS,
  RAID_BUILDINGS,
} from '../../lib/constant';
import { MapChunk } from '../../schema/map-chunk';

const MapChunkCell = React.memo(function MapChunkCell({
  mapChunk,
  x,
  y,
  // buildingCount,
  ...props
}: React.ComponentProps<'div'> & {
  mapChunk: MapChunk;
  x: number;
  y: number;
  // buildingCount: Map<string, number>;
}) {
  const className = cn(
    'border-[0.5px] border-stone-800 ring-inset md:border-1',
    'data-[highlight-dist=true]:ring-1 data-[highlight-dist=true]:ring-blue-500 md:data-[highlight-dist=true]:ring-2',
    'data-[highlight-giver=true]:ring-1 data-[highlight-giver=true]:ring-yellow-500 md:data-[highlight-giver=true]:ring-2',
    'data-[state=open]:animate-pulse data-[state=open]:ring-1 data-[state=open]:ring-white md:data-[state=open]:ring-2',
    'hover:animate-pulse hover:ring-1 hover:ring-white md:hover:ring-2 md:hover:ring-white',
    mapChunk.hasSpecialBuilding && 'bg-orange-400/30',
    mapChunk.hasRaidBuilding && 'bg-red-900/30',
    mapChunk.hasOutpost && 'bg-green-700/30',
    mapChunk.isPvPZone && 'bg-red-500/30',
    x % 6 === 5 && 'border-r-[0.5px] border-r-stone-600 md:border-r-1',
    x % 6 === 0 && 'border-l-[0.5px] border-l-stone-600 md:border-l-1',
    y % 6 === 5 && 'border-b-[0.5px] border-b-stone-600 md:border-b-1',
    y % 6 === 0 && 'border-t-[0.5px] border-t-stone-600 md:border-t-1',
    x === 0 && y === 0 && 'rounded-tl-sm md:rounded-tl-sm',
    x === 0 && y === 17 && 'rounded-bl-sm md:rounded-bl-sm',
    x === 29 && y === 0 && 'rounded-tr-sm md:rounded-tr-sm',
    x === 29 && y === 17 && 'rounded-br-sm md:rounded-br-sm',
  );

  const content = (
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
                  OUTPOSTS.has(building) &&
                    'text-green-700 dark:text-green-500',
                  RAID_BUILDINGS.has(building) &&
                    'text-red-700 dark:text-red-500',
                  MISSION_BUILDINGS.has(building) &&
                    'text-orange-700 dark:text-orange-500',
                  // buildingCount.get(building.split('(')[0].trim()) &&
                  //   'font-bold text-fuchsia-700 dark:text-fuchsia-500',
                )}
              >
                {building}
                {/* {buildingCount.get(building.split('(')[0].trim()) &&
                  ` - ( ${buildingCount.get(building.split('(')[0].trim())} )`} */}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );

  console.log('rerender chunk: ', x, y);

  return (
    <Tooltip>
      <Popover>
        <PopoverTrigger asChild>
          <TooltipTrigger asChild>
            <div
              className={className}
              // onClick={() => console.log(buildingCount)}
              {...props}
            ></div>
          </TooltipTrigger>
        </PopoverTrigger>
        <PopoverContent>{content}</PopoverContent>
      </Popover>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  );
});

export default MapChunkCell;
