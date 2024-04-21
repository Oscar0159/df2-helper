import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { unstable_setRequestLocale } from 'next-intl/server';

import BreadcrumbNav from '@/components/breadcrumb-nav';

import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import type { ScrapCashItem } from './types';

type Props = {
    params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
    const t = await getTranslations({ locale });

    return {
        title: t('ScrapCashPage.title'),
        description: t('ScrapCashPage.description'),
        openGraph: {
            title: t('ScrapCashPage.title'),
            description: t('ScrapCashPage.description'),
            url: `https://df2-helper.vercel.app/${locale}/information/scrap-cash`,
            siteName: t('LocaleLayout.title'),
            locale: locale,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('ScrapCashPage.title'),
            description: t('ScrapCashPage.description'),
            site: t('LocaleLayout.title'),
        },
    };
}

export default function ScrapCash({ params: { locale } }: Props) {
    // Enable static rendering
    unstable_setRequestLocale(locale);

    const t = useTranslations();

    const scrapCashItems: ScrapCashItem[] = [
        {
            name: t('ScrapCashItemName.Ivanov'),
            type: t('ScrapCashItemType.Pistol'),
            normal: 24,
            superior: 192,
            rare: 384,
            elite: 768,
        },
        {
            name: t('ScrapCashItemName.CZ-83'),
            type: t('ScrapCashItemType.Pistol'),
            normal: 24,
            superior: 192,
            rare: 384,
            elite: 768,
        },
        {
            name: t('ScrapCashItemName.Speed Six'),
            type: t('ScrapCashItemType.Pistol'),
            normal: 40,
            superior: 320,
            rare: 640,
            elite: 1280,
        },
        {
            name: t('ScrapCashItemName.Parabellum'),
            type: t('ScrapCashItemType.Pistol'),
            normal: 60,
            superior: 480,
            rare: 960,
            elite: 1920,
        },
        {
            name: t('ScrapCashItemName.Lock-17'),
            type: t('ScrapCashItemType.Pistol'),
            normal: 80,
            superior: 640,
            rare: 1280,
            elite: 2560,
        },
        {
            name: t('ScrapCashItemName.Python'),
            type: t('ScrapCashItemType.Pistol'),
            normal: 80,
            superior: 640,
            rare: 1280,
            elite: 2560,
        },
        {
            name: t('ScrapCashItemName.Beta 8000'),
            type: t('ScrapCashItemType.Pistol'),
            normal: 100,
            superior: 800,
            rare: 1600,
            elite: 3200,
        },
        {
            name: t('ScrapCashItemName.Lock-31'),
            type: t('ScrapCashItemType.Pistol'),
            normal: 120,
            superior: 960,
            rare: 1920,
            elite: 3840,
        },
        {
            name: t('ScrapCashItemName.Webster 1942'),
            type: t('ScrapCashItemType.Pistol'),
            normal: 140,
            superior: 1120,
            rare: 2240,
            elite: 4480,
        },
        {
            name: t('ScrapCashItemName.Lock-25'),
            type: t('ScrapCashItemType.Pistol'),
            normal: 160,
            superior: 1280,
            rare: 2560,
            elite: 5120,
        },
        {
            name: t('ScrapCashItemName.Kolt Police'),
            type: t('ScrapCashItemType.Pistol'),
            normal: 180,
            superior: 1440,
            rare: 2880,
            elite: 5760,
        },
        {
            name: t('ScrapCashItemName.Beta 90-Two'),
            type: t('ScrapCashItemType.Pistol'),
            normal: 200,
            superior: 1600,
            rare: 3200,
            elite: 6400,
        },
        {
            name: t('ScrapCashItemName.Anaconda'),
            type: t('ScrapCashItemType.Pistol'),
            normal: 220,
            superior: 1760,
            rare: 3520,
            elite: 7040,
        },
        {
            name: t('ScrapCashItemName.Kolt 1911'),
            type: t('ScrapCashItemType.Pistol'),
            normal: 220,
            superior: 1760,
            rare: 3520,
            elite: 7040,
        },
        {
            name: t('ScrapCashItemName.Greening GLR'),
            type: t('ScrapCashItemType.Rifle'),
            normal: 24,
            superior: 192,
            rare: 384,
            elite: 768,
        },
        {
            name: t('ScrapCashItemName.Scout'),
            type: t('ScrapCashItemType.Rifle'),
            normal: 40,
            superior: 320,
            rare: 640,
            elite: 1280,
        },
        {
            name: t('ScrapCashItemName.Mouzer M59'),
            type: t('ScrapCashItemType.Rifle'),
            normal: 60,
            superior: 480,
            rare: 960,
            elite: 1920,
        },
        {
            name: t('ScrapCashItemName.Enfield'),
            type: t('ScrapCashItemType.Rifle'),
            normal: 80,
            superior: 640,
            rare: 1280,
            elite: 2560,
        },
        {
            name: t('ScrapCashItemName.M1 Garand'),
            type: t('ScrapCashItemType.Rifle'),
            normal: 100,
            superior: 800,
            rare: 1600,
            elite: 3200,
        },
        {
            name: t('ScrapCashItemName.Dragon SVD'),
            type: t('ScrapCashItemType.Rifle'),
            normal: 120,
            superior: 960,
            rare: 1920,
            elite: 3840,
        },
        {
            name: t('ScrapCashItemName.M14'),
            type: t('ScrapCashItemType.Rifle'),
            normal: 140,
            superior: 1120,
            rare: 2240,
            elite: 4480,
        },
        {
            name: t('ScrapCashItemName.Mosin-Nagant'),
            type: t('ScrapCashItemType.Rifle'),
            normal: 160,
            superior: 1280,
            rare: 2560,
            elite: 5120,
        },
        {
            name: t('ScrapCashItemName.Karabiner 98k'),
            type: t('ScrapCashItemType.Rifle'),
            normal: 160,
            superior: 1280,
            rare: 2560,
            elite: 5120,
        },
        {
            name: t('ScrapCashItemName.Gewehr 43'),
            type: t('ScrapCashItemType.Rifle'),
            normal: 180,
            superior: 1440,
            rare: 2880,
            elite: 5760,
        },
        {
            name: t('ScrapCashItemName.Chesterfield Model 70'),
            type: t('ScrapCashItemType.Rifle'),
            normal: 200,
            superior: 1600,
            rare: 3200,
            elite: 6400,
        },
        {
            name: t('ScrapCashItemName.Chesterfield 1894'),
            type: t('ScrapCashItemType.Rifle'),
            normal: 220,
            superior: 1760,
            rare: 3520,
            elite: 7040,
        },
        {
            name: t('ScrapCashItemName.VSS Vintorez'),
            type: t('ScrapCashItemType.Rifle'),
            normal: 220,
            superior: 1760,
            rare: 3520,
            elite: 7040,
        },
        {
            name: t('ScrapCashItemName.Greening Sitori'),
            type: t('ScrapCashItemType.Shotgun'),
            normal: 24,
            superior: 192,
            rare: 384,
            elite: 768,
        },
        {
            name: t('ScrapCashItemName.Washington 1100'),
            type: t('ScrapCashItemType.Shotgun'),
            normal: 40,
            superior: 320,
            rare: 640,
            elite: 1280,
        },
        {
            name: t('ScrapCashItemName.Mannberg 500'),
            type: t('ScrapCashItemType.Shotgun'),
            normal: 60,
            superior: 480,
            rare: 960,
            elite: 1920,
        },
        {
            name: t('ScrapCashItemName.Chesterfield 21'),
            type: t('ScrapCashItemType.Shotgun'),
            normal: 60,
            superior: 480,
            rare: 960,
            elite: 1920,
        },
        {
            name: t('ScrapCashItemName.Mannberg 590'),
            type: t('ScrapCashItemType.Shotgun'),
            normal: 80,
            superior: 640,
            rare: 1280,
            elite: 2560,
        },
        {
            name: t('ScrapCashItemName.Mancini M4'),
            type: t('ScrapCashItemType.Shotgun'),
            normal: 100,
            superior: 800,
            rare: 1600,
            elite: 3200,
        },
        {
            name: t('ScrapCashItemName.SPSA-12'),
            type: t('ScrapCashItemType.Shotgun'),
            normal: 100,
            superior: 800,
            rare: 1600,
            elite: 3200,
        },
        {
            name: t('ScrapCashItemName.Sawn-off Shotgun'),
            type: t('ScrapCashItemType.Shotgun'),
            normal: 120,
            superior: 960,
            rare: 1920,
            elite: 3840,
        },
        {
            name: t('ScrapCashItemName.Mannberg 590M'),
            type: t('ScrapCashItemType.Shotgun'),
            normal: 140,
            superior: 1120,
            rare: 2240,
            elite: 4480,
        },
        {
            name: t('ScrapCashItemName.Ethaca-10'),
            type: t('ScrapCashItemType.Shotgun'),
            normal: 160,
            superior: 1280,
            rare: 2560,
            elite: 5120,
        },
        {
            name: t('ScrapCashItemName.Sega-20'),
            type: t('ScrapCashItemType.Shotgun'),
            normal: 180,
            superior: 1440,
            rare: 2880,
            elite: 5760,
        },
        {
            name: t('ScrapCashItemName.Chesterfield 1887'),
            type: t('ScrapCashItemType.Shotgun'),
            normal: 200,
            superior: 1600,
            rare: 3200,
            elite: 6400,
        },
        {
            name: t('ScrapCashItemName.Packhammer-12'),
            type: t('ScrapCashItemType.Shotgun'),
            normal: 200,
            superior: 1600,
            rare: 3200,
            elite: 6400,
        },
        {
            name: t('ScrapCashItemName.AA-12'),
            type: t('ScrapCashItemType.Shotgun'),
            normal: 220,
            superior: 1760,
            rare: 3520,
            elite: 7040,
        },
        {
            name: t('ScrapCashItemName.Scorpion'),
            type: t('ScrapCashItemType.Submachine Gun'),
            normal: 40,
            superior: 320,
            rare: 640,
            elite: 1280,
        },
        {
            name: t('ScrapCashItemName.USI'),
            type: t('ScrapCashItemType.Submachine Gun'),
            normal: 60,
            superior: 480,
            rare: 960,
            elite: 1920,
        },
        {
            name: t('ScrapCashItemName.Beta C4'),
            type: t('ScrapCashItemType.Submachine Gun'),
            normal: 80,
            superior: 640,
            rare: 1280,
            elite: 2560,
        },
        {
            name: t('ScrapCashItemName.HK-5'),
            type: t('ScrapCashItemType.Submachine Gun'),
            normal: 100,
            superior: 800,
            rare: 1600,
            elite: 3200,
        },
        {
            name: t('ScrapCashItemName.Lanchester'),
            type: t('ScrapCashItemType.Submachine Gun'),
            normal: 120,
            superior: 960,
            rare: 1920,
            elite: 3840,
        },
        {
            name: t('ScrapCashItemName.Mac-11'),
            type: t('ScrapCashItemType.Submachine Gun'),
            normal: 140,
            superior: 1120,
            rare: 2240,
            elite: 4480,
        },
        {
            name: t('ScrapCashItemName.Bulldog'),
            type: t('ScrapCashItemType.Submachine Gun'),
            normal: 160,
            superior: 1280,
            rare: 2560,
            elite: 5120,
        },
        {
            name: t('ScrapCashItemName.Criss Victor'),
            type: t('ScrapCashItemType.Submachine Gun'),
            normal: 180,
            superior: 1440,
            rare: 2880,
            elite: 5760,
        },
        {
            name: t('ScrapCashItemName.UMP-40'),
            type: t('ScrapCashItemType.Submachine Gun'),
            normal: 200,
            superior: 1600,
            rare: 3200,
            elite: 6400,
        },
        {
            name: t('ScrapCashItemName.Thompson'),
            type: t('ScrapCashItemType.Submachine Gun'),
            normal: 220,
            superior: 1760,
            rare: 3520,
            elite: 7040,
        },
        {
            name: t('ScrapCashItemName.Grease Gun'),
            type: t('ScrapCashItemType.Submachine Gun'),
            normal: 220,
            superior: 1760,
            rare: 3520,
            elite: 7040,
        },
        {
            name: t('ScrapCashItemName.M16'),
            type: t('ScrapCashItemType.Assault Rifle'),
            normal: 160,
            superior: 1280,
            rare: 2560,
            elite: 5120,
        },
        {
            name: t('ScrapCashItemName.AK-12'),
            type: t('ScrapCashItemType.Assault Rifle'),
            normal: 180,
            superior: 1440,
            rare: 2880,
            elite: 5760,
        },
        {
            name: t('ScrapCashItemName.M4'),
            type: t('ScrapCashItemType.Assault Rifle'),
            normal: 200,
            superior: 1600,
            rare: 3200,
            elite: 6400,
        },
        {
            name: t('ScrapCashItemName.AR-10'),
            type: t('ScrapCashItemType.Assault Rifle'),
            normal: 220,
            superior: 1760,
            rare: 3520,
            elite: 7040,
        },
        {
            name: t('ScrapCashItemName.AK-47'),
            type: t('ScrapCashItemType.Assault Rifle'),
            normal: 220,
            superior: 1760,
            rare: 3520,
            elite: 7040,
        },
        {
            name: t('ScrapCashItemName.2x4'),
            type: t('ScrapCashItemType.Melee'),
            normal: 24,
            superior: 192,
            rare: 384,
            elite: 768,
        },
        {
            name: t('ScrapCashItemName.Iron Pipe'),
            type: t('ScrapCashItemType.Melee'),
            normal: 24,
            superior: 192,
            rare: 384,
            elite: 768,
        },
        {
            name: t('ScrapCashItemName.Sledge Hammer'),
            type: t('ScrapCashItemType.Melee'),
            normal: 100,
            superior: 800,
            rare: 1600,
            elite: 3200,
        },
        {
            name: t('ScrapCashItemName.Baseball Bat'),
            type: t('ScrapCashItemType.Melee'),
            normal: 32,
            superior: 256,
            rare: 512,
            elite: 1024,
        },
        {
            name: t('ScrapCashItemName.Wrench'),
            type: t('ScrapCashItemType.Melee'),
            normal: 32,
            superior: 256,
            rare: 512,
            elite: 1024,
        },
        {
            name: t('ScrapCashItemName.Shovel'),
            type: t('ScrapCashItemType.Melee'),
            normal: 40,
            superior: 320,
            rare: 640,
            elite: 1280,
        },
        {
            name: t('ScrapCashItemName.Crowbar'),
            type: t('ScrapCashItemType.Melee'),
            normal: 40,
            superior: 320,
            rare: 640,
            elite: 1280,
        },
        {
            name: t('ScrapCashItemName.Barbed Bat'),
            type: t('ScrapCashItemType.Melee'),
            normal: 60,
            superior: 480,
            rare: 960,
            elite: 1920,
        },
        {
            name: t('ScrapCashItemName.Pick Axe'),
            type: t('ScrapCashItemType.Melee'),
            normal: 60,
            superior: 480,
            rare: 960,
            elite: 1920,
        },
        {
            name: t('ScrapCashItemName.Nail Bat'),
            type: t('ScrapCashItemType.Melee'),
            normal: 80,
            superior: 640,
            rare: 1280,
            elite: 2560,
        },
        {
            name: t('ScrapCashItemName.Axe'),
            type: t('ScrapCashItemType.Melee'),
            normal: 80,
            superior: 640,
            rare: 1280,
            elite: 2560,
        },
        {
            name: t('ScrapCashItemName.Machete'),
            type: t('ScrapCashItemType.Melee'),
            normal: 120,
            superior: 960,
            rare: 1920,
            elite: 3840,
        },
        {
            name: t('ScrapCashItemName.Longsword'),
            type: t('ScrapCashItemType.Melee'),
            normal: 140,
            superior: 1120,
            rare: 2240,
            elite: 4480,
        },
        {
            name: t('ScrapCashItemName.War Hammer'),
            type: t('ScrapCashItemType.Melee'),
            normal: 160,
            superior: 1280,
            rare: 2560,
            elite: 5120,
        },
        {
            name: t('ScrapCashItemName.Dane Axe'),
            type: t('ScrapCashItemType.Melee'),
            normal: 180,
            superior: 1440,
            rare: 2880,
            elite: 5760,
        },
        {
            name: t('ScrapCashItemName.Wakizashi'),
            type: t('ScrapCashItemType.Melee'),
            normal: 200,
            superior: 1600,
            rare: 3200,
            elite: 6400,
        },
        {
            name: t('ScrapCashItemName.Katana'),
            type: t('ScrapCashItemType.Melee'),
            normal: 220,
            superior: 1760,
            rare: 3520,
            elite: 7040,
        },
        {
            name: t('ScrapCashItemName.Mace'),
            type: t('ScrapCashItemType.Melee'),
            normal: 220,
            superior: 1760,
            rare: 3520,
            elite: 7040,
        },
        {
            name: t('ScrapCashItemName.Hedge Trimmer'),
            type: t('ScrapCashItemType.Chainsaw'),
            normal: 60,
            superior: 480,
            rare: 960,
            elite: 1920,
        },
        {
            name: t('ScrapCashItemName.Dilmar PS'),
            type: t('ScrapCashItemType.Chainsaw'),
            normal: 100,
            superior: 800,
            rare: 1600,
            elite: 3200,
        },
        {
            name: t('ScrapCashItemName.Ronan Pro'),
            type: t('ScrapCashItemType.Chainsaw'),
            normal: 140,
            superior: 1120,
            rare: 2240,
            elite: 4480,
        },
        {
            name: t('ScrapCashItemName.Yatesman G10'),
            type: t('ScrapCashItemType.Chainsaw'),
            normal: 180,
            superior: 1440,
            rare: 2880,
            elite: 5760,
        },
        {
            name: t('ScrapCashItemName.Cut-Off Saw'),
            type: t('ScrapCashItemType.Chainsaw'),
            normal: 220,
            superior: 1760,
            rare: 3520,
            elite: 7040,
        },
        {
            name: t('ScrapCashItemName.Motocross Armour'),
            type: t('ScrapCashItemType.Armour'),
            normal: 50,
            superior: 400,
            rare: 800,
            elite: 1600,
        },
        {
            name: t('ScrapCashItemName.Zylon Vest'),
            type: t('ScrapCashItemType.Armour'),
            normal: 70,
            superior: 560,
            rare: 1120,
            elite: 2240,
        },
        {
            name: t('ScrapCashItemName.Flak Jacket'),
            type: t('ScrapCashItemType.Armour'),
            normal: 80,
            superior: 640,
            rare: 1280,
            elite: 2560,
        },
        {
            name: t('ScrapCashItemName.Kevlar Vest'),
            type: t('ScrapCashItemType.Armour'),
            normal: 90,
            superior: 720,
            rare: 1440,
            elite: 2880,
        },
        {
            name: t('ScrapCashItemName.Breast Plate'),
            type: t('ScrapCashItemType.Armour'),
            normal: 90,
            superior: 720,
            rare: 1440,
            elite: 2880,
        },
        {
            name: t('ScrapCashItemName.Assault Vest'),
            type: t('ScrapCashItemType.Armour'),
            normal: 90,
            superior: 720,
            rare: 1440,
            elite: 2880,
        },
        {
            name: t('ScrapCashItemName.SN42'),
            type: t('ScrapCashItemType.Armour'),
            normal: 90,
            superior: 720,
            rare: 1440,
            elite: 2880,
        },
        {
            name: t('ScrapCashItemName.Beanie Hat'),
            type: t('ScrapCashItemType.Head'),
            normal: 12,
            superior: 96,
            rare: 192,
            elite: 384,
        },
        {
            name: t('ScrapCashItemName.Baseball Hat'),
            type: t('ScrapCashItemType.Head'),
            normal: 12,
            superior: 96,
            rare: 192,
            elite: 384,
        },
        {
            name: t('ScrapCashItemName.Sunglasses'),
            type: t('ScrapCashItemType.Head'),
            normal: 20,
            superior: 160,
            rare: 320,
            elite: 640,
        },
        {
            name: t('ScrapCashItemName.Army Hat'),
            type: t('ScrapCashItemType.Head'),
            normal: 30,
            superior: 240,
            rare: 480,
            elite: 960,
        },
        {
            name: t('ScrapCashItemName.Cowboy Hat'),
            type: t('ScrapCashItemType.Head'),
            normal: 40,
            superior: 320,
            rare: 640,
            elite: 1280,
        },
        {
            name: t('ScrapCashItemName.Police Hat'),
            type: t('ScrapCashItemType.Head'),
            normal: 50,
            superior: 400,
            rare: 800,
            elite: 1600,
        },
        {
            name: t('ScrapCashItemName.Surgical Mask'),
            type: t('ScrapCashItemType.Head'),
            normal: 60,
            superior: 480,
            rare: 960,
            elite: 1920,
        },
        {
            name: t('ScrapCashItemName.Motorbike Helmet'),
            type: t('ScrapCashItemType.Head'),
            normal: 70,
            superior: 560,
            rare: 1120,
            elite: 2240,
        },
        {
            name: t('ScrapCashItemName.Hockey Helmet'),
            type: t('ScrapCashItemType.Head'),
            normal: 70,
            superior: 560,
            rare: 1120,
            elite: 2240,
        },
        {
            name: t('ScrapCashItemName.Football Helmet'),
            type: t('ScrapCashItemType.Head'),
            normal: 70,
            superior: 560,
            rare: 1120,
            elite: 2240,
        },
        {
            name: t('ScrapCashItemName.Fireman Helmet'),
            type: t('ScrapCashItemType.Head'),
            normal: 80,
            superior: 640,
            rare: 1280,
            elite: 2560,
        },
        {
            name: t('ScrapCashItemName.Army Helmet'),
            type: t('ScrapCashItemType.Head'),
            normal: 90,
            superior: 720,
            rare: 1440,
            elite: 2880,
        },
        {
            name: t('ScrapCashItemName.Shirt'),
            type: t('ScrapCashItemType.Body'),
            normal: 12,
            superior: 96,
            rare: 192,
            elite: 384,
        },
        {
            name: t('ScrapCashItemName.Vest'),
            type: t('ScrapCashItemType.Body'),
            normal: 20,
            superior: 160,
            rare: 320,
            elite: 640,
        },
        {
            name: t('ScrapCashItemName.Long Sleeve T-Shirt'),
            type: t('ScrapCashItemType.Body'),
            normal: 12,
            superior: 96,
            rare: 192,
            elite: 384,
        },
        {
            name: t('ScrapCashItemName.Hoodie'),
            type: t('ScrapCashItemType.Body'),
            normal: 40,
            superior: 320,
            rare: 640,
            elite: 1280,
        },
        {
            name: t('ScrapCashItemName.Leather Jacket'),
            type: t('ScrapCashItemType.Body'),
            normal: 50,
            superior: 400,
            rare: 800,
            elite: 1600,
        },
        {
            name: t('ScrapCashItemName.Trousers'),
            type: t('ScrapCashItemType.Legs'),
            normal: 12,
            superior: 96,
            rare: 192,
            elite: 384,
        },
        {
            name: t('ScrapCashItemName.Joggers'),
            type: t('ScrapCashItemType.Legs'),
            normal: 20,
            superior: 160,
            rare: 320,
            elite: 640,
        },
        {
            name: t('ScrapCashItemName.Jeans'),
            type: t('ScrapCashItemType.Legs'),
            normal: 30,
            superior: 240,
            rare: 480,
            elite: 960,
        },
        {
            name: t('ScrapCashItemName.Wooly Glvoes'),
            type: t('ScrapCashItemType.Hands'),
            normal: 12,
            superior: 96,
            rare: 192,
            elite: 384,
        },
        {
            name: t('ScrapCashItemName.Fingeriess Gloves'),
            type: t('ScrapCashItemType.Hands'),
            normal: 20,
            superior: 160,
            rare: 320,
            elite: 640,
        },
        {
            name: t('ScrapCashItemName.Surgical Gloves'),
            type: t('ScrapCashItemType.Hands'),
            normal: 30,
            superior: 240,
            rare: 480,
            elite: 960,
        },
        {
            name: t('ScrapCashItemName.Leather Gloves'),
            type: t('ScrapCashItemType.Hands'),
            normal: 40,
            superior: 320,
            rare: 640,
            elite: 1280,
        },
        {
            name: t('ScrapCashItemName.Superior San dais'),
            type: t('ScrapCashItemType.Feet'),
            normal: 12,
            superior: 96,
            rare: 192,
            elite: 384,
        },
        {
            name: t('ScrapCashItemName.Leather Shoes'),
            type: t('ScrapCashItemType.Feet'),
            normal: 20,
            superior: 160,
            rare: 320,
            elite: 640,
        },
        {
            name: t('ScrapCashItemName.Trainers'),
            type: t('ScrapCashItemType.Feet'),
            normal: 30,
            superior: 240,
            rare: 480,
            elite: 960,
        },
        {
            name: t('ScrapCashItemName.Hiking Boots'),
            type: t('ScrapCashItemType.Feet'),
            normal: 40,
            superior: 320,
            rare: 640,
            elite: 1280,
        },
        {
            name: t('ScrapCashItemName.Combat Boots'),
            type: t('ScrapCashItemType.Feet'),
            normal: 50,
            superior: 400,
            rare: 800,
            elite: 1600,
        },
    ];

    return (
        <>
            <div>
                <h1 className="text-4xl font-semibold">{t('ScrapCashPage.title')}</h1>
                <BreadcrumbNav className="mt-2" />

                <div className="mt-5">
                    <DataTable data={scrapCashItems} columns={columns} />
                </div>
            </div>
        </>
    );
}
