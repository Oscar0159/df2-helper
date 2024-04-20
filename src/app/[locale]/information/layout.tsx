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
            template: `%s | ${t('InformationPage.title')} | ${t('LocaleLayout.title')}`,
            default: t('InformationPage.title'),
        },
        description: t('InformationPage.description'),
        openGraph: {
            title: t('InformationPage.title'),
            description: t('InformationPage.description'),
            url: `https://df2-helper.vercel.app/${locale}/information`,
            siteName: t('LocaleLayout.title'),
            locale: locale,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('InformationPage.title'),
            description: t('InformationPage.description'),
            site: t('LocaleLayout.title'),
        },
    };
}

export default function Layout({ children }: Props) {
    return children;
}
