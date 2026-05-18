'use client';

import { RefreshCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useMemo, useState } from 'react';

import { ConversionModeToggle } from '@/components/shared/conversion-mode-toggle';
import { ConverterOutput } from '@/components/shared/converter-output';
import { Button } from '@/components/ui/button';
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

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
        <div className="tool-panel space-y-4">
          <div className="tool-panel-header">
            <p className="tool-section-title">{t('inputTitle')}</p>
            <div className="tool-toolbar">
              <ConversionModeToggle
                value={mode}
                options={modeOptions}
                onValueChange={(value: MorseMode) => {
                  setMode(value);
                  setInput(samples[value]);
                }}
              />
              <Button variant="outline" onClick={() => setInput(samples[mode])}>
                <RefreshCcw className="size-4" />
                {t('sampleButton')}
              </Button>
            </div>
          </div>

          <Textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            spellCheck={false}
            className="min-h-32 text-base"
            placeholder={samples[mode]}
          />
        </div>

        <div className="tool-panel space-y-4">
          <p className="tool-section-title">{t('outputTitle')}</p>

          {result.errorCode ? (
            <div className="tool-feedback-danger">{errorLabels[result.errorCode]}</div>
          ) : result.primary ? (
            <ConverterOutput
              primaryTitle={t('primaryTitle')}
              detailTitle={t('groupedViewTitle')}
              primary={result.primary}
              secondary={result.secondary}
            />
          ) : (
            <div className="tool-feedback-empty">{t('emptyState')}</div>
          )}
        </div>
      </section>
    </div>
  );
}
