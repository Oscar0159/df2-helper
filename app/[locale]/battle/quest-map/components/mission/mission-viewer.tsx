'use client';

import { Mission } from '../../schema/mission';
import { useMissionFilter } from '../../stores/mission-filter';
import { useMissionSelection } from '../../stores/mission-selection';
import { columns } from './data-table/columns';
import DataTable from './data-table/data-table';

export default function MissionViewer({
  missions,
  ...props
}: React.ComponentProps<'div'> & { missions: Mission[] }) {
  const {
    missionTypeFilter,
    requirementFilter,
    onlyShowSelectedMissions,
    dailyMissionsFilter,
    foreverMissionsFilter,
  } = useMissionFilter();
  const { selectedDistIds, selectedGiverIds } = useMissionSelection();

  const selectedMissionIds = new Set([...selectedDistIds, ...selectedGiverIds]);

  const filteredMissions = missions
    .filter((mission) => {
      if (!missionTypeFilter) return true;
      return mission.type === missionTypeFilter;
    })
    .filter((mission) => {
      if (!requirementFilter) return true;
      return mission.requirement
        ?.toLowerCase()
        .includes(requirementFilter.toLowerCase());
    })
    .filter((mission) => {
      if (!onlyShowSelectedMissions) return true;
      return selectedMissionIds.has(mission.id);
    }).filter((mission) => {
      if (dailyMissionsFilter === 'show') return true;
      if (dailyMissionsFilter === 'hide') return mission.isDaily === false;
      if (dailyMissionsFilter === 'only') return mission.isDaily === true;
    }).filter((mission) => {
      if (foreverMissionsFilter === 'show') return true;
      if (foreverMissionsFilter === 'hide') return mission.isForever === false;
      if (foreverMissionsFilter === 'only') return mission.isForever === true;
    });

  return (
    <div {...props}>
      <DataTable
        columns={columns}
        data={filteredMissions}
        className="h-full w-full overflow-y-auto rounded-t-sm backdrop-blur-sm"
      />
    </div>
  );
}
