import { z } from 'zod';

import { CoordSchema } from './coord';
import { DistrictSchema } from './district';
import { MissionTypeSchema } from './mission-type';

export const MissionSchema = z.object({
  id: z.string(),
  minLevel: z.number().int(),
  maxLevel: z.number().int(),
  distCoord: CoordSchema.nullable(),
  giverCoord: CoordSchema.nullable(),
  distBuilding: z.string().nullable(),
  giverBuilding: z.string().nullable(),
  distDistrict: z.union([DistrictSchema, z.string()]).nullable(),
  giverDistrict: z.union([DistrictSchema, z.string()]).nullable(),
  type: MissionTypeSchema,
  isForever: z.boolean(),
  isDaily: z.boolean(),
  requirement: z.string().nullable(),
});

export type Mission = z.infer<typeof MissionSchema>;
