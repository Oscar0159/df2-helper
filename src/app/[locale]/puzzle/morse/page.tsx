import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import BreadcrumbNav from '@/components/breadcrumb-nav';

import Morse from './morse';

type Props = {
    params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
    const t = await getTranslations({ locale });

    return {
        title: t('MorsePage.title'),
        description: t('MorsePage.description'),
        openGraph: {
            title: t('MorsePage.title'),
            description: t('MorsePage.description'),
            url: `https://df2-helper.vercel.app/${locale}/puzzle/morse`,
            siteName: t('LocaleLayout.title'),
            images: [
                {
                    url: "https://raw.githubusercontent.com/Oscar0159/df2-helper/master/public/images/og/morse-page-og.png",
                    alt: t('MorsePage.title'),
                },
            ],
            locale: locale,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('MorsePage.title'),
            description: t('MorsePage.description'),
            site: t('LocaleLayout.title'),
            images: [
                {
                    url: "https://raw.githubusercontent.com/Oscar0159/df2-helper/master/public/images/og/morse-page-og.png",
                    alt: t('MorsePage.title'),
                },
            ],
        },
    };
}

export default function MorsePage({ params: { locale } }: Props) {
    // Enable static rendering
    unstable_setRequestLocale(locale);

    const t = useTranslations('MorsePage');

    return (
        <>
            <div>
                <h1 className="text-4xl font-semibold">{t('title')}</h1>
                <BreadcrumbNav className="mt-2" />
            </div>
            <div className="mt-4 grow">
                <Morse />
            </div>
        </>
    );
}
