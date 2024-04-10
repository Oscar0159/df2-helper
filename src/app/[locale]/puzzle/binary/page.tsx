import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import BreadcrumbNav from '@/components/breadcrumb-nav';

import BinaryPageOG from '../../../../../public/images/og/binary-page-og.png';
import Binary from './binary';

type Props = {
    params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
    const t = await getTranslations({ locale });

    return {
        title: t('BinaryPage.title'),
        description: t('BinaryPage.description'),
        openGraph: {
            title: t('BinaryPage.title'),
            description: t('BinaryPage.description'),
            url: `https://df2-helper.vercel.app/${locale}/puzzle/binary`,
            siteName: t('LocaleLayout.title'),
            images: [
                {
                    url: BinaryPageOG.src,
                    alt: t('BinaryPage.title'),
                },
            ],
            locale: locale,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('BinaryPage.title'),
            description: t('BinaryPage.description'),
            site: t('LocaleLayout.title'),
            images: [
                {
                    url: BinaryPageOG.src,
                    alt: t('BinaryPage.title'),
                },
            ],
        },
    };
}

export default function BinaryPage({ params: { locale } }: Props) {
    // Enable static rendering
    unstable_setRequestLocale(locale);

    const t = useTranslations('BinaryPage');

    return (
        <>
            <div>
                <h1 className="text-4xl font-semibold">{t('title')}</h1>
                <BreadcrumbNav className="mt-2" />
            </div>
            <div className="mt-4 grow">
                <Binary />
            </div>
        </>
    );
}
