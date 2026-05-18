import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { notFound } from 'next/navigation';

import { createPageMetadata, isAppLocale } from '@/lib/seo';

import { WordFinderClient } from './word-finder-client';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isAppLocale(locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'tools.wordFinder' });

  return createPageMetadata({
    locale,
    pathname: '/word-finder',
    title: t('title'),
    description: t('description'),
    keywords:
      locale === 'zh-TW'
        ? ['單字搜尋', '缺字查詢', '亂序字母', 'Dead Frontier 2', 'DF2 Helper']
        : [
            'word finder',
            'word pattern search',
            'anagram solver',
            'word lookup',
            'Dead Frontier 2',
            'DF2 Helper',
          ],
  });
}

export default function WordFinderPage() {
  return <WordFinderClient />;
}
