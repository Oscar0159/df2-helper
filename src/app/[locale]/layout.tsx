import { locales } from '@/config';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Inter as FontSans } from 'next/font/google';
import { ReactNode } from 'react';

import Navigation from '@/components/navigation';
import ThemeProvider from '@/components/theme-provider';

import { cn } from '@/lib/utils';

type Props = {
    children: ReactNode;
    params: { locale: string };
};

const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-sans',
});

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: Omit<Props, 'children'>) {
    const t = await getTranslations({ locale, namespace: 'LocaleLayout' });

    return {
        title: {
            template: `%s | ${t('title')}`,
            default: t('title'),
        },
        description: t('description'),
        openGraph: {
            title: t('title'),
            description: t('description'),
            url: `https://df2-helper.vercel.app/${locale}`,
            siteName: t('title'),
            locale: locale,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('title'),
            description: t('description'),
            site: t('title'),
        },
    };
}

export default function LocaleLayout({ children, params: { locale } }: Props) {
    // Enable static rendering
    unstable_setRequestLocale(locale);

    const messages = useMessages();

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={cn('flex overflow-x-hidden bg-background font-sans antialiased', fontSans.variable)}>
                <ThemeProvider attribute="class" defaultTheme="light">
                    <NextIntlClientProvider messages={messages} locale={locale}>
                        <div className="flex grow">
                            <Navigation />
                            <main className="flex w-full flex-col p-5 pb-24 sm:pb-5 sm:pl-0 sm:pt-8 justify-start">
                                {children}
                            </main>
                        </div>
                    </NextIntlClientProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
