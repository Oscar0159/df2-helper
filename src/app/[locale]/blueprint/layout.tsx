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
            template: `%s | ${t('BlueprintPage.title')} | ${t('LocaleLayout.title')}`,
            default: t('BlueprintPage.title'),
        },
        description: t('BlueprintPage.description'),
        openGraph: {
            title: t('BlueprintPage.title'),
            description: t('BlueprintPage.description'),
            url: `https://df2-helper.vercel.app/${locale}/blueprint`,
            siteName: t('LocaleLayout.title'),
            locale: locale,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('BlueprintPage.title'),
            description: t('BlueprintPage.description'),
            site: t('LocaleLayout.title'),
        },
    };
}

export default function Layout({ children }: Props) {
    return children;
}
