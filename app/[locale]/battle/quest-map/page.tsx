import MapContainer from './components/map/map-container';
import MissionContainer from './components/mission/mission-container';
import {
  fetchMapChunks,
  fetchMapUrl,
  fetchMissions,
} from './lib/fetch-df2profiler';

export default async function Page() {
  const mapUrl = await fetchMapUrl();
  const mapChunks = await fetchMapChunks();
  const missions = await fetchMissions();

  return (
    <main>
      <div className="grid grid-rows-2 gap-2 px-[5%] lg:px-[15%] xl:grid-cols-[60%_40%] xl:grid-rows-1">
        <MapContainer
          mapUrl={mapUrl}
          mapChunks={mapChunks}
          missions={missions}
        />
        <MissionContainer missions={missions} />
      </div>
    </main>
  );
}
