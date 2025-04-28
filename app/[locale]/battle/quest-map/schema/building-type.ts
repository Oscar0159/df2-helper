import { z } from 'zod';

export const BuildingTypeSchema = z.enum([
  'HOS', // 'Hospital',
  'POL', // 'Police',
  'IND', // 'Industrial',
  'HOT', // 'Hotel',
  'HOU', // 'House',
  'SHP', // 'Shop',
  'RST', // 'Restaurant',
  'APT', // 'Apartment',
  'OFF', // 'Office',
  'MAN' // 'Mansion',
]);

export type BuildingType = z.infer<typeof BuildingTypeSchema>;
