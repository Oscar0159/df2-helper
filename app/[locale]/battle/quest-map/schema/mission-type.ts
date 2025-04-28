import {z} from 'zod';

export const MissionTypeSchema = z.enum([
    'Buy Item',
    'Challenges',
    'Clear Escape',
    'Complete Mission',
    'Equip',
    'Escape Stalker',
    'Exterminate',
    'Find Item',
    'Kill Boss',
    'Kill Infected',
    'Locate / Contact Person',
    'Loot',
    'Loot Buildings',
    'Scrap',
    'Sell Item',
    'easterCultistAcolyte do 1'
]);

export type MissionType = z.infer<typeof MissionTypeSchema>;