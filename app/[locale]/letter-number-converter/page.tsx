import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { notFound } from 'next/navigation';

import { createPageMetadata, isAppLocale } from '@/lib/seo';

import { LetterNumberConverterClient } from './letter-number-converter-client';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isAppLocale(locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'tools.letterNumber' });

  return createPageMetadata({
    locale,
    pathname: '/letter-number-converter',
    title: t('title'),
    description: t('description'),
    keywords:
      locale === 'zh-TW'
        ? ['字母數字轉換', '字母索引', 'A1Z26', 'Dead Frontier 2', 'DF2 Helper']
        : ['letter number converter', 'alphabet index', 'A1Z26', 'Dead Frontier 2', 'DF2 Helper'],
  });
}

export default function LetterNumberConverterPage() {
  return <LetterNumberConverterClient />;
}
