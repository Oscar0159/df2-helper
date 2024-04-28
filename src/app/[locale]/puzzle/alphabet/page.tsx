import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import BreadcrumbNav from '@/components/breadcrumb-nav';

import Alphabet from './alphabet';

type Props = {
    params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
    const t = await getTranslations({ locale });

    return {
        title: t('alphabet-page.title'),
        description: t('alphabet-page.description'),
        openGraph: {
            title: t('alphabet-page.title'),
            description: t('alphabet-page.description'),
            url: `https://df2-helper.vercel.app/${locale}/puzzle/alphabet`,
            siteName: t('locale-layout.title'),
            images: [
                {
                    url: 'https://raw.githubusercontent.com/Oscar0159/df2-helper/master/public/images/og/alphabet-page-og.png',
                    alt: t('alphabet-page.title'),
                },
            ],
            locale: locale,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('alphabet-page.title'),
            description: t('alphabet-page.description'),
            site: t('locale-layout.title'),
            images: [
                {
                    url: 'https://raw.githubusercontent.com/Oscar0159/df2-helper/master/public/images/og/alphabet-page-og.png',
                    alt: t('alphabet-page.title'),
                },
            ],
        },
    };
}

export default function AlphabetPage({ params: { locale } }: Props) {
    // Enable static rendering
    unstable_setRequestLocale(locale);

    const t = useTranslations('alphabet-page');

    return (
        <>
            <div>
                <h1 className="text-4xl font-semibold">{t('title')}</h1>
                <BreadcrumbNav className="mt-2" />
            </div>
            <div className="mt-4 grow">
                <Alphabet />
            </div>
        </>
    );
}
