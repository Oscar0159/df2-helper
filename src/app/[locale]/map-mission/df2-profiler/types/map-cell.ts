export type MapCell = {
    level: number;
    buildings: string[];
    xcoord: number;
    ycoord: number;
    isOutpost: boolean;
    isPvP: boolean;
    isRaidBuilding: boolean;
    district: string;
    types: string[];
};
