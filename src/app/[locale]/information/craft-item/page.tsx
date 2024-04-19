import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import BreadcrumbNav from '@/components/breadcrumb-nav';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
    const t = await getTranslations({ locale });

    return {
        title: t('CraftItemPage.title'),
        description: t('CraftItemPage.description'),
        openGraph: {
            title: t('CraftItemPage.title'),
            description: t('CraftItemPage.description'),
            url: `https://df2-helper.vercel.app/${locale}/information/craft-item`,
            siteName: t('LocaleLayout.title'),
            locale: locale,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('CraftItemPage.title'),
            description: t('CraftItemPage.description'),
            site: t('LocaleLayout.title'),
        },
    };
}

export default function CraftItem() {
    const t = useTranslations('CraftItemPage');

    return (
        <>
            <div>
                <h1 className="text-4xl font-semibold">{t('title')}</h1>
                <BreadcrumbNav className="mt-2" />
            </div>
        </>
    );
}
