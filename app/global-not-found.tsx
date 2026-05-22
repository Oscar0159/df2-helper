import { Geist, Geist_Mono } from 'next/font/google';
import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';

import '@/styles/globals.css';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('notFound');

  return {
    title: t('metadataTitle'),
    description: t('metadataDescription'),
  };
}

export default async function GlobalNotFound() {
  const locale = await getLocale();
  const t = await getTranslations('notFound');

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col items-center justify-center px-4">
        <Card>
          <CardHeader className="flex h-8 items-center space-x-2">
            <Badge variant="outline" className="tracking-widest">
              {t('badge')}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-2">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
              {t('title')}
            </h1>
            <p className="text-muted-foreground">{t('globalDescription')}</p>
          </CardContent>
          <CardFooter className="flex flex-col justify-end gap-3 sm:flex-row">
            <Button asChild className="w-full sm:w-auto">
              <a href={`/${locale}`}>{t('primaryAction')}</a>
            </Button>
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <a href={`/${locale === 'zh-TW' ? 'en-US' : 'zh-TW'}`}>
                {locale === 'zh-TW' ? t('switchLocale.en-US') : t('switchLocale.zh-TW')}
              </a>
            </Button>
          </CardFooter>
        </Card>
      </body>
    </html>
  );
}
