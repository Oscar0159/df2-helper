import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { notFound } from 'next/navigation';

import { createPageMetadata, isAppLocale } from '@/lib/seo';

import { SlidingPuzzleClient } from './sliding-puzzle-client';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isAppLocale(locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'tools.slidingPuzzle' });

  return createPageMetadata({
    locale,
    pathname: '/sliding-puzzle',
    title: t('title'),
    description: t('description'),
    keywords:
      locale === 'zh-TW'
        ? ['滑塊拼圖', '拼圖解法', '滑塊遊戲', 'Dead Frontier 2', 'DF2 Helper']
        : [
            'sliding puzzle solver',
            'tile puzzle',
            'puzzle helper',
            'Dead Frontier 2',
            'DF2 Helper',
          ],
  });
}

export default function SlidingPuzzlePage() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <SlidingPuzzleClient />
    </div>
  );
}
