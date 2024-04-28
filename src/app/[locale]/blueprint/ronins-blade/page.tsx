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
        title: t('ronins-blade-page.title'),
        description: t('ronins-blade-page.description'),
        openGraph: {
            title: t('ronins-blade-page.title'),
            description: t('ronins-blade-page.description'),
            url: `https://df2-helper.vercel.app/${locale}/blueprint/rorins-blade`,
            siteName: t('locale-layout.title'),
            locale: locale,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('ronins-blade-page.title'),
            description: t('ronins-blade-page.description'),
            site: t('locale-layout.title'),
        },
    };
}

export default function RoninsBladePage({ params: { locale } }: Props) {
    // Enable static rendering
    unstable_setRequestLocale(locale);

    const t = useTranslations('ronins-blade-page');

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
