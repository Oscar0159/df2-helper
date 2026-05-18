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

import { type MorseMode, convertMorseToText, convertTextToMorse } from './utils/morse-conversion';

const samples: Record<MorseMode, string> = {
  morseToText: '.---- .- -... ----.',
  textToMorse: '1AB9',
};

export function MorseConverterClient() {
  const t = useTranslations('tools.morse');
  const [mode, setMode] = useState<MorseMode>('morseToText');
  const [input, setInput] = useState(samples.morseToText);

  const result = useMemo(() => {
    return mode === 'morseToText' ? convertMorseToText(input) : convertTextToMorse(input);
  }, [input, mode]);

  const errorLabels = {
    unsupportedMorseSequence: t('errors.unsupportedMorseSequence'),
  };

  const modeOptions = [
    {
      value: 'morseToText',
      label: t('modes.morseToText'),
    },
    {
      value: 'textToMorse',
      label: t('modes.textToMorse'),
    },
  ] as const satisfies ReadonlyArray<{
    value: MorseMode;
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
          <CardHeader className="flex items-center gap-2">
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
              placeholder={mode === 'morseToText' ? samples.morseToText : samples.textToMorse}
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
