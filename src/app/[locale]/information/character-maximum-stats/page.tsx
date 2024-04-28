import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { unstable_setRequestLocale } from 'next-intl/server';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import BreadcrumbNav from '@/components/breadcrumb-nav';

type Props = {
    params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
    const t = await getTranslations({ locale });

    return {
        title: t('character-maximum-stats-page.title'),
        description: t('character-maximum-stats-page.description'),
        openGraph: {
            title: t('character-maximum-stats-page.title'),
            description: t('character-maximum-stats-page.description'),
            url: `https://df2-helper.vercel.app/${locale}/information/characterStats`,
            siteName: t('locale-layout.title'),
            locale: locale,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('character-maximum-stats-page.title'),
            description: t('character-maximum-stats-page.description'),
            site: t('locale-layout.title'),
        },
    };
}

export default function CharacterStats({ params: { locale } }: Props) {
    // Enable static rendering
    unstable_setRequestLocale(locale);

    const t = useTranslations('character-maximum-stats-page');

    return (
        <>
            <div>
                <h1 className="text-4xl font-semibold">{t('title')}</h1>
                <BreadcrumbNav className="mt-2" />
            </div>
        </>
    );
}
