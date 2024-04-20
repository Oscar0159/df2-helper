import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import BreadcrumbNav from '@/components/breadcrumb-nav';
import ConstructionAnimation from '@/components/construction-animation';

type Props = {
    params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
    const t = await getTranslations({ locale });

    return {
        title: t('AllBlueprintListPage.title'),
        description: t('AllBlueprintListPage.description'),
        openGraph: {
            title: t('AllBlueprintListPage.title'),
            description: t('AllBlueprintListPage.description'),
            url: `https://df2-helper.vercel.app/${locale}/blueprint/all-blueprint-list`,
            siteName: t('LocaleLayout.title'),
            locale: locale,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('AllBlueprintListPage.title'),
            description: t('AllBlueprintListPage.description'),
            site: t('LocaleLayout.title'),
        },
    };
}

export default function AllBlueprintListPage({ params: { locale } }: Props) {
    // Enable static rendering
    unstable_setRequestLocale(locale);

    const t = useTranslations('AllBlueprintListPage');

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
