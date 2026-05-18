import { WORD_FINDER_BANK, type WordFinderCategory } from '../constants';

export type WordFinderMatchGroup = {
  category: WordFinderCategory;
  words: string[];
};

export type WordFinderSearchResult = {
  normalizedInput: string;
  totalMatches: number;
  groups: WordFinderMatchGroup[];
};

function normalizePattern(input: string) {
  return input.toUpperCase().replace(/[^A-Z_?*]/g, '');
}

function normalizeLetters(input: string) {
  return input.toUpperCase().replace(/[^A-Z]/g, '');
}

function matchesPattern(word: string, pattern: string) {
  if (!pattern) {
    return true;
  }

  if (word.length !== pattern.length) {
    return false;
  }

  return pattern.split('').every((character, index) => {
    if (character === '_' || character === '?' || character === '*') {
      return true;
    }

    return word[index] === character;
  });
}

function countCharacters(input: string) {
  return input.split('').reduce<Record<string, number>>((counts, character) => {
    counts[character] = (counts[character] ?? 0) + 1;
    return counts;
  }, {});
}

function matchesAnagram(word: string, letters: string) {
  if (!letters || word.length !== letters.length) {
    return false;
  }

  const wordCounts = countCharacters(word);
  const letterCounts = countCharacters(letters);

  return Object.keys(wordCounts).every(
    (character) => wordCounts[character] === letterCounts[character],
  );
}

function buildGroups(matcher: (word: string) => boolean): WordFinderMatchGroup[] {
  return (Object.entries(WORD_FINDER_BANK) as Array<[WordFinderCategory, string[]]>).map(
    ([category, words]) => ({
      category,
      words: [...words]
        .sort((left, right) => left.localeCompare(right))
        .filter((word) => matcher(word)),
    }),
  );
}

function createSearchResult(
  normalizedInput: string,
  groups: WordFinderMatchGroup[],
): WordFinderSearchResult {
  return {
    normalizedInput,
    totalMatches: groups.reduce((total, group) => total + group.words.length, 0),
    groups,
  };
}

export function searchWordsByPattern(pattern: string): WordFinderSearchResult {
  const normalizedInput = normalizePattern(pattern);
  const groups = buildGroups((word) => matchesPattern(word, normalizedInput));

  return createSearchResult(normalizedInput, groups);
}

export function searchWordsByLetters(letters: string): WordFinderSearchResult {
  const normalizedInput = normalizeLetters(letters);

  if (!normalizedInput) {
    return createSearchResult(
      normalizedInput,
      buildGroups(() => false),
    );
  }

  const groups = buildGroups((word) => matchesAnagram(word, normalizedInput));

  return createSearchResult(normalizedInput, groups);
}
