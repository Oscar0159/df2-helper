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
    const t = await getTranslations({ locale, namespace: 'LightOutPage' });

    return {
        title: t('title'),
        description: t('description'),
        openGraph: {
            title: t('title'),
            description: t('description'),
            images: [
                {
                    url: 'https://github.com/Oscar0159/df2-helper/blob/master/public/images/thumbnail/light-out-page-thumbnail.png',
                    alt: t('title'),
                },
            ],
        },
    };
}

export default function AllBlueprintList({ params: { locale } }: Props) {
    // Enable static rendering
    unstable_setRequestLocale(locale);

    const t = useTranslations('LightOutPage');

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
