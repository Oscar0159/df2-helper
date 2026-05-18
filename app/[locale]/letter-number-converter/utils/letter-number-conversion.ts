export type LetterNumberMode = 'numbersToLetters' | 'lettersToNumbers';

export type LetterNumberErrorCode = 'numberOutOfRange';

export type LetterNumberResult = {
  primary: string;
  secondary: string;
  errorCode?: LetterNumberErrorCode;
};

function toAlphabetLetter(value: number) {
  return String.fromCharCode(64 + value);
}

export function convertNumbersToLetters(input: string): LetterNumberResult {
  const values = input.match(/\d+/g) ?? [];

  if (!values.length) {
    return { primary: '', secondary: '' };
  }

  const parsed = values.map((value) => Number.parseInt(value, 10));

  if (parsed.some((value) => value < 1 || value > 26)) {
    return {
      primary: '',
      secondary: '',
      errorCode: 'numberOutOfRange',
    };
  }

  const letters = parsed.map((value) => toAlphabetLetter(value));

  return {
    primary: letters.join(''),
    secondary: letters.join(' • '),
  };
}

export function convertLettersToNumbers(input: string): LetterNumberResult {
  const letters = input
    .toUpperCase()
    .replace(/[^A-I]/g, '')
    .split('')
    .filter(Boolean);

  if (!letters.length) {
    return { primary: '', secondary: '' };
  }

  const numbers = letters.map((letter) => letter.charCodeAt(0) - 64);

  return {
    primary: numbers.join(' '),
    secondary: letters.join(' • '),
  };
}
