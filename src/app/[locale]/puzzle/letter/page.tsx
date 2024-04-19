import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import BreadcrumbNav from '@/components/breadcrumb-nav';

import Letter from './letter';

type Props = {
    params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
    const t = await getTranslations({ locale });

    return {
        title: t('LetterPage.title'),
        description: t('LetterPage.description'),
        openGraph: {
            title: t('LetterPage.title'),
            description: t('LetterPage.description'),
            url: `https://df2-helper.vercel.app/${locale}/puzzle/letter`,
            siteName: t('LocaleLayout.title'),
            images: [
                {
                    url: 'https://raw.githubusercontent.com/Oscar0159/df2-helper/master/public/images/og/letter-page-og.png',
                    alt: t('LetterPage.title'),
                },
            ],
            locale: locale,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('LetterPage.title'),
            description: t('LetterPage.description'),
            site: t('LocaleLayout.title'),
            images: [
                {
                    url: 'https://raw.githubusercontent.com/Oscar0159/df2-helper/master/public/images/og/letter-page-og.png',
                    alt: t('LetterPage.title'),
                },
            ],
        },
    };
}

export default function LetterPage({ params: { locale } }: Props) {
    // Enable static rendering
    unstable_setRequestLocale(locale);

    const t = useTranslations('LetterPage');

    return (
        <>
            <div>
                <h1 className="text-4xl font-semibold">{t('title')}</h1>
                <BreadcrumbNav className="mt-2" />
            </div>
            <div className="mt-4 grow">
                <Letter />
            </div>
        </>
    );
}
