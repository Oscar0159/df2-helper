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
        title: t('AlphabetPage.title'),
        description: t('AlphabetPage.description'),
        openGraph: {
            title: t('AlphabetPage.title'),
            description: t('AlphabetPage.description'),
            url: `https://df2-helper.vercel.app/${locale}/puzzle/alphabet`,
            siteName: t('LocaleLayout.title'),
            images: [
                {
                    url: "https://raw.githubusercontent.com/Oscar0159/df2-helper/master/public/images/og/alphabet-page-og.png",
                    alt: t('AlphabetPage.title'),
                },
            ],
            locale: locale,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('AlphabetPage.title'),
            description: t('AlphabetPage.description'),
            site: t('LocaleLayout.title'),
            images: [
                {
                    url: "https://raw.githubusercontent.com/Oscar0159/df2-helper/master/public/images/og/alphabet-page-og.png",
                    alt: t('AlphabetPage.title'),
                },
            ],
        },
    };
}

export default function AlphabetPage({ params: { locale } }: Props) {
    // Enable static rendering
    unstable_setRequestLocale(locale);

    const t = useTranslations('AlphabetPage');

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
