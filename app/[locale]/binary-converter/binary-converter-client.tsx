'use client';

import { AlertCircle, Copy, RefreshCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useMemo, useState } from 'react';

import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Card, CardAction, CardContent, CardHeader } from '@/components/ui/card';
import { Item } from '@/components/ui/item';
import { Textarea } from '@/components/ui/textarea';

import {
  type BinaryMode,
  convertBinaryGroupsToDigits,
  convertDigitsToBinaryGroups,
} from './utils/binary-conversion';

const samples: Record<BinaryMode, string> = {
  binaryToDigits: '101 11 110 10',
  digitsToBinary: '5362',
};

export function BinaryConverterClient() {
  const t = useTranslations('tools.binary');
  const [mode, setMode] = useState<BinaryMode>('binaryToDigits');
  const [input, setInput] = useState(samples.binaryToDigits);

  const result = useMemo(() => {
    return mode === 'binaryToDigits'
      ? convertBinaryGroupsToDigits(input)
      : convertDigitsToBinaryGroups(input);
  }, [input, mode]);

  const errorLabels = {
    invalidBinaryCharacters: t('errors.invalidBinaryCharacters'),
    binaryOutOfRange: t('errors.binaryOutOfRange'),
    invalidDigits: t('errors.invalidDigits'),
  };

  const modeOptions = [
    {
      value: 'binaryToDigits',
      label: t('modes.binaryToDigits'),
    },
    {
      value: 'digitsToBinary',
      label: t('modes.digitsToBinary'),
    },
  ] as const satisfies ReadonlyArray<{
    value: BinaryMode;
    label: string;
  }>;

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
        <Card>
          <CardHeader className="flex flex-wrap items-center gap-2">
            <p className="mr-auto text-sm leading-none font-medium">{t('inputTitle')}</p>
            <ButtonGroup>
              {modeOptions.map((option) => {
                const active = option.value === mode;

                return (
                  <Button
                    key={option.value}
                    variant={active ? 'default' : 'outline'}
                    onClick={() => {
                      setMode(option.value);
                      setInput(samples[option.value]);
                    }}
                    aria-pressed={active}
                  >
                    {option.label}
                  </Button>
                );
              })}
            </ButtonGroup>
            <Button variant="outline" onClick={() => setInput(samples[mode])}>
              <RefreshCcw className="size-4" />
              {t('sampleButton')}
            </Button>
          </CardHeader>
          <CardContent>
            <Textarea
              id="binary-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="min-h-32"
              placeholder={
                mode === 'binaryToDigits' ? samples.binaryToDigits : samples.digitsToBinary
              }
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center gap-2">
            <p className="mr-auto text-sm leading-none font-medium">{t('outputTitle')}</p>
            <CardAction>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleCopy(result.value)}
                disabled={!result.value || !!result.errorCode}
              >
                <Copy className="size-4" />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            {result.errorCode ? (
              <Alert variant="destructive">
                <AlertCircle className="size-4" />
                <AlertTitle>{errorLabels[result.errorCode]}</AlertTitle>
              </Alert>
            ) : result.value ? (
              <Item variant="muted" className="flex items-center">
                <p className="text-3xl font-semibold tracking-[0.24em] break-all">{result.value}</p>
              </Item>
            ) : (
              <Item variant="muted" className="flex items-center">
                <p className="text-muted-foreground">{t('emptyState')}</p>
              </Item>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
