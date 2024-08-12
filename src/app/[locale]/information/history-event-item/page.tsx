import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { unstable_setRequestLocale } from 'next-intl/server';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import BreadcrumbNav from '@/components/breadcrumb-nav';

import type { EventItem } from './types';

type Props = {
    params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
    const t = await getTranslations({ locale });

    return {
        title: t('history-event-item-page.title'),
        description: t('history-event-item-page.description'),
        openGraph: {
            title: t('history-event-item-page.title'),
            description: t('history-event-item-page.description'),
            url: `https://df2-helper.vercel.app/${locale}/information/history-event`,
            siteName: t('locale-layout.title'),
            locale: locale,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('history-event-item-page.title'),
            description: t('history-event-item-page.description'),
            site: t('locale-layout.title'),
        },
    };
}

export default function HistoryEventItem({ params: { locale } }: Props) {
    // Enable static rendering
    unstable_setRequestLocale(locale);

    const t = useTranslations();

    const eventItems: EventItem[] = [
        {
            festival: t('history-event-item-page.easter'),
            type: t('item-type.melee'),
            name: t('item-name.crusader-sword'),
            date: new Date('2021-04-02'),
            acquisitionMethod: t('history-event-item-page.drop'),
        },
        {
            festival: t('history-event-item-page.easter'),
            type: t('item-type.head'),
            name: t('item-name.crusader-helmet'),
            date: new Date('2021-04-02'),
            acquisitionMethod: t('history-event-item-page.craft'),
        },
        {
            festival: t('history-event-item-page.halloween'),
            type: t('item-type.melee'),
            name: t('item-name.reaper-scythe'),
            date: new Date('2021-10-23'),
            acquisitionMethod: t('history-event-item-page.drop'),
        },
        {
            festival: t('history-event-item-page.halloween'),
            type: t('item-type.pistol'),
            name: t('item-name.fatman-sidearm'),
            date: new Date('2021-10-23'),
            acquisitionMethod: t('history-event-item-page.drop'),
        },
        {
            festival: t('history-event-item-page.easter'),
            type: t('item-type.assault-rifle'),
            name: t('item-name.purple-raider'),
            date: new Date('2022-04-03'),
            acquisitionMethod: t('history-event-item-page.drop'),
        },
        {
            festival: t('history-event-item-page.easter'),
            type: t('item-type.assault-rifle'),
            name: t('item-name.orange-raider'),
            date: new Date('2022-04-03'),
            acquisitionMethod: t('history-event-item-page.craft'),
        },
        {
            festival: t('history-event-item-page.summer'),
            type: t('item-type.assault-rifle'),
            name: t('item-name.barbeque-n-run'),
            date: new Date('2022-08-10'),
            acquisitionMethod: t('history-event-item-page.drop-craft'),
        },
        {
            festival: t('history-event-item-page.halloween'),
            type: t('item-type.rifle'),
            name: t('item-name.scarecrow-cross'),
            date: new Date('2022-10-21'),
            acquisitionMethod: t('history-event-item-page.drop-craft'),
        },
        {
            festival: t('history-event-item-page.halloween'),
            type: t('item-type.head'),
            name: t('item-name.fright-mask'),
            date: new Date('2022-10-21'),
            acquisitionMethod: t('history-event-item-page.drop-craft'),
        },
        {
            festival: t('history-event-item-page.halloween'),
            type: t('item-type.hands'),
            name: t('item-name.fatman-all-purpose-mittens'),
            date: new Date('2022-10-21'),
            acquisitionMethod: t('history-event-item-page.drop-craft'),
        },
        {
            festival: t('history-event-item-page.halloween'),
            type: t('item-type.shotgun'),
            name: t('item-name.fatman-enforcer'),
            date: new Date('2022-10-21'),
            acquisitionMethod: t('history-event-item-page.drop-craft'),
        },
        {
            festival: t('history-event-item-page.lunar-new-year'),
            type: t('item-type.submachine-gun'),
            name: t('item-name.flowing-rabbit'),
            date: new Date('2023-01-19'),
            acquisitionMethod: t('history-event-item-page.drop-craft'),
        },
        {
            festival: t('history-event-item-page.easter'),
            type: t('item-type.pistol'),
            name: t('item-name.two-headed-devourer'),
            date: new Date('2023-04-08'),
            acquisitionMethod: t('history-event-item-page.drop-craft'),
        },
        {
            festival: t('history-event-item-page.summer'),
            type: t('item-type.rifle'),
            name: t('item-name.sunburn'),
            date: new Date('2023-08-04'),
            acquisitionMethod: t('history-event-item-page.drop'),
        },
        {
            festival: t('history-event-item-page.summer'),
            type: t('item-type.legs'),
            name: t('item-name.safari-shorts'),
            date: new Date('2023-08-04'),
            acquisitionMethod: t('history-event-item-page.drop'),
        },
        {
            festival: t('history-event-item-page.halloween'),
            type: t('item-type.assault-rifle'),
            name: t('item-name.tombstone'),
            date: new Date('2022-10-20'),
            acquisitionMethod: t('history-event-item-page.drop-craft'),
        },
        {
            festival: t('history-event-item-page.halloween'),
            type: t('item-type.head'),
            name: t('item-name.hanged-man-mask'),
            date: new Date('2022-10-20'),
            acquisitionMethod: t('history-event-item-page.drop-craft'),
        },
        {
            festival: t('history-event-item-page.halloween'),
            type: t('item-type.chainsaw'),
            name: t('item-name.fatman-trimmer'),
            date: new Date('2022-10-20'),
            acquisitionMethod: t('history-event-item-page.drop-craft'),
        },
        {
            festival: t('history-event-item-page.christmas'),
            type: t('item-type.pistol'),
            name: t('item-name.ravenous-gunslinger'),
            date: new Date('2022-12-15'),
            acquisitionMethod: t('history-event-item-page.drop-craft'),
        },
        {
            festival: t('history-event-item-page.christmas'),
            type: t('item-type.feet'),
            name: t('item-name.boots-of-greed'),
            date: new Date('2022-12-15'),
            acquisitionMethod: t('history-event-item-page.drop-craft'),
        },
        {
            festival: t('history-event-item-page.christmas'),
            type: t('item-type.legs'),
            name: t('item-name.jeans-of-greed'),
            date: new Date('2022-12-15'),
            acquisitionMethod: t('history-event-item-page.drop-craft'),
        },
        {
            festival: t('history-event-item-page.lunar-new-year'),
            type: t('item-type.rifle'),
            name: t('item-name.dragon-onslaught'),
            date: new Date('2024-02-09'),
            acquisitionMethod: t('history-event-item-page.craft'),
        },
        {
            festival: t('history-event-item-page.lunar-new-year'),
            type: t('item-type.rifle'),
            name: t('item-name.enhanced-dragon-onslaught'),
            date: new Date('2024-02-09'),
            acquisitionMethod: t('history-event-item-page.craft'),
        },
        {
            festival: t('history-event-item-page.lunar-new-year'),
            type: t('item-type.head'),
            name: t('item-name.silver-nian-mask'),
            date: new Date('2024-02-09'),
            acquisitionMethod: t('history-event-item-page.craft'),
        },
        {
            festival: t('history-event-item-page.easter'),
            type: t('item-type.shotgun'),
            name: t('item-name.cain-solution'),
            date: new Date('2024-03-29'),
            acquisitionMethod: t('history-event-item-page.craft'),
        },
        {
            festival: t('history-event-item-page.easter'),
            type: t('item-type.shotgun'),
            name: t('item-name.cain-retribution'),
            date: new Date('2024-03-29'),
            acquisitionMethod: t('history-event-item-page.craft'),
        },
        {
            festival: t('history-event-item-page.easter'),
            type: t('item-type.head'),
            name: t('item-name.carved-hare-mask'),
            date: new Date('2024-03-29'),
            acquisitionMethod: t('history-event-item-page.drop-craft'),
        },
        {
            festival: t('history-event-item-page.summer'),
            type: t('item-type.chainsaw'),
            name: t('item-name.reaver-arm'),
            date: new Date('2024-08-09'),
            acquisitionMethod: t('history-event-item-page.drop-craft')
        },
        {
            festival: t('history-event-item-page.summer'),
            type: t('item-type.chainsaw'),
            name: t('item-name.reaver-reach'),
            date: new Date('2024-08-09'),
            acquisitionMethod: t('history-event-item-page.drop-craft')
        },
        {
            festival: t('history-event-item-page.summer'),
            type: t('item-type.head'),
            name: t('item-name.sunset-drifter-hat'),
            date: new Date('2024-08-09'),
            acquisitionMethod: t('history-event-item-page.drop-craft')
        },
        {
            festival: t('history-event-item-page.summer'),
            type: t('item-type.feet'),
            name: t('item-name.sunset-drifter-sandals'),
            date: new Date('2024-08-09'),
            acquisitionMethod: t('history-event-item-page.drop-craft')
        }
    ];

    return (
        <>
            <div>
                <h1 className="text-4xl font-semibold">{t('history-event-item-page.title')}</h1>
                <BreadcrumbNav className="mt-2" />
            </div>

            <div className="mt-5 relative w-full h-full">
                <div className="absolute sm:inset-0 h-[calc(75dvh)] sm:h-auto inset-x-0  overflow-auto">
                    <Table>
                        <TableHeader className="sticky top-0 bg-gradient-to-b from-70% from-background to-background/50">
                            <TableRow>
                                <TableHead>{t('history-event-item-page.festival')}</TableHead>
                                <TableHead>{t('history-event-item-page.type')}</TableHead>
                                <TableHead>{t('history-event-item-page.name')}</TableHead>
                                <TableHead>{t('history-event-item-page.date')}</TableHead>
                                <TableHead>{t('history-event-item-page.acquisition-method')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {eventItems.map((eventItem) => (
                                <TableRow key={eventItem.name}>
                                    <TableCell>{eventItem.festival}</TableCell>
                                    <TableCell>{eventItem.type}</TableCell>
                                    <TableCell>{eventItem.name}</TableCell>
                                    <TableCell>{eventItem.date.toLocaleDateString()}</TableCell>
                                    <TableCell>{eventItem.acquisitionMethod}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
}
