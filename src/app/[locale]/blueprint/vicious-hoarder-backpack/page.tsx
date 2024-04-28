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
        title: t('vicious-hoarder-backpack-page.title'),
        description: t('vicious-hoarder-backpack-page.description'),
        openGraph: {
            title: t('vicious-hoarder-backpack-page.title'),
            description: t('vicious-hoarder-backpack-page.description'),
            url: `https://df2-helper.vercel.app/${locale}/blueprint/vicious-hoarder-backpack`,
            siteName: t('locale-layout.title'),
            locale: locale,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('vicious-hoarder-backpack-page.title'),
            description: t('vicious-hoarder-backpack-page.description'),
            site: t('locale-layout.title'),
        },
    };
}

export default function ViciousHoarderBackpackPage({ params: { locale } }: Props) {
    // Enable static rendering
    unstable_setRequestLocale(locale);

    const t = useTranslations('vicious-hoarder-backpack-page');

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
