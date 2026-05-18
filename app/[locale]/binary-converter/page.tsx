import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { notFound } from 'next/navigation';

import { createPageMetadata, isAppLocale } from '@/lib/seo';

import { BinaryConverterClient } from './binary-converter-client';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isAppLocale(locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'tools.binary' });

  return createPageMetadata({
    locale,
    pathname: '/binary-converter',
    title: t('title'),
    description: t('description'),
    keywords:
      locale === 'zh-TW'
        ? ['二進制轉換', '二進制', '數字解碼', 'Dead Frontier 2', 'DF2 Helper']
        : ['binary converter', 'binary decoder', 'digit clues', 'Dead Frontier 2', 'DF2 Helper'],
  });
}

export default function BinaryConverterPage() {
  return <BinaryConverterClient />;
}
