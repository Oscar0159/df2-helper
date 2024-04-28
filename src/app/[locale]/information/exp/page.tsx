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
        title: t('exp-page.title'),
        description: t('exp-page.description'),
        openGraph: {
            title: t('exp-page.title'),
            description: t('exp-page.description'),
            url: `https://df2-helper.vercel.app/${locale}/information/exp`,
            siteName: t('locale-layout.title'),
            locale: locale,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('exp-page.title'),
            description: t('exp-page.description'),
            site: t('locale-layout.title'),
        },
    };
}

export default function Exp({ params: { locale } }: Props) {
    // Enable static rendering
    unstable_setRequestLocale(locale);

    const t = useTranslations('exp-page');

    const neededExp = [
        250, 500, 1000, 2000, 3000, 4000, 6000, 8000, 10000, 12000, 14000, 16000, 18000, 20000, 22000, 24000, 26000,
        28000, 30000, 36000, 42000, 48000, 54000, 60000, 66000, 72000, 78000, 84000, 90000, 100000, 110000, 120000,
        130000, 140000, 150000, 160000, 170000, 180000, 190000, 200000, 210000, 220000, 230000, 240000, 250000, 260000,
        270000, 280000, 290000, 500000,
    ];

    return (
        <>
            <div>
                <h1 className="text-4xl font-semibold">{t('title')}</h1>
                <BreadcrumbNav className="mt-2" />
            </div>

            <div className="mt-5 relative w-full h-full">
                <div className="absolute sm:inset-0 h-[calc(75dvh)] sm:h-auto inset-x-0  overflow-auto">
                    <Table>
                        <TableHeader className="sticky top-0 bg-gradient-to-b from-70% from-background to-background/50">
                            <TableRow>
                                <TableHead>{t('level')}</TableHead>
                                <TableHead>{t('exp')}</TableHead>
                                <TableHead>{t('total-exp')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="h-96 overflow-auto">
                            {neededExp.map((exp, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{exp}</TableCell>
                                    <TableCell>{neededExp.slice(0, index + 1).reduce((a, b) => a + b, 0)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
}
