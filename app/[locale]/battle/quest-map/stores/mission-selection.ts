import { z } from 'zod';
import { create } from 'zustand';

import { Mission } from '../schema/mission';

type MissionKey = Mission['id']

interface MissionSelectionState {
  selectedDistIds: Set<MissionKey>;
  selectedGiverIds: Set<MissionKey>;

  addSelectDist: (distId: MissionKey) => void;
  addSelectGiver: (giverId: MissionKey) => void;
  removeSelectDist: (distId: MissionKey) => void;
  removeSelectGiver: (giverId: MissionKey) => void,

  isDistSelected(distId: MissionKey): boolean;
  isGiverSelected(giverId: MissionKey): boolean;
  isMissionSelected(missionId: MissionKey): boolean;
}

export const useMissionSelection = create<MissionSelectionState>(
  (set, get) => ({
    selectedDistIds: new Set(),
    selectedGiverIds: new Set(),

    addSelectDist: (distId: MissionKey) => {
      const current = new Set(get().selectedDistIds)
      current.add(distId)
      set({selectedDistIds: current})
    },
    addSelectGiver: (giverId: MissionKey) => {
      const current = new Set(get().selectedGiverIds)
      current.add(giverId)
      set({selectedGiverIds: current})
    },

    removeSelectDist: (distId: MissionKey) => {
      const current = new Set(get().selectedDistIds)
      current.delete(distId)
      set({selectedDistIds: current})
    },
    removeSelectGiver: (giverId: MissionKey) => {
      const current = new Set(get().selectedGiverIds)
      current.delete(giverId)
      set({selectedGiverIds: current})
    },

    isGiverSelected(giverId: MissionKey): boolean {
      return get().selectedGiverIds.has(giverId);
    },
    isDistSelected(distId: MissionKey): boolean {
      return get().selectedDistIds.has(distId);
    },
    isMissionSelected(missionId: MissionKey): boolean {
      return (
        get().selectedDistIds.has(missionId) ||
        get().selectedGiverIds.has(missionId)
      );
    },
  }),
);
