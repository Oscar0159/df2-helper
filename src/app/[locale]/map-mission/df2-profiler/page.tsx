import { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
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
    const t = await getTranslations({ locale, namespace: 'DF2ProfilerPage' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function DF2ProfilerPage({ params: { locale } }: Props) {
    // Enable static rendering
    unstable_setRequestLocale(locale);

    const { mapUrl, mapDataList, missionDataList } = await getDF2ProfilerData();

    const t = await getTranslations({ locale, namespace: 'DF2ProfilerPage' });

    return (
        <>
            <div className="shrink-0">
                <h1 className="text-4xl font-semibold">{t('title')}</h1>
                <BreadcrumbNav className="mt-2" />
            </div>
            <div className="mt-2 grow">
                <Suspense fallback={<Skeleton />}>
                    <DF2Profiler
                        mapUrl={mapUrl}
                        mapCellList={mapDataList}
                        missionList={missionDataList}
                        outposts={df2profiler.outposts}
                        redBuilding={df2profiler.redBuilding}
                        chunkSize={6}
                    />
                </Suspense>
            </div>
        </>
    );
}
