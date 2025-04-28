export const OUTPOSTS: Set<string> = new Set([
  'Dallbow Police Department',
  'Haverbrook Memorial Hospital',
  'Greywood Star Hotel',
]);

export const RAID_BUILDINGS: Set<string> = new Set([
  "Palehaven City's Archives",
  'Comer and Son Inc',
  'Ravenwall Heights Community Hospital',
  'Nix Mansion',
  'Secronom Labs',
]);

export const SPECIAL_BUILDINGS: Set<string> = new Set([
  "Kenneth's Hideout",
  'Welcoming Retreat Apartments',
  'Playstop',
  "Mole's Lane",
  "Brothers' Shop",
  'Creaky Corpse Ltd',
  'Drowned Mine',
]);

export const FIND_ITEM_REGEX = /Find the following item\(s\):(.+?)\(Building:\)?/;
export const WANTS_YOU_TO_REGEX = /wants you to:?\s?(.+?)\(Building:\)?/;

export const MEMORY_CACHE_TTL = 5 * 60;
export const FETCH_REVALIDATE = 10 * 60;
export const BASE_URL = 'https://df2profiler.com';
export const GAME_MAP_URL = BASE_URL + '/gamemap';