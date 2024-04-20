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
        title: t('CallOfTheAccursedPage.title'),
        description: t('CallOfTheAccursedPage.description'),
        openGraph: {
            title: t('CallOfTheAccursedPage.title'),
            description: t('CallOfTheAccursedPage.description'),
            url: `https://df2-helper.vercel.app/${locale}/blueprint/call-of-the-accursed`,
            siteName: t('LocaleLayout.title'),
            locale: locale,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('CallOfTheAccursedPage.title'),
            description: t('CallOfTheAccursedPage.description'),
            site: t('LocaleLayout.title'),
        },
    };
}

export default function CallOfTheAccursedPage({ params: { locale } }: Props) {
    // Enable static rendering
    unstable_setRequestLocale(locale);

    const t = useTranslations('CallOfTheAccursedPage');

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
