import { create } from 'zustand';

type Role = 'dist' | 'giver';

type MissionStore = {
  selectedMissions: Record<Role, Set<string>>;

  // Actions
  setMissionSelection: (id: string, role: Role, checked: boolean) => void;

  selectAll: (ids: string[], role: Role) => void;
  clearAll: (role?: Role) => void;
};

export const useMissionStore = create<MissionStore>((set, get) => ({
  selectedMissions: {
    dist: new Set(),
    giver: new Set(),
  },

  setMissionSelection: (id, role, checked) => {
    const currentSelection = get().selectedMissions[role];
    if (checked) {
      currentSelection.add(id);
    } else {
      currentSelection.delete(id);
    }

    set((state) => ({
      selectedMissions: {
        ...state.selectedMissions,
        [role]: currentSelection,
      },
    }));
  },

  selectAll: (ids, role) => {
    set((state) => ({
      selectedMissions: {
        ...state.selectedMissions,
        [role]: new Set(ids),
      },
    }));
  },

  clearAll: (role) => {
    if (role) {
      set((state) => ({
        selectedMissions: {
          ...state.selectedMissions,
          [role]: new Set(),
        },
      }));
    } else {
      set({
        selectedMissions: {
          dist: new Set(),
          giver: new Set(),
        },
      });
    }
  },
}));
