'use client';

import { Eraser, RefreshCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useMemo, useState } from 'react';

import { ConversionModeToggle } from '@/components/shared/conversion-mode-toggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
  WORD_FINDER_CATEGORIES,
  WORD_FINDER_SAMPLE_LETTERS,
  WORD_FINDER_SAMPLE_PATTERN,
  type WordFinderCategory,
  type WordFinderMode,
} from './constants';
import { searchWordsByLetters, searchWordsByPattern } from './utils/word-search';

export function WordFinderClient() {
  const t = useTranslations('tools.wordFinder');
  const [mode, setMode] = useState<WordFinderMode>('pattern');
  const [pattern, setPattern] = useState(WORD_FINDER_SAMPLE_PATTERN);
  const [letters, setLetters] = useState(WORD_FINDER_SAMPLE_LETTERS);

  const result = useMemo(
    () => (mode === 'pattern' ? searchWordsByPattern(pattern) : searchWordsByLetters(letters)),
    [letters, mode, pattern],
  );

  const categoryLabels: Record<WordFinderCategory, string> = {
    '3': t('categories.3'),
    '4': t('categories.4'),
    '5': t('categories.5'),
    '6': t('categories.6'),
    '6+': t('categories.6+'),
  };

  const modeOptions: { value: WordFinderMode; label: string }[] = [
    { value: 'pattern', label: t('modes.pattern') },
    { value: 'anagram', label: t('modes.anagram') },
  ];

  const currentValue = mode === 'pattern' ? pattern : letters;
  const setCurrentValue = mode === 'pattern' ? setPattern : setLetters;
  const inputDescription =
    mode === 'pattern' ? t('inputDescription.pattern') : t('inputDescription.anagram');
  const inputPlaceholder =
    mode === 'pattern' ? t('inputPlaceholder.pattern') : t('inputPlaceholder.anagram');
  const rulesDescription =
    mode === 'pattern' ? t('rulesDescription.pattern') : t('rulesDescription.anagram');
  const normalizedEmpty =
    mode === 'pattern' ? t('normalizedInputEmptyPattern') : t('normalizedInputEmptyAnagram');
  const emptyMessage =
    mode === 'anagram' && !result.normalizedInput
      ? t('idleAnagram')
      : mode === 'pattern'
        ? t('noResults.pattern')
        : t('noResults.anagram');

  function handleUseSample() {
    if (mode === 'pattern') {
      setPattern(WORD_FINDER_SAMPLE_PATTERN);
      return;
    }

    setLetters(WORD_FINDER_SAMPLE_LETTERS);
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <section className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="tool-panel space-y-4">
          <div className="tool-panel-header">
            <div className="space-y-3">
              <p className="tool-section-title">{t('modeTitle')}</p>
              <ConversionModeToggle value={mode} options={modeOptions} onValueChange={setMode} />
            </div>
            <Button variant="outline" onClick={handleUseSample}>
              <RefreshCcw className="size-4" />
              {t('sampleButton')}
            </Button>
          </div>

          <div className="tool-subpanel">
            <p className="tool-section-title">{t('inputTitle')}</p>
            <p className="text-muted-foreground mt-2 text-sm leading-6">{inputDescription}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              value={currentValue}
              onChange={(event) => setCurrentValue(event.target.value)}
              className="h-8 uppercase"
              spellCheck={false}
              placeholder={inputPlaceholder}
            />
            <Button variant="outline" onClick={() => setCurrentValue('')} type="button">
              <Eraser className="size-4" />
              {t('clearButton')}
            </Button>
          </div>

          <div className="tool-subpanel">
            <p className="tool-section-title">{t('normalizedInputTitle')}</p>
            <p className="mt-2 text-lg font-semibold tracking-[0.18em] uppercase">
              {result.normalizedInput || normalizedEmpty}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {WORD_FINDER_CATEGORIES.map((category) => {
              const group = result.groups.find((entry) => entry.category === category);

              return (
                <div key={category} className="tool-subpanel-inset">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium">{categoryLabels[category]}</p>
                    <span className="bg-muted text-muted-foreground rounded-full px-2.5 py-1 text-xs">
                      {group?.words.length ?? 0}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="tool-panel space-y-4">
          <div className="tool-subpanel">
            <p className="tool-section-label">{t('rulesTitle')}</p>
            <p className="text-muted-foreground mt-3 text-sm leading-6">{rulesDescription}</p>
          </div>

          <div className="tool-subpanel-inset">
            <p className="tool-section-label">{t('resultsTitle')}</p>
            <p className="mt-3 leading-6 font-medium">
              {t('resultsCount', { count: result.totalMatches })}
            </p>
          </div>

          <div className="space-y-3">
            {result.totalMatches ? (
              result.groups.map((group) => (
                <section key={group.category} className="tool-subpanel-inset text-sm">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="font-medium">{categoryLabels[group.category]}</p>
                    <span className="bg-muted text-muted-foreground rounded-full px-2.5 py-1 text-xs">
                      {group.words.length}
                    </span>
                  </div>
                  {group.words.length ? (
                    <div className="flex flex-wrap gap-2">
                      {group.words.map((word) => (
                        <span
                          key={`${group.category}-${word}`}
                          className="border-border/60 bg-muted rounded-full border px-3 py-1 font-medium tracking-[0.14em]"
                        >
                          {word}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground leading-6">{t('emptyCategory')}</p>
                  )}
                </section>
              ))
            ) : (
              <div className="tool-subpanel-inset text-sm">
                <p className="text-muted-foreground leading-6">{emptyMessage}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
