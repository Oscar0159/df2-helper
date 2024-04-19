import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import BreadcrumbNav from '@/components/breadcrumb-nav';

import Dps from './dps';

type Props = {
    params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
    const t = await getTranslations({ locale });

    return {
        title: t('DpsCalculatorPage.title'),
        description: t('DpsCalculatorPage.description'),
        openGraph: {
            title: t('DpsCalculatorPage.title'),
            description: t('DpsCalculatorPage.description'),
            url: `https://df2-helper.vercel.app/${locale}/puzzle/letter`,
            siteName: t('LocaleLayout.title'),
            locale: locale,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('DpsCalculatorPage.title'),
            description: t('DpsCalculatorPage.description'),
            site: t('LocaleLayout.title'),
        },
    };
}

export default function DpsCalculatorPage({ params: { locale } }: Props) {
    // Enable static rendering
    unstable_setRequestLocale(locale);

    const t = useTranslations('DpsCalculatorPage');

    return (
        <>
            <div>
                <h1 className="text-4xl font-semibold">{t('title')}</h1>
                <BreadcrumbNav className="mt-2" />
            </div>
            <div className="mt-4 grow">
                <Dps />
            </div>
        </>
    );
}