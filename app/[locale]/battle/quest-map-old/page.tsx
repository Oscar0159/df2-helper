import React from 'react';

import MapViewer from './components/map/map-viewer';
import { MissionProvider } from './components/mission/mission-context';
import MissionViewer from './components/mission/mission-viewer';
import {
  fetchMapChunksData,
  fetchMapUrl,
  fetchMissionsData,
} from './lib/fetch-df2profiler';

export default async function Page() {
  const mapUrl = await fetchMapUrl();
  const mapChunks = await fetchMapChunksData();
  const missions = await fetchMissionsData();

  return (
    <main>
      <div className="grid grid-rows-2 gap-2 px-[5%] lg:px-[15%] xl:grid-cols-[60%_40%] xl:grid-rows-1">
        <MissionProvider missions={missions}>
          <MapViewer mapUrl={mapUrl} mapChunks={mapChunks} />
        </MissionProvider>
        <MissionViewer missions={missions} />
      </div>
    </main>
  );
}
