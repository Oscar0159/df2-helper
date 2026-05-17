import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { createPageMetadata, isAppLocale } from "@/lib/seo";
import { MorseConverterClient } from "./morse-converter-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isAppLocale(locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "tools.morse" });

  return createPageMetadata({
    locale,
    pathname: "/morse-converter",
    title: t("title"),
    description: t("description"),
    keywords:
      locale === "zh-TW"
        ? [
            "摩斯密碼轉換",
            "摩斯碼",
            "訊號解碼",
            "Dead Frontier 2",
            "DF2 Helper",
          ]
        : [
            "Morse converter",
            "Morse code decoder",
            "signal clues",
            "Dead Frontier 2",
            "DF2 Helper",
          ],
  });
}

export default function MorseConverterPage() {
  return <MorseConverterClient />;
}
