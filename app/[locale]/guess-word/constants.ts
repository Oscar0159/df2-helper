export const WORD_FINDER_CATEGORIES = ["3", "4", "5", "6", "6+"] as const;

export type WordFinderCategory = (typeof WORD_FINDER_CATEGORIES)[number];

export type WordFinderMode = "pattern" | "anagram";

export const WORD_FINDER_SAMPLE_PATTERN = "CH__D";

export const WORD_FINDER_SAMPLE_LETTERS = "DLIHC";

export const WORD_FINDER_BANK: Record<WordFinderCategory, string[]> = {
  "3": ["MAP", "KEY", "GEM", "JET", "RAT", "BOX", "SUN", "TAG"],
  "4": ["CODE", "CLUE", "LOCK", "DOOR", "WAVE", "GATE", "PATH", "LAMP"],
  "5": [
    "CACHE",
    "CHILD",
    "CHORD",
    "CRYPT",
    "LASER",
    "RADIO",
    "ROBOT",
    "STONE",
    "TOKEN",
    "WATCH",
  ],
  "6": [
    "BEACON",
    "BUNKER",
    "CIPHER",
    "PUZZLE",
    "SECRET",
    "SIGNAL",
    "TARGET",
    "TUNNEL",
  ],
  "6+": [
    "CHARGED",
    "DISPLAY",
    "ENIGMA",
    "MONITOR",
    "NETWORK",
    "ORCHARD",
    "SURVIVE",
    "TREASURE",
  ],
};
