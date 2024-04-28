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
        title: t('letter-page.title'),
        description: t('letter-page.description'),
        openGraph: {
            title: t('letter-page.title'),
            description: t('letter-page.description'),
            url: `https://df2-helper.vercel.app/${locale}/puzzle/letter`,
            siteName: t('locale-layout.title'),
            images: [
                {
                    url: 'https://raw.githubusercontent.com/Oscar0159/df2-helper/master/public/images/og/letter-page-og.png',
                    alt: t('letter-page.title'),
                },
            ],
            locale: locale,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('letter-page.title'),
            description: t('letter-page.description'),
            site: t('locale-layout.title'),
            images: [
                {
                    url: 'https://raw.githubusercontent.com/Oscar0159/df2-helper/master/public/images/og/letter-page-og.png',
                    alt: t('letter-page.title'),
                },
            ],
        },
    };
}

export default function LetterPage({ params: { locale } }: Props) {
    // Enable static rendering
    unstable_setRequestLocale(locale);

    const t = useTranslations('letter-page');

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
