import { create } from 'zustand';

import { BuildingType } from '../schema/building-type';

interface MapFilterState {
  buildingTypeFilter?: BuildingType;
  buildingFilter?: string;
  showMapPath: boolean;

  setBuildingTypeFilter: (type?: BuildingType) => void;
  setBuildingFilter: (filter?: string) => void;
  setShowMapPath: (show: boolean) => void;

  clearFilters: () => void;
}

export const useMapFilter = create<MapFilterState>((set) => ({
  buildingTypeFilter: undefined,
  buildingFilter: undefined,
  showMapPath: false,

  setBuildingTypeFilter: (type) => set({ buildingTypeFilter: type }),
  setBuildingFilter: (filter) => set({ buildingFilter: filter }),
  setShowMapPath: (show) => set({ showMapPath: show }),

  clearFilters: () => {
    set({
      buildingTypeFilter: undefined,
      buildingFilter: undefined,
    });
  },
}));
