import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";

const siteName = "DF2 Helper";
const siteDescription = {
  "en-US":
    "Fast and lightweight Dead Frontier 2 tools with puzzle helpers, official links, community resources, and quick access for everyday play.",
  "zh-TW":
    "提供給 Dead Frontier 2 的快速輕量工具站，整合解謎工具、官方連結、社群資源與日常常用入口。",
} as const;

const localeMap = {
  "en-US": "en_US",
  "zh-TW": "zh_TW",
} as const;

function getSiteOrigin() {
  const configuredOrigin =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL;

  if (!configuredOrigin) {
    return "http://localhost:3000";
  }

  if (
    configuredOrigin.startsWith("http://") ||
    configuredOrigin.startsWith("https://")
  ) {
    return configuredOrigin;
  }

  return `https://${configuredOrigin}`;
}

export const metadataBase = new URL(getSiteOrigin());

export type AppLocale = (typeof routing.locales)[number];

type PageSeoInput = {
  locale: AppLocale;
  pathname: string;
  title: string;
  description: string;
  keywords?: string[];
};

function getLocalizedPath(locale: AppLocale, pathname: string) {
  if (pathname === "/") {
    return `/${locale}`;
  }

  return `/${locale}${pathname}`;
}

function getLanguageAlternates(pathname: string) {
  return Object.fromEntries(
    routing.locales.map((locale) => [
      locale,
      getLocalizedPath(locale, pathname),
    ]),
  );
}

export function createPageMetadata({
  locale,
  pathname,
  title,
  description,
  keywords = [],
}: PageSeoInput): Metadata {
  const localizedPath = getLocalizedPath(locale, pathname);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: localizedPath,
      languages: {
        ...getLanguageAlternates(pathname),
        "x-default": getLocalizedPath(routing.defaultLocale, pathname),
      },
    },
    openGraph: {
      type: "website",
      locale: localeMap[locale],
      url: localizedPath,
      siteName,
      title: `${title} | ${siteName}`,
      description,
    },
    twitter: {
      card: "summary",
      title: `${title} | ${siteName}`,
      description,
    },
  };
}

export function createAppMetadata(locale: AppLocale): Metadata {
  return {
    metadataBase,
    applicationName: siteName,
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description: siteDescription[locale],
    category: "games",
    creator: siteName,
    publisher: siteName,
    alternates: {
      languages: {
        ...getLanguageAlternates("/"),
        "x-default": getLocalizedPath(routing.defaultLocale, "/"),
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export const defaultSiteDescription = siteDescription;

export function isAppLocale(locale: string): locale is AppLocale {
  return hasLocale(routing.locales, locale);
}
