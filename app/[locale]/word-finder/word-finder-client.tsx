'use client';

import { ChevronDown, ChevronUp, Eraser, RefreshCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
  WORD_FINDER_SAMPLE_LETTERS,
  WORD_FINDER_SAMPLE_PATTERN,
  type WordFinderCategory,
  type WordFinderMode,
} from './constants';
import { searchWordsByLetters, searchWordsByPattern } from './utils/word-search';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Item, ItemContent, ItemDescription, ItemGroup, ItemTitle } from '@/components/ui/item';
import { Badge } from '@/components/ui/badge';
import { ButtonGroup } from '@/components/ui/button-group';
import { ScrollArea } from '@/components/ui/scroll-area';

export function WordFinderClient() {
  const t = useTranslations('tools.wordFinder');
  const [mode, setMode] = useState<WordFinderMode>('pattern');
  const [pattern, setPattern] = useState(WORD_FINDER_SAMPLE_PATTERN);
  const [letters, setLetters] = useState(WORD_FINDER_SAMPLE_LETTERS);
  const [resultsExpanded, setResultsExpanded] = useState(false);

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
  const inputRuleDescription =
    mode === 'pattern' ? t('inputRuleDescription.pattern') : t('inputRuleDescription.anagram');
  const inputPlaceholder =
    mode === 'pattern' ? t('inputPlaceholder.pattern') : t('inputPlaceholder.anagram');
  const rulesDescription =
    mode === 'pattern' ? t('rulesDescription.pattern') : t('rulesDescription.anagram');
  const emptyMessage =
    mode === 'anagram' && !result.normalizedInput
      ? t('idleAnagram')
      : mode === 'pattern'
        ? t('noResults.pattern')
        : t('noResults.anagram');
  const visibleGroups = resultsExpanded
    ? result.groups
    : result.groups.filter((group) => group.words.length > 0);

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
        <Card>
          <CardHeader className="flex flex-wrap items-center gap-2">
            <p className="mr-auto text-sm leading-none font-medium">{t('inputTitle')}</p>
            <ButtonGroup>
              {modeOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={mode === option.value ? 'default' : 'outline'}
                  onClick={() => setMode(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </ButtonGroup>
            <Button variant="outline" onClick={handleUseSample}>
              <RefreshCcw className="size-4" />
              {t('sampleButton')}
            </Button>
          </CardHeader>

          <CardContent className="space-y-4">
            <Item variant="muted">
              <ItemContent>
                <ItemTitle>{t('inputRuleTitle')}</ItemTitle>
                <ItemDescription>{inputRuleDescription}</ItemDescription>
              </ItemContent>
            </Item>
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center gap-2">
            <p className="mr-auto text-sm leading-none font-medium">{t('resultsTitle')}</p>
            <Button variant="ghost" onClick={() => setResultsExpanded((prev) => !prev)}>
              {resultsExpanded ? <ChevronUp /> : <ChevronDown />}
              {resultsExpanded ? t('collapseResults') : t('expandResults')}
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <Item variant="muted">
              <ItemContent>
                <ItemTitle>{t('rulesTitle')}</ItemTitle>
                <ItemDescription>{rulesDescription}</ItemDescription>
              </ItemContent>
            </Item>

            <ScrollArea className={resultsExpanded ? 'max-h-none' : 'h-80 pr-3'}>
              <ItemGroup>
                {result.totalMatches ? (
                  visibleGroups.map((group) => (
                    <Item key={group.category} variant="outline">
                      <ItemContent>
                        <ItemTitle>{categoryLabels[group.category]}</ItemTitle>
                        <ItemDescription className="mt-2 flex flex-wrap gap-2">
                          {group.words.length
                            ? group.words.map((word) => (
                                <Badge
                                  key={`${group.category}-${word}`}
                                  className="tracking-[0.14em]"
                                >
                                  {word}
                                </Badge>
                              ))
                            : t('emptyCategory')}
                        </ItemDescription>
                      </ItemContent>
                      <ItemContent>
                        <ItemDescription>
                          <Badge
                            variant="secondary"
                            className="text-muted-foreground flex aspect-square items-center gap-1"
                          >
                            {group.words.length}
                          </Badge>
                        </ItemDescription>
                      </ItemContent>
                    </Item>
                  ))
                ) : (
                  <Item variant="outline">
                    <ItemContent>
                      <ItemDescription>{emptyMessage}</ItemDescription>
                    </ItemContent>
                  </Item>
                )}
              </ItemGroup>
            </ScrollArea>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
