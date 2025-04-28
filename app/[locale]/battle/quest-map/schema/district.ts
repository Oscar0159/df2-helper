import {z} from 'zod';

export const DistrictSchema = z.enum([
    'RavenwallHeights',
    'AlbandalePark',
    'Overwood',
    'Greywood',
    'Lerwillbury',
    'Dallbow',
    'Coopertown',
    'RichbowHunt',
    'Duntsville',
    'Archbrook',
    'WestMoledale',
    'Dawnhill',
    'Haverbrook',
    'SouthMoorhurst',
    'Wolfstable'
])

export type District = z.infer<typeof DistrictSchema>;