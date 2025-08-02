'use client';

import Image from 'next/image';
import { useMemo } from 'react';

import { TooltipProvider } from '@/components/ui/tooltip';

import { Coord } from '../../schema/coord';
import { MapChunk } from '../../schema/map-chunk';
import { Mission } from '../../schema/mission';
import { useMissionSelection } from '../../stores/mission-selection';
import MapChunkCell from './map-chunk-cell';

function coordKey({ x, y }: Coord): string {
  return `${x},${y}`;
}

export default function MapViewer({
  mapUrl,
  mapChunks,
  missions,
  ...props
}: React.ComponentProps<'div'> & {
  mapUrl: string;
  mapChunks: MapChunk[];
  missions: Mission[];
}) {
  const { selectedDistIds, selectedGiverIds } = useMissionSelection();

  const chunkMap = new Map(
    mapChunks.map((chunk) => [coordKey(chunk.coord), chunk]),
  );

  const buildingCount: Map<string, number> = useMemo(() => {
    const countMap = new Map();
    missions.forEach((mission) => {
      if (selectedDistIds.has(mission.id)) {
        countMap.set(
          mission.distBuilding,
          (countMap.get(mission.distBuilding) ?? 0) + 1,
        );
      }
      if (selectedGiverIds.has(mission.id)) {
        countMap.set(
          mission.giverBuilding,
          (countMap.get(mission.giverBuilding) ?? 0) + 1,
        );
      }
    });
    return countMap;
  }, [missions, selectedDistIds, selectedGiverIds]);

  return (
    <div {...props}>
      <Image
        src={mapUrl}
        fill
        alt="map image"
        className="-z-1 rounded-sm"
        priority
        sizes="1089px"
      />
      <TooltipProvider delayDuration={0} skipDelayDuration={0}>
        <div className="absolute inset-0 grid grid-cols-30">
          {Array.from({ length: 18 }, (_, y) =>
            Array.from({ length: 30 }, (_, x) => {
              const chunk = chunkMap.get(coordKey({ x: x + 1, y: y + 1 }));
              const chunkBuildingCount = new Map(
                (chunk?.buildings || [])
                  .filter((building) =>
                    buildingCount.has(building.split('(')[0].trim()),
                  )
                  .map((building) => [
                    building.split('(')[0].trim(),
                    buildingCount.get(building.split('(')[0].trim()) ?? 0,
                  ]),
              );

              if (!chunk) {
                return <div key={coordKey({ x, y })}></div>;
              }

              return (
                <MapChunkCell
                  key={coordKey({ x, y })}
                  mapChunk={chunk}
                  x={x}
                  y={y}
                  // buildingCount={chunkBuildingCount}
                />
              );
            }),
          )}
        </div>
      </TooltipProvider>
    </div>
  );
}
