export type MapCell = {
    level: number;
    buildings: string[];
    xcoord: number;
    ycoord: number;
    isOutpost: boolean;
    isPvP: boolean;
    isRedBuilding: boolean;
    district: string;
    types: string[];
};
