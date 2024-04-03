import { Inter as FontSans } from 'next/font/google';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { ReactNode } from 'react';
import { useMessages, NextIntlClientProvider } from 'next-intl';

import { locales } from '@/config';
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
        title: t('title'),
    };
}

export default function LocaleLayout({ children, params: { locale } }: Props) {
    // Enable static rendering
    unstable_setRequestLocale(locale);

    const messages = useMessages();

    return (
        <html className="h-full" lang={locale}>
            <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
                <ThemeProvider attribute="class" defaultTheme="light">
                    <NextIntlClientProvider messages={messages} locale={locale}>
                        <div className="flex min-h-screen">
                            <Navigation />
                            {children}
                        </div>
                    </NextIntlClientProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
