import React from 'react';

import MapViewer from './components/map-viewer';
import MissionViewer from './components/mission-viewer';
import { fetchMapChunksData, fetchMapUrl, fetchMissionsData } from './lib/fetch-df2profiler';

export default async function Page() {
  const mapUrl = await fetchMapUrl();
  const mapChunks = await fetchMapChunksData();
  const missions = await fetchMissionsData();

  return (
    <main>
      <div className="grid grid-rows-2 xl:grid-cols-[60%_40%] lg:px-[15%] px-[5%]">
        <MapViewer mapUrl={mapUrl} mapChunks={mapChunks} />
        <MissionViewer missions={missions} />
      </div>
    </main>
  );
}
