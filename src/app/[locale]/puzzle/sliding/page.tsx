import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import BreadcrumbNav from '@/components/breadcrumb-nav';
import ConstructionAnimation from '@/components/construction-animation';

import Sliding from './sliding';

type Props = {
    params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
    const t = await getTranslations({ locale });

    return {
        title: t('sliding-page.title'),
        description: t('sliding-page.description'),
        openGraph: {
            title: t('sliding-page.title'),
            description: t('sliding-page.description'),
            url: `https://df2-helper.vercel.app/${locale}/puzzle/sliding`,
            siteName: t('locale-layout.title'),
            images: [
                {
                    url: 'https://raw.githubusercontent.com/Oscar0159/df2-helper/master/public/images/og/sliding-page-og.png',
                    alt: t('sliding-page.title'),
                },
            ],
            locale: locale,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('sliding-page.title'),
            description: t('sliding-page.description'),
            site: t('locale-layout.title'),
            images: [
                {
                    url: 'https://raw.githubusercontent.com/Oscar0159/df2-helper/master/public/images/og/sliding-page-og.png',
                    alt: t('sliding-page.title'),
                },
            ],
        },
    };
}

export default function SlidingPage({ params: { locale } }: Props) {
    // Enable static rendering
    unstable_setRequestLocale(locale);

    const t = useTranslations('sliding-page');

    return (
        <>
            <div>
                <h1 className="text-4xl font-semibold">{t('title')}</h1>
                <BreadcrumbNav className="mt-2" />
            </div>
            <div className="mt-4 grow">
                <Sliding />
            </div>
            {/* <div className="flex grow items-center">
                <ConstructionAnimation className="sm:w-1/2" />
            </div> */}
        </>
    );
}
