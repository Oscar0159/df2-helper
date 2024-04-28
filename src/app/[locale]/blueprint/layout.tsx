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
            template: `%s | ${t('blueprint-page.title')} | ${t('locale-layout.title')}`,
            default: t('blueprint-page.title'),
        },
        description: t('blueprint-page.description'),
        openGraph: {
            title: t('blueprint-page.title'),
            description: t('blueprint-page.description'),
            url: `https://df2-helper.vercel.app/${locale}/blueprint`,
            siteName: t('locale-layout.title'),
            locale: locale,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('blueprint-page.title'),
            description: t('blueprint-page.description'),
            site: t('locale-layout.title'),
        },
    };
}

export default function Layout({ children }: Props) {
    return children;
}
