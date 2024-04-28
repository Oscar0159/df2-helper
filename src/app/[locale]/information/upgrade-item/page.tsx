import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { unstable_setRequestLocale } from 'next-intl/server';

import BreadcrumbNav from '@/components/breadcrumb-nav';

type Props = {
    params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
    const t = await getTranslations({ locale });

    return {
        title: t('upgrade-item-page.title'),
        description: t('upgrade-item-page.description'),
        openGraph: {
            title: t('upgrade-item-page.title'),
            description: t('upgrade-item-page.description'),
            url: `https://df2-helper.vercel.app/${locale}/information/upgrade-item`,
            siteName: t('locale-layout.title'),
            locale: locale,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('upgrade-item-page.title'),
            description: t('upgrade-item-page.description'),
            site: t('locale-layout.title'),
        },
    };
}

export default function UpgradeItem({ params: { locale } }: Props) {
    // Enable static rendering
    unstable_setRequestLocale(locale);

    const t = useTranslations('upgrade-item-page');

    return (
        <>
            <div>
                <h1 className="text-4xl font-semibold">{t('title')}</h1>
                <BreadcrumbNav className="mt-2" />
            </div>
        </>
    );
}
