import { z } from 'zod';

export const CoordSchema = z.object({
  x: z.number().int(),
  y: z.number().int(),
});

export type Coord = z.infer<typeof CoordSchema>;
