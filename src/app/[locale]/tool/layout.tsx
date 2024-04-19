import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
    const t = await getTranslations({ locale });

    return {
        title: {
            template: `%s | ${t('ToolPage.title')} | ${t('LocaleLayout.title')}`,
            default: t('ToolPage.title'),
        },
        description: t('ToolPage.description'),
        openGraph: {
            title: t('ToolPage.title'),
            description: t('ToolPage.description'),
            url: `https://df2-helper.vercel.app/${locale}/tool`,
            siteName: t('LocaleLayout.title'),
            locale: locale,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('ToolPage.title'),
            description: t('ToolPage.description'),
            site: t('LocaleLayout.title'),
        },
    };
}

export default function Layout({ children }: Props) {
    return children;
}
