import { Mission } from '../../schema/mission';
import MissionFilterBar from './mission-filter-bar';
import MissionViewer from './mission-viewer';

export default function MissionContainer({
  missions,
}: {
  missions: Mission[];
}) {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="relative aspect-[726/644] w-full">
        <MissionFilterBar className="absolute flex w-full -translate-y-[150%] gap-2" />
        <MissionViewer missions={missions} className="h-full w-full flex flex-col" />
      </div>
    </div>
  );
}
