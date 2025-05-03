import { z } from 'zod';

import { BuildingTypeSchema } from './building-type';
import { CoordSchema } from './coord';
import { DistrictSchema } from './district';

export const MapChunkSchema = z.object({
  level: z.number(),
  buildings: z.array(z.string()),
  coord: CoordSchema,
  hasOutpost: z.boolean(),
  isPvPZone: z.boolean(),
  hasRaidBuilding: z.boolean(),
  hasSpecialBuilding: z.boolean(),
  // accept string for preventing new district/building type appear
  district: z.union([DistrictSchema, z.string()]),
  buildingTypes: z.array(z.union([BuildingTypeSchema, z.string()])),
});

export type MapChunk = z.infer<typeof MapChunkSchema>;
