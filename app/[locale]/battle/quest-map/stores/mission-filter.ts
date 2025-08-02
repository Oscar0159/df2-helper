import { create } from 'zustand';

import { MissionType } from '../schema/mission-type';

type ShowType = 'hide' | 'show' | 'only';

interface MissionFilterState {
  missionTypeFilter?: MissionType;
  requirementFilter?: string;
  dailyMissionsFilter: ShowType;
  foreverMissionsFilter: ShowType;
  onlyShowSelectedMissions: boolean;

  setMissionTypeFilter: (type?: MissionType) => void;
  setRequirementFilter: (requirement?: string) => void;
  setDailyMissionFilter: (showType: ShowType) => void;
  setForeverMissionFilter: (showType: ShowType) => void;
  setOnlyShowSelectedMissions: (show: boolean) => void;

  clearFilters: () => void;
}

export const useMissionFilter = create<MissionFilterState>((set) => ({
  missionTypeFilter: undefined,
  requirementFilter: undefined,
  onlyShowSelectedMissions: false,
  dailyMissionsFilter: 'show',
  foreverMissionsFilter: 'show',

  setMissionTypeFilter: (type) => set({ missionTypeFilter: type }),
  setRequirementFilter: (requirement) =>
    set({ requirementFilter: requirement }),
  setDailyMissionFilter: (showType) => set({ dailyMissionsFilter: showType }),
  setForeverMissionFilter: (showType) =>
    set({ foreverMissionsFilter: showType }),
  setOnlyShowSelectedMissions: (show) =>
    set({ onlyShowSelectedMissions: show }),

  clearFilters: () =>
    set({
      missionTypeFilter: undefined,
      requirementFilter: undefined,
      dailyMissionsFilter: 'show',
      foreverMissionsFilter: 'show',
      onlyShowSelectedMissions: false,
    }),
}));
