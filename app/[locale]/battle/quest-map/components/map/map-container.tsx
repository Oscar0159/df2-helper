'use client';

import { useMemo } from 'react';

import { Coord } from '../../schema/coord';
import { MapChunk } from '../../schema/map-chunk';
import { Mission } from '../../schema/mission';
import { useMapFilter } from '../../stores/map-filter';
import { useMissionSelection } from '../../stores/mission-selection';
import MapFilterBar from './map-filter-bar';
import MapPath from './map-path';
import MapViewer from './map-viewer';

export default function MapContainer({
  mapUrl,
  mapChunks,
  missions,
}: {
  mapUrl: string;
  mapChunks: MapChunk[];
  missions: Mission[];
}) {
  const { selectedDistIds, selectedGiverIds } = useMissionSelection();
  const { showMapPath } = useMapFilter();

  const selectedCoords = useMemo(() => {
    const coordMap = new Map<string, Coord>();

    missions.forEach((mission) => {
      if (selectedDistIds.has(mission.id) && mission.distCoord) {
        const key = `${mission.distCoord.x},${mission.distCoord.y}`;
        coordMap.set(key, mission.distCoord);
      }
      if (selectedGiverIds.has(mission.id) && mission.giverCoord) {
        const key = `${mission.giverCoord.x},${mission.giverCoord.y}`;
        coordMap.set(key, mission.giverCoord);
      }
    });

    return Array.from(coordMap.values());
  }, [missions, selectedDistIds, selectedGiverIds]);

  console.log('rerender map container selectedCoords:', selectedCoords);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="relative aspect-[1089/644] w-full">
        <MapFilterBar className="absolute flex -translate-y-[150%] gap-2" />
        {showMapPath && (
          <MapPath
            coords={selectedCoords}
            className="pointer-events-none absolute z-1 h-full w-full stroke-white stroke-2 hover:stroke-amber-400"
          />
        )}
        <MapViewer mapUrl={mapUrl} mapChunks={mapChunks} missions={missions} />
      </div>
    </div>
  );
}
