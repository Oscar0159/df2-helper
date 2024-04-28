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
            template: `%s | ${t('puzzle-page.title')} | ${t('locale-layout.title')}`,
            default: t('puzzle-page.title'),
        },
        description: t('puzzle-page.description'),
        openGraph: {
            title: t('puzzle-page.title'),
            description: t('puzzle-page.description'),
            url: `https://df2-helper.vercel.app/${locale}/puzzle`,
            siteName: t('locale-layout.title'),
            locale: locale,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('puzzle-page.title'),
            description: t('puzzle-page.description'),
            site: t('locale-layout.title'),
        },
    };
}

export default function Layout({ children }: Props) {
    return children;
}
