export type BinaryMode = 'binaryToDigits' | 'digitsToBinary';

export type BinaryConversionErrorCode =
  | 'invalidBinaryCharacters'
  | 'binaryOutOfRange'
  | 'invalidDigits';

export type BinaryConversionResult = {
  primary: string;
  secondary: string;
  errorCode?: BinaryConversionErrorCode;
};

function splitBinaryGroups(input: string) {
  return input
    .trim()
    .split(/[\s,|/]+/)
    .filter(Boolean);
}

function splitDigitGroups(input: string) {
  const compact = input.replace(/\s+/g, '').trim();

  if (!compact) {
    return [];
  }

  return compact.split('');
}

export function convertBinaryGroupsToDigits(input: string): BinaryConversionResult {
  const groups = splitBinaryGroups(input);

  if (!groups.length) {
    return { primary: '', secondary: '' };
  }

  const digits = groups.map((group) => {
    if (!/^[01]+$/.test(group)) {
      return Number.NaN;
    }

    return Number.parseInt(group, 2);
  });

  if (digits.some((digit) => Number.isNaN(digit))) {
    return {
      primary: '',
      secondary: '',
      errorCode: 'invalidBinaryCharacters',
    };
  }

  if (digits.some((digit) => digit < 0 || digit > 9)) {
    return {
      primary: '',
      secondary: '',
      errorCode: 'binaryOutOfRange',
    };
  }

  return {
    primary: digits.join(''),
    secondary: digits.join(' • '),
  };
}

export function convertDigitsToBinaryGroups(input: string): BinaryConversionResult {
  const digits = splitDigitGroups(input);

  if (!digits.length) {
    return { primary: '', secondary: '' };
  }

  if (digits.some((digit) => !/^[0-9]$/.test(digit))) {
    return {
      primary: '',
      secondary: '',
      errorCode: 'invalidDigits',
    };
  }

  const binaryGroups = digits.map((digit) => Number(digit).toString(2));

  return {
    primary: binaryGroups.join(' '),
    secondary: digits.join(' • '),
  };
}
