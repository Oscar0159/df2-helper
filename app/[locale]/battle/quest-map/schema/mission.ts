import { z } from 'zod';

import { CoordSchema } from './coord';
import { MissionTypeSchema } from './mission-type';
import { DistrictSchema } from './district';

export const MissionSchema = z.object({
  minLevel: z.number().int(),
  maxLevel: z.number().int(),
  distCoord: CoordSchema.nullable(),
  giverCoord: CoordSchema.nullable(),
  distBuilding: z.string(),
  giverBuilding: z.string().nullable(),
  // accept string for preventing new district appear
  distDistrict: z.union([DistrictSchema, z.string()]),
  giverDistrict: z.union([DistrictSchema, z.string()]).nullable(),
  type: MissionTypeSchema,
  isForever: z.boolean(),
  isDaily: z.boolean(),
  requirement: z.string().nullable(),
});

export type Mission = z.infer<typeof MissionSchema>;
