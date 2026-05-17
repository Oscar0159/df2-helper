import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { createPageMetadata, isAppLocale } from "@/lib/seo";
import { LightsOutClient } from "./lights-out-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isAppLocale(locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "tools.lightsOut" });

  return createPageMetadata({
    locale,
    pathname: "/lights-out",
    title: t("title"),
    description: t("description"),
    keywords:
      locale === "zh-TW"
        ? [
            "點燈遊戲",
            "Lights Out",
            "解謎",
            "盤面解法",
            "Dead Frontier 2",
            "DF2 Helper",
          ]
        : [
            "Lights Out solver",
            "Lights Out puzzle",
            "board solution",
            "Dead Frontier 2",
            "DF2 Helper",
          ],
  });
}

export default function LightsOutPage() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <LightsOutClient />
    </div>
  );
}
