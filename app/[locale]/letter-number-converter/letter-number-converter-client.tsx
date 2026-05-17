"use client";

import { RefreshCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { ConversionModeToggle } from "@/components/shared/conversion-mode-toggle";
import { ConverterOutput } from "@/components/shared/converter-output";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  convertLettersToNumbers,
  convertNumbersToLetters,
  type LetterNumberMode,
} from "./utils/letter-number-conversion";

const samples: Record<LetterNumberMode, string> = {
  numbersToLetters: "20 8 5 19 20",
  lettersToNumbers: "FACE",
};

export function LetterNumberConverterClient() {
  const t = useTranslations("tools.letterNumber");
  const [mode, setMode] = useState<LetterNumberMode>("numbersToLetters");
  const [input, setInput] = useState(samples.numbersToLetters);

  const result = useMemo(() => {
    return mode === "numbersToLetters"
      ? convertNumbersToLetters(input)
      : convertLettersToNumbers(input);
  }, [input, mode]);

  const errorLabels = {
    numberOutOfRange: t("errors.numberOutOfRange"),
  };

  const modeOptions = [
    {
      value: "numbersToLetters",
      label: t("modes.numbersToLetters"),
    },
    {
      value: "lettersToNumbers",
      label: t("modes.lettersToNumbers"),
    },
  ] as const satisfies ReadonlyArray<{
    value: LetterNumberMode;
    label: string;
  }>;

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
        <div className="tool-panel space-y-4">
          <div className="tool-panel-header">
            <p className="tool-section-title">{t("inputTitle")}</p>
            <div className="tool-toolbar">
              <ConversionModeToggle
                value={mode}
                options={modeOptions}
                onValueChange={(value: LetterNumberMode) => {
                  setMode(value);
                  setInput(samples[value]);
                }}
              />
              <Button variant="outline" onClick={() => setInput(samples[mode])}>
                <RefreshCcw className="size-4" />
                {t("sampleButton")}
              </Button>
            </div>
          </div>

          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            spellCheck={false}
            className="h-12 text-base"
            placeholder={samples[mode]}
          />
        </div>

        <div className="tool-panel space-y-4">
          <p className="tool-section-title">{t("outputTitle")}</p>

          {result.errorCode ? (
            <div className="tool-feedback-danger">
              {errorLabels[result.errorCode]}
            </div>
          ) : result.primary ? (
            <ConverterOutput
              primaryTitle={t("primaryTitle")}
              detailTitle={t("breakdownTitle")}
              primary={result.primary}
              secondary={result.secondary}
            />
          ) : (
            <div className="tool-feedback-empty">{t("emptyState")}</div>
          )}
        </div>
      </section>
    </div>
  );
}
