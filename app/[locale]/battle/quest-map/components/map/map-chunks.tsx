'use client';

import React from 'react';
import { startTransition, useEffect, useMemo, useState } from 'react';

import { TooltipProvider } from '@/components/ui/tooltip';

import { MapChunk } from '../../schema/map-chunk';
import { useMissionStore } from '../../stores/use-mission-store';
import { useMissions } from '../mission/mission-context';
import MapChunkCell from './map-chunk-cell';

export default function MapChunks({ mapChunks }: { mapChunks: MapChunk[] }) {
  const selectedMissions = useMissionStore((s) => s.selectedMissions);
  const [distHighlightSet, setDistHighlightSet] = useState<Set<string>>(
    new Set(),
  );
  const [giverHighlightSet, setGiverHighlightSet] = useState<Set<string>>(
    new Set(),
  );

  const missions = useMissions();

  const missionsMap = useMemo(() => {
    return new Map(missions.map((mission) => [mission.id, mission]));
  }, [missions]);

  const buildingCount = useMemo(() => {
    const countMap: Record<string, number> = {};
    const selectedDistId = selectedMissions['dist'];
    const selectedGiverId = selectedMissions['giver'];

    selectedDistId.forEach((id) => {
      const mission = missionsMap.get(id);
      if (!mission) return;
      if (!mission.distBuilding) return;
      countMap[mission.distBuilding] =
        (countMap[mission.distBuilding] ?? 0) + 1;
    });

    selectedGiverId.forEach((id) => {
      const mission = missionsMap.get(id);
      if (!mission) return;
      if (!mission.giverBuilding) return;
      countMap[mission.giverBuilding] =
        (countMap[mission.giverBuilding] ?? 0) + 1;
    });

    return countMap;
  }, [missionsMap, selectedMissions]);

  const chunkMap = useMemo(() => {
    const chunkMap: Map<string, MapChunk> = new Map();
    mapChunks.forEach((chunk) => {
      chunkMap.set(`${chunk.coord.x}-${chunk.coord.y}`, chunk);
    });
    return chunkMap;
  }, [mapChunks]);

  useEffect(() => {
    startTransition(() => {
      setDistHighlightSet(
        new Set(
          Array.from(selectedMissions['dist'])
            .map((id) => {
              const distCoord = missionsMap.get(id)?.distCoord;
              return distCoord ? `${distCoord.x}-${distCoord.y}` : null;
            })
            .filter((s): s is string => s !== null),
        ),
      );
      setGiverHighlightSet(
        new Set(
          Array.from(selectedMissions['giver'])
            .map((id) => {
              const giverCoord = missionsMap.get(id)?.giverCoord;
              return giverCoord ? `${giverCoord.x}-${giverCoord.y}` : null;
            })
            .filter((s): s is string => s !== null),
        ),
      );
    });
  }, [selectedMissions, missionsMap]);

  return (
    <TooltipProvider>
      <div className="absolute inset-0 grid grid-cols-30">
        {Array.from({ length: 540 }, (_, i) => {
          const y = Math.floor(i / 30);
          const x = i % 30;
          const key = `${x + 1}-${y + 1}`;
          const chunk = chunkMap.get(key);
          const highlightDist = distHighlightSet.has(key);
          const highlightGiver = giverHighlightSet.has(key);
          const chunkBuildingCount = Object.fromEntries(
            (chunk?.buildings || [])
              .filter(
                (building) => building.split('(')[0].trim() in buildingCount,
              )
              .map((building) => [
                building.split('(')[0].trim(),
                buildingCount[building.split('(')[0].trim()],
              ]),
          );

          return (
            <MapChunkCell
              key={key}
              x={x}
              y={y}
              chunk={chunk}
              highlightDist={highlightDist}
              highlightGiver={highlightGiver}
              buildingCount={chunkBuildingCount}
            />
          );
        })}
      </div>
    </TooltipProvider>
  );
}
