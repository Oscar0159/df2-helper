import { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Skeleton } from '@/components/ui/skeleton';

import BreadcrumbNav from '@/components/breadcrumb-nav';

import * as df2profiler from '@/lib/df2profiler';

import DF2Profiler from './df2-profiler';

type Props = {
    params: { locale: string };
};

async function getDF2ProfilerData() {
    // Fetch data from API
    const response = await fetch('https://df2profiler.com/gamemap/', { next: { revalidate: 3600 } });
    const html = await response.text();

    return df2profiler.parse(html);
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
    const t = await getTranslations({ locale });

    return {
        title: t('DF2ProfilerPage.title'),
        description: t('DF2ProfilerPage.description'),
        openGraph: {
            title: t('DF2ProfilerPage.title'),
            description: t('DF2ProfilerPage.description'),
            url: `https://df2-helper.vercel.app/${locale}/map-mission/df2-profiler`,
            siteName: t('LocaleLayout.title'),
            locale: locale,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('DF2ProfilerPage.title'),
            description: t('DF2ProfilerPage.description'),
            site: t('LocaleLayout.title'),
        },
    };
}

export default async function DF2ProfilerPage({ params: { locale } }: Props) {
    // Enable static rendering
    unstable_setRequestLocale(locale);

    const { mapUrl, mapCells: mapDataList, missions: missionDataList } = await getDF2ProfilerData();

    const t = await getTranslations({ locale, namespace: 'DF2ProfilerPage' });

    return (
        <>
            <div className="shrink-0">
                <h1 className="text-4xl font-semibold">{t('title')}</h1>
                <BreadcrumbNav className="mt-2" />
            </div>
            <div className="mt-4 grow">
                <DF2Profiler
                    mapUrl={mapUrl}
                    mapCells={mapDataList}
                    missions={missionDataList}
                    outposts={df2profiler.outposts}
                    raidBuildings={df2profiler.raidBuildings}
                    chunkSize={6}
                />
            </div>
        </>
    );
}
