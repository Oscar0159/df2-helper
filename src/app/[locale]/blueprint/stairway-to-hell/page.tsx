import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Metadata } from 'next';

import BreadcrumbNav from '@/components/breadcrumb-nav';
import ConstructionAnimation from '@/components/construction-animation';

type Props = {
    params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
    const t = await getTranslations({ locale, namespace: 'StairwayToHellPage' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default function StairwayToHellPage({ params: { locale } }: Props) {
    // Enable static rendering
    unstable_setRequestLocale(locale);

    const t = useTranslations('StairwayToHellPage');

    return (
        <>
            <div>
                <h1 className="text-4xl font-semibold">{t('title')}</h1>
                <BreadcrumbNav className="mt-2" />
            </div>
            <div className="flex grow items-center">
                <ConstructionAnimation className="sm:w-1/2" />
            </div>
        </>
    );
}
