import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { TooltipProvider } from '@/components/ui/tooltip';

import BreadcrumbNav from '@/components/breadcrumb-nav';
import ConstructionAnimation from '@/components/construction-animation';

import LightOut from './light-out';

type Props = {
    params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
    const t = await getTranslations({ locale });

    return {
        title: t('light-out-page.title'),
        description: t('light-out-page.description'),
        openGraph: {
            title: t('light-out-page.title'),
            description: t('light-out-page.description'),
            url: `https://df2-helper.vercel.app/${locale}/puzzle/light-out`,
            siteName: t('locale-layout.title'),
            images: [
                {
                    url: 'https://raw.githubusercontent.com/Oscar0159/df2-helper/master/public/images/og/light-out-page-og.png',
                    alt: t('light-out-page.title'),
                },
            ],
            locale: locale,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('light-out-page.title'),
            description: t('light-out-page.description'),
            site: t('locale-layout.title'),
            images: [
                {
                    url: 'https://raw.githubusercontent.com/Oscar0159/df2-helper/master/public/images/og/light-out-page-og.png',
                    alt: t('light-out-page.title'),
                },
            ],
        },
    };
}

export default function AllBlueprintList({ params: { locale } }: Props) {
    // Enable static rendering
    unstable_setRequestLocale(locale);

    const t = useTranslations('light-out-page');

    return (
        <>
            <div>
                <h1 className="text-4xl font-semibold">{t('title')}</h1>
                <BreadcrumbNav className="mt-2" />
            </div>
            <div className="mt-4 grow">
                <Suspense fallback={<Skeleton />}>
                    <LightOut />
                </Suspense>
            </div>
        </>
    );
}
