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
        title: t('dps-calculator-page.title'),
        description: t('dps-calculator-page.description'),
        openGraph: {
            title: t('dps-calculator-page.title'),
            description: t('dps-calculator-page.description'),
            url: `https://df2-helper.vercel.app/${locale}/puzzle/letter`,
            siteName: t('locale-layout.title'),
            locale: locale,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('dps-calculator-page.title'),
            description: t('dps-calculator-page.description'),
            site: t('locale-layout.title'),
        },
    };
}

export default function DpsCalculatorPage({ params: { locale } }: Props) {
    // Enable static rendering
    unstable_setRequestLocale(locale);

    const t = useTranslations('dps-calculator-page');

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
