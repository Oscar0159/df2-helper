export type MorseMode = 'morseToText' | 'textToMorse';

export type MorseConversionErrorCode = 'unsupportedMorseSequence';

export type MorseConversionResult = {
  value: string;
  errorCode?: MorseConversionErrorCode;
};

const MORSE_ENTRIES = {
  A: '.-',
  B: '-...',
  C: '-.-.',
  D: '-..',
  E: '.',
  F: '..-.',
  G: '--.',
  H: '....',
  I: '..',
  J: '.---',
  K: '-.-',
  L: '.-..',
  M: '--',
  N: '-.',
  O: '---',
  P: '.--.',
  Q: '--.-',
  R: '.-.',
  S: '...',
  T: '-',
  U: '..-',
  V: '...-',
  W: '.--',
  X: '-..-',
  Y: '-.--',
  Z: '--..',
  0: '-----',
  1: '.----',
  2: '..---',
  3: '...--',
  4: '....-',
  5: '.....',
  6: '-....',
  7: '--...',
  8: '---..',
  9: '----.',
} as const;

const textByMorse = Object.fromEntries(
  Object.entries(MORSE_ENTRIES).map(([key, value]) => [value, key]),
) as Record<string, string>;

export function convertMorseToText(input: string): MorseConversionResult {
  const groups = input
    .trim()
    .split(/[\s/]+/)
    .filter(Boolean);

  if (!groups.length) {
    return { value: '' };
  }

  const decoded = groups.map((group) => textByMorse[group]);

  if (decoded.some((value) => !value)) {
    return {
      value: '',
      errorCode: 'unsupportedMorseSequence',
    };
  }

  return {
    value: decoded.join(''),
  };
}

export function convertTextToMorse(input: string): MorseConversionResult {
  const characters = input
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .split('')
    .filter(Boolean);

  if (!characters.length) {
    return { value: '' };
  }

  const groups = characters.map(
    (character) => MORSE_ENTRIES[character as keyof typeof MORSE_ENTRIES],
  );

  return {
    value: groups.join(' '),
  };
}
