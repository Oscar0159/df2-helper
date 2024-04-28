import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { unstable_setRequestLocale } from 'next-intl/server';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import BreadcrumbNav from '@/components/breadcrumb-nav';

import type { ScrapCashItem } from './types';

type Props = {
    params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
    const t = await getTranslations({ locale });

    return {
        title: t('scrap-cash-page.title'),
        description: t('scrap-cash-page.description'),
        openGraph: {
            title: t('scrap-cash-page.title'),
            description: t('scrap-cash-page.description'),
            url: `https://df2-helper.vercel.app/${locale}/information/scrap-cash`,
            siteName: t('locale-layout.title'),
            locale: locale,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('scrap-cash-page.title'),
            description: t('scrap-cash-page.description'),
            site: t('locale-layout.title'),
        },
    };
}

export default function ScrapCash({ params: { locale } }: Props) {
    // Enable static rendering
    unstable_setRequestLocale(locale);

    const t = useTranslations();

    const scrapCashItems: ScrapCashItem[] = [
        {
            name: t('item-name.ivanov'),
            type: t('item-type.pistol'),
            normal: 24,
            superior: 192,
            rare: 384,
            elite: 768,
        },
        {
            name: t('item-name.cz-83'),
            type: t('item-type.pistol'),
            normal: 24,
            superior: 192,
            rare: 384,
            elite: 768,
        },
        {
            name: t('item-name.speed-six'),
            type: t('item-type.pistol'),
            normal: 40,
            superior: 320,
            rare: 640,
            elite: 1280,
        },
        {
            name: t('item-name.parabellum'),
            type: t('item-type.pistol'),
            normal: 60,
            superior: 480,
            rare: 960,
            elite: 1920,
        },
        {
            name: t('item-name.lock-17'),
            type: t('item-type.pistol'),
            normal: 80,
            superior: 640,
            rare: 1280,
            elite: 2560,
        },
        {
            name: t('item-name.python'),
            type: t('item-type.pistol'),
            normal: 80,
            superior: 640,
            rare: 1280,
            elite: 2560,
        },
        {
            name: t('item-name.beta-8000'),
            type: t('item-type.pistol'),
            normal: 100,
            superior: 800,
            rare: 1600,
            elite: 3200,
        },
        {
            name: t('item-name.lock-31'),
            type: t('item-type.pistol'),
            normal: 120,
            superior: 960,
            rare: 1920,
            elite: 3840,
        },
        {
            name: t('item-name.webster-1942'),
            type: t('item-type.pistol'),
            normal: 140,
            superior: 1120,
            rare: 2240,
            elite: 4480,
        },
        {
            name: t('item-name.lock-25'),
            type: t('item-type.pistol'),
            normal: 160,
            superior: 1280,
            rare: 2560,
            elite: 5120,
        },
        {
            name: t('item-name.kolt-police'),
            type: t('item-type.pistol'),
            normal: 180,
            superior: 1440,
            rare: 2880,
            elite: 5760,
        },
        {
            name: t('item-name.beta-90-two'),
            type: t('item-type.pistol'),
            normal: 200,
            superior: 1600,
            rare: 3200,
            elite: 6400,
        },
        {
            name: t('item-name.anaconda'),
            type: t('item-type.pistol'),
            normal: 220,
            superior: 1760,
            rare: 3520,
            elite: 7040,
        },
        {
            name: t('item-name.kolt-1911'),
            type: t('item-type.pistol'),
            normal: 220,
            superior: 1760,
            rare: 3520,
            elite: 7040,
        },
        {
            name: t('item-name.greening-glr'),
            type: t('item-type.rifle'),
            normal: 24,
            superior: 192,
            rare: 384,
            elite: 768,
        },
        {
            name: t('item-name.scout'),
            type: t('item-type.rifle'),
            normal: 40,
            superior: 320,
            rare: 640,
            elite: 1280,
        },
        {
            name: t('item-name.mouzer-m59'),
            type: t('item-type.rifle'),
            normal: 60,
            superior: 480,
            rare: 960,
            elite: 1920,
        },
        {
            name: t('item-name.enfield'),
            type: t('item-type.rifle'),
            normal: 80,
            superior: 640,
            rare: 1280,
            elite: 2560,
        },
        {
            name: t('item-name.m1-garand'),
            type: t('item-type.rifle'),
            normal: 100,
            superior: 800,
            rare: 1600,
            elite: 3200,
        },
        {
            name: t('item-name.dragon-svd'),
            type: t('item-type.rifle'),
            normal: 120,
            superior: 960,
            rare: 1920,
            elite: 3840,
        },
        {
            name: t('item-name.m14'),
            type: t('item-type.rifle'),
            normal: 140,
            superior: 1120,
            rare: 2240,
            elite: 4480,
        },
        {
            name: t('item-name.mosin-nagant'),
            type: t('item-type.rifle'),
            normal: 160,
            superior: 1280,
            rare: 2560,
            elite: 5120,
        },
        {
            name: t('item-name.karabiner-98k'),
            type: t('item-type.rifle'),
            normal: 160,
            superior: 1280,
            rare: 2560,
            elite: 5120,
        },
        {
            name: t('item-name.gewehr-43'),
            type: t('item-type.rifle'),
            normal: 180,
            superior: 1440,
            rare: 2880,
            elite: 5760,
        },
        {
            name: t('item-name.chesterfield-model-70'),
            type: t('item-type.rifle'),
            normal: 200,
            superior: 1600,
            rare: 3200,
            elite: 6400,
        },
        {
            name: t('item-name.chesterfield-1894'),
            type: t('item-type.rifle'),
            normal: 220,
            superior: 1760,
            rare: 3520,
            elite: 7040,
        },
        {
            name: t('item-name.vss-vintorez'),
            type: t('item-type.rifle'),
            normal: 220,
            superior: 1760,
            rare: 3520,
            elite: 7040,
        },
        {
            name: t('item-name.greening-sitori'),
            type: t('item-type.shotgun'),
            normal: 24,
            superior: 192,
            rare: 384,
            elite: 768,
        },
        {
            name: t('item-name.washington-1100'),
            type: t('item-type.shotgun'),
            normal: 40,
            superior: 320,
            rare: 640,
            elite: 1280,
        },
        {
            name: t('item-name.mannberg-500'),
            type: t('item-type.shotgun'),
            normal: 60,
            superior: 480,
            rare: 960,
            elite: 1920,
        },
        {
            name: t('item-name.chesterfield-21'),
            type: t('item-type.shotgun'),
            normal: 60,
            superior: 480,
            rare: 960,
            elite: 1920,
        },
        {
            name: t('item-name.mannberg-590'),
            type: t('item-type.shotgun'),
            normal: 80,
            superior: 640,
            rare: 1280,
            elite: 2560,
        },
        {
            name: t('item-name.mancini-m4'),
            type: t('item-type.shotgun'),
            normal: 100,
            superior: 800,
            rare: 1600,
            elite: 3200,
        },
        {
            name: t('item-name.spsa-12'),
            type: t('item-type.shotgun'),
            normal: 100,
            superior: 800,
            rare: 1600,
            elite: 3200,
        },
        {
            name: t('item-name.sawn-off-shotgun'),
            type: t('item-type.shotgun'),
            normal: 120,
            superior: 960,
            rare: 1920,
            elite: 3840,
        },
        {
            name: t('item-name.mannberg-590m'),
            type: t('item-type.shotgun'),
            normal: 140,
            superior: 1120,
            rare: 2240,
            elite: 4480,
        },
        {
            name: t('item-name.ethaca-10'),
            type: t('item-type.shotgun'),
            normal: 160,
            superior: 1280,
            rare: 2560,
            elite: 5120,
        },
        {
            name: t('item-name.sega-20'),
            type: t('item-type.shotgun'),
            normal: 180,
            superior: 1440,
            rare: 2880,
            elite: 5760,
        },
        {
            name: t('item-name.chesterfield-1887'),
            type: t('item-type.shotgun'),
            normal: 200,
            superior: 1600,
            rare: 3200,
            elite: 6400,
        },
        {
            name: t('item-name.packhammer-12'),
            type: t('item-type.shotgun'),
            normal: 200,
            superior: 1600,
            rare: 3200,
            elite: 6400,
        },
        {
            name: t('item-name.aa-12'),
            type: t('item-type.shotgun'),
            normal: 220,
            superior: 1760,
            rare: 3520,
            elite: 7040,
        },
        {
            name: t('item-name.scorpion'),
            type: t('item-type.submachine-gun'),
            normal: 40,
            superior: 320,
            rare: 640,
            elite: 1280,
        },
        {
            name: t('item-name.usi'),
            type: t('item-type.submachine-gun'),
            normal: 60,
            superior: 480,
            rare: 960,
            elite: 1920,
        },
        {
            name: t('item-name.beta-c4'),
            type: t('item-type.submachine-gun'),
            normal: 80,
            superior: 640,
            rare: 1280,
            elite: 2560,
        },
        {
            name: t('item-name.hk-5'),
            type: t('item-type.submachine-gun'),
            normal: 100,
            superior: 800,
            rare: 1600,
            elite: 3200,
        },
        {
            name: t('item-name.lanchester'),
            type: t('item-type.submachine-gun'),
            normal: 120,
            superior: 960,
            rare: 1920,
            elite: 3840,
        },
        {
            name: t('item-name.mac-11'),
            type: t('item-type.submachine-gun'),
            normal: 140,
            superior: 1120,
            rare: 2240,
            elite: 4480,
        },
        {
            name: t('item-name.bulldog'),
            type: t('item-type.submachine-gun'),
            normal: 160,
            superior: 1280,
            rare: 2560,
            elite: 5120,
        },
        {
            name: t('item-name.criss-victor'),
            type: t('item-type.submachine-gun'),
            normal: 180,
            superior: 1440,
            rare: 2880,
            elite: 5760,
        },
        {
            name: t('item-name.ump-40'),
            type: t('item-type.submachine-gun'),
            normal: 200,
            superior: 1600,
            rare: 3200,
            elite: 6400,
        },
        {
            name: t('item-name.thompson'),
            type: t('item-type.submachine-gun'),
            normal: 220,
            superior: 1760,
            rare: 3520,
            elite: 7040,
        },
        {
            name: t('item-name.grease-gun'),
            type: t('item-type.submachine-gun'),
            normal: 220,
            superior: 1760,
            rare: 3520,
            elite: 7040,
        },
        {
            name: t('item-name.m16'),
            type: t('item-type.assault-rifle'),
            normal: 160,
            superior: 1280,
            rare: 2560,
            elite: 5120,
        },
        {
            name: t('item-name.ak-12'),
            type: t('item-type.assault-rifle'),
            normal: 180,
            superior: 1440,
            rare: 2880,
            elite: 5760,
        },
        {
            name: t('item-name.m4'),
            type: t('item-type.assault-rifle'),
            normal: 200,
            superior: 1600,
            rare: 3200,
            elite: 6400,
        },
        {
            name: t('item-name.ar-10'),
            type: t('item-type.assault-rifle'),
            normal: 220,
            superior: 1760,
            rare: 3520,
            elite: 7040,
        },
        {
            name: t('item-name.ak-47'),
            type: t('item-type.assault-rifle'),
            normal: 220,
            superior: 1760,
            rare: 3520,
            elite: 7040,
        },
        {
            name: t('item-name.2x4'),
            type: t('item-type.melee'),
            normal: 24,
            superior: 192,
            rare: 384,
            elite: 768,
        },
        {
            name: t('item-name.iron-pipe'),
            type: t('item-type.melee'),
            normal: 24,
            superior: 192,
            rare: 384,
            elite: 768,
        },
        {
            name: t('item-name.sledge-hammer'),
            type: t('item-type.melee'),
            normal: 100,
            superior: 800,
            rare: 1600,
            elite: 3200,
        },
        {
            name: t('item-name.baseball-bat'),
            type: t('item-type.melee'),
            normal: 32,
            superior: 256,
            rare: 512,
            elite: 1024,
        },
        {
            name: t('item-name.wrench'),
            type: t('item-type.melee'),
            normal: 32,
            superior: 256,
            rare: 512,
            elite: 1024,
        },
        {
            name: t('item-name.shovel'),
            type: t('item-type.melee'),
            normal: 40,
            superior: 320,
            rare: 640,
            elite: 1280,
        },
        {
            name: t('item-name.crowbar'),
            type: t('item-type.melee'),
            normal: 40,
            superior: 320,
            rare: 640,
            elite: 1280,
        },
        {
            name: t('item-name.barbed-bat'),
            type: t('item-type.melee'),
            normal: 60,
            superior: 480,
            rare: 960,
            elite: 1920,
        },
        {
            name: t('item-name.pick-axe'),
            type: t('item-type.melee'),
            normal: 60,
            superior: 480,
            rare: 960,
            elite: 1920,
        },
        {
            name: t('item-name.nail-bat'),
            type: t('item-type.melee'),
            normal: 80,
            superior: 640,
            rare: 1280,
            elite: 2560,
        },
        {
            name: t('item-name.axe'),
            type: t('item-type.melee'),
            normal: 80,
            superior: 640,
            rare: 1280,
            elite: 2560,
        },
        {
            name: t('item-name.machete'),
            type: t('item-type.melee'),
            normal: 120,
            superior: 960,
            rare: 1920,
            elite: 3840,
        },
        {
            name: t('item-name.longsword'),
            type: t('item-type.melee'),
            normal: 140,
            superior: 1120,
            rare: 2240,
            elite: 4480,
        },
        {
            name: t('item-name.war-hammer'),
            type: t('item-type.melee'),
            normal: 160,
            superior: 1280,
            rare: 2560,
            elite: 5120,
        },
        {
            name: t('item-name.dane-axe'),
            type: t('item-type.melee'),
            normal: 180,
            superior: 1440,
            rare: 2880,
            elite: 5760,
        },
        {
            name: t('item-name.wakizashi'),
            type: t('item-type.melee'),
            normal: 200,
            superior: 1600,
            rare: 3200,
            elite: 6400,
        },
        {
            name: t('item-name.katana'),
            type: t('item-type.melee'),
            normal: 220,
            superior: 1760,
            rare: 3520,
            elite: 7040,
        },
        {
            name: t('item-name.mace'),
            type: t('item-type.melee'),
            normal: 220,
            superior: 1760,
            rare: 3520,
            elite: 7040,
        },
        {
            name: t('item-name.hedge-trimmer'),
            type: t('item-type.chainsaw'),
            normal: 60,
            superior: 480,
            rare: 960,
            elite: 1920,
        },
        {
            name: t('item-name.dilmar-ps'),
            type: t('item-type.chainsaw'),
            normal: 100,
            superior: 800,
            rare: 1600,
            elite: 3200,
        },
        {
            name: t('item-name.ronan-pro'),
            type: t('item-type.chainsaw'),
            normal: 140,
            superior: 1120,
            rare: 2240,
            elite: 4480,
        },
        {
            name: t('item-name.yatesman-g10'),
            type: t('item-type.chainsaw'),
            normal: 180,
            superior: 1440,
            rare: 2880,
            elite: 5760,
        },
        {
            name: t('item-name.cut-off-saw'),
            type: t('item-type.chainsaw'),
            normal: 220,
            superior: 1760,
            rare: 3520,
            elite: 7040,
        },
        {
            name: t('item-name.motocross-armour'),
            type: t('item-type.armour'),
            normal: 50,
            superior: 400,
            rare: 800,
            elite: 1600,
        },
        {
            name: t('item-name.zylon-vest'),
            type: t('item-type.armour'),
            normal: 70,
            superior: 560,
            rare: 1120,
            elite: 2240,
        },
        {
            name: t('item-name.flak-jacket'),
            type: t('item-type.armour'),
            normal: 80,
            superior: 640,
            rare: 1280,
            elite: 2560,
        },
        {
            name: t('item-name.kevlar-vest'),
            type: t('item-type.armour'),
            normal: 90,
            superior: 720,
            rare: 1440,
            elite: 2880,
        },
        {
            name: t('item-name.breast-plate'),
            type: t('item-type.armour'),
            normal: 110,
            superior: 880,
            rare: 1760,
            elite: 3520,
        },
        {
            name: t('item-name.assault-vest'),
            type: t('item-type.armour'),
            normal: 110,
            superior: 880,
            rare: 1760,
            elite: 3520,
        },
        {
            name: t('item-name.sn42'),
            type: t('item-type.armour'),
            normal: 110,
            superior: 880,
            rare: 1760,
            elite: 3520,
        },
        {
            name: t('item-name.beanie-hat'),
            type: t('item-type.head'),
            normal: 12,
            superior: 96,
            rare: 192,
            elite: 384,
        },
        {
            name: t('item-name.baseball-hat'),
            type: t('item-type.head'),
            normal: 12,
            superior: 96,
            rare: 192,
            elite: 384,
        },
        {
            name: t('item-name.sunglasses'),
            type: t('item-type.head'),
            normal: 20,
            superior: 160,
            rare: 320,
            elite: 640,
        },
        {
            name: t('item-name.army-hat'),
            type: t('item-type.head'),
            normal: 30,
            superior: 240,
            rare: 480,
            elite: 960,
        },
        {
            name: t('item-name.cowboy-hat'),
            type: t('item-type.head'),
            normal: 40,
            superior: 320,
            rare: 640,
            elite: 1280,
        },
        {
            name: t('item-name.police-hat'),
            type: t('item-type.head'),
            normal: 50,
            superior: 400,
            rare: 800,
            elite: 1600,
        },
        {
            name: t('item-name.surgical-mask'),
            type: t('item-type.head'),
            normal: 60,
            superior: 480,
            rare: 960,
            elite: 1920,
        },
        {
            name: t('item-name.motorbike-helmet'),
            type: t('item-type.head'),
            normal: 70,
            superior: 560,
            rare: 1120,
            elite: 2240,
        },
        {
            name: t('item-name.hockey-helmet'),
            type: t('item-type.head'),
            normal: 70,
            superior: 560,
            rare: 1120,
            elite: 2240,
        },
        {
            name: t('item-name.football-helmet'),
            type: t('item-type.head'),
            normal: 70,
            superior: 560,
            rare: 1120,
            elite: 2240,
        },
        {
            name: t('item-name.fireman-helmet'),
            type: t('item-type.head'),
            normal: 80,
            superior: 640,
            rare: 1280,
            elite: 2560,
        },
        {
            name: t('item-name.army-helmet'),
            type: t('item-type.head'),
            normal: 90,
            superior: 720,
            rare: 1440,
            elite: 2880,
        },
        {
            name: t('item-name.shirt'),
            type: t('item-type.body'),
            normal: 12,
            superior: 96,
            rare: 192,
            elite: 384,
        },
        {
            name: t('item-name.vest'),
            type: t('item-type.body'),
            normal: 20,
            superior: 160,
            rare: 320,
            elite: 640,
        },
        {
            name: t('item-name.long-sleeve-t-shirt'),
            type: t('item-type.body'),
            normal: 12,
            superior: 96,
            rare: 192,
            elite: 384,
        },
        {
            name: t('item-name.hoodie'),
            type: t('item-type.body'),
            normal: 40,
            superior: 320,
            rare: 640,
            elite: 1280,
        },
        {
            name: t('item-name.leather-jacket'),
            type: t('item-type.body'),
            normal: 50,
            superior: 400,
            rare: 800,
            elite: 1600,
        },
        {
            name: t('item-name.trousers'),
            type: t('item-type.legs'),
            normal: 12,
            superior: 96,
            rare: 192,
            elite: 384,
        },
        {
            name: t('item-name.joggers'),
            type: t('item-type.legs'),
            normal: 20,
            superior: 160,
            rare: 320,
            elite: 640,
        },
        {
            name: t('item-name.jeans'),
            type: t('item-type.legs'),
            normal: 30,
            superior: 240,
            rare: 480,
            elite: 960,
        },
        {
            name: t('item-name.wooly-glvoes'),
            type: t('item-type.hands'),
            normal: 12,
            superior: 96,
            rare: 192,
            elite: 384,
        },
        {
            name: t('item-name.fingeriess-gloves'),
            type: t('item-type.hands'),
            normal: 20,
            superior: 160,
            rare: 320,
            elite: 640,
        },
        {
            name: t('item-name.surgical-gloves'),
            type: t('item-type.hands'),
            normal: 30,
            superior: 240,
            rare: 480,
            elite: 960,
        },
        {
            name: t('item-name.leather-gloves'),
            type: t('item-type.hands'),
            normal: 40,
            superior: 320,
            rare: 640,
            elite: 1280,
        },
        {
            name: t('item-name.superior-san-dais'),
            type: t('item-type.feet'),
            normal: 12,
            superior: 96,
            rare: 192,
            elite: 384,
        },
        {
            name: t('item-name.leather-shoes'),
            type: t('item-type.feet'),
            normal: 20,
            superior: 160,
            rare: 320,
            elite: 640,
        },
        {
            name: t('item-name.trainers'),
            type: t('item-type.feet'),
            normal: 30,
            superior: 240,
            rare: 480,
            elite: 960,
        },
        {
            name: t('item-name.hiking-boots'),
            type: t('item-type.feet'),
            normal: 40,
            superior: 320,
            rare: 640,
            elite: 1280,
        },
        {
            name: t('item-name.combat-boots'),
            type: t('item-type.feet'),
            normal: 50,
            superior: 400,
            rare: 800,
            elite: 1600,
        },
    ];

    const scrapCashPistolItems = scrapCashItems.filter((item) => item.type === t('item-type.pistol'));
    const scrapCashRifleItems = scrapCashItems.filter((item) => item.type === t('item-type.rifle'));
    const scrapCashShotgunItems = scrapCashItems.filter((item) => item.type === t('item-type.shotgun'));
    const scrapCashSubmachineGunItems = scrapCashItems.filter((item) => item.type === t('item-type.submachine-gun'));
    const scrapCashAssaultRifleItems = scrapCashItems.filter((item) => item.type === t('item-type.assault-rifle'));
    const scrapCashMeleeItems = scrapCashItems.filter((item) => item.type === t('item-type.melee'));
    const scrapCashChainsawItems = scrapCashItems.filter((item) => item.type === t('item-type.chainsaw'));
    const scrapCashArmourItems = scrapCashItems.filter((item) => item.type === t('item-type.armour'));
    const scrapCashHeadItems = scrapCashItems.filter((item) => item.type === t('item-type.head'));
    const scrapCashBodyItems = scrapCashItems.filter((item) => item.type === t('item-type.body'));
    const scrapCashLegsItems = scrapCashItems.filter((item) => item.type === t('item-type.legs'));
    const scrapCashHandsItems = scrapCashItems.filter((item) => item.type === t('item-type.hands'));
    const scrapCashFeetItems = scrapCashItems.filter((item) => item.type === t('item-type.feet'));

    return (
        <>
            <div className="grow flex flex-col">
                <h1 className="text-4xl font-semibold">{t('scrap-cash-page.title')}</h1>
                <BreadcrumbNav className="mt-2" />

                <div className="mt-5 grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 grid-cols-1 grow gap-6">
                    <div>
                        <h2 className="text-2xl font-semibold text-muted-foreground">{t('item-type.pistol')}</h2>
                        <Table className="text-sm">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="p-1 w-36">{t('scrap-cash-data-table.name')}</TableHead>
                                    <TableHead className="p-0">{t('scrap-cash-data-table.normal')}</TableHead>
                                    <TableHead className="p-1 dark:text-blue-500 text-blue-700">
                                        {t('scrap-cash-data-table.superior')}
                                    </TableHead>
                                    <TableHead className="p-1 dark:text-yellow-500 text-yellow-700">
                                        {t('scrap-cash-data-table.rare')}
                                    </TableHead>
                                    <TableHead className="p-1 dark:text-violet-500 text-violet-700">
                                        {t('scrap-cash-data-table.elite')}
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {scrapCashPistolItems.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="p-1">{item.name}</TableCell>
                                        <TableCell className="p-1">{item.normal}</TableCell>
                                        <TableCell className="p-1 dark:text-blue-500 text-blue-700">
                                            {item.superior}
                                        </TableCell>
                                        <TableCell className="p-1 dark:text-yellow-500 text-yellow-700">
                                            {item.rare}
                                        </TableCell>
                                        <TableCell className="p-1 dark:text-violet-500 text-violet-700">
                                            {item.elite}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-muted-foreground">{t('item-type.rifle')}</h2>
                        <Table className="text-sm">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="p-1 w-36">{t('scrap-cash-data-table.name')}</TableHead>
                                    <TableHead className="p-0">{t('scrap-cash-data-table.normal')}</TableHead>
                                    <TableHead className="p-1 dark:text-blue-500 text-blue-700">
                                        {t('scrap-cash-data-table.superior')}
                                    </TableHead>
                                    <TableHead className="p-1 dark:text-yellow-500 text-yellow-700">
                                        {t('scrap-cash-data-table.rare')}
                                    </TableHead>
                                    <TableHead className="p-1 dark:text-violet-500 text-violet-700">
                                        {t('scrap-cash-data-table.elite')}
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {scrapCashRifleItems.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="p-1">{item.name}</TableCell>
                                        <TableCell className="p-1">{item.normal}</TableCell>
                                        <TableCell className="p-1 dark:text-blue-500 text-blue-700">
                                            {item.superior}
                                        </TableCell>
                                        <TableCell className="p-1 dark:text-yellow-500 text-yellow-700">
                                            {item.rare}
                                        </TableCell>
                                        <TableCell className="p-1 dark:text-violet-500 text-violet-700">
                                            {item.elite}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-muted-foreground">{t('item-type.shotgun')}</h2>
                        <Table className="text-sm">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="p-1 w-36">{t('scrap-cash-data-table.name')}</TableHead>
                                    <TableHead className="p-0">{t('scrap-cash-data-table.normal')}</TableHead>
                                    <TableHead className="p-1 dark:text-blue-500 text-blue-700">
                                        {t('scrap-cash-data-table.superior')}
                                    </TableHead>
                                    <TableHead className="p-1 dark:text-yellow-500 text-yellow-700">
                                        {t('scrap-cash-data-table.rare')}
                                    </TableHead>
                                    <TableHead className="p-1 dark:text-violet-500 text-violet-700">
                                        {t('scrap-cash-data-table.elite')}
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {scrapCashShotgunItems.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="p-1">{item.name}</TableCell>
                                        <TableCell className="p-1">{item.normal}</TableCell>
                                        <TableCell className="p-1 dark:text-blue-500 text-blue-700">
                                            {item.superior}
                                        </TableCell>
                                        <TableCell className="p-1 dark:text-yellow-500 text-yellow-700">
                                            {item.rare}
                                        </TableCell>
                                        <TableCell className="p-1 dark:text-violet-500 text-violet-700">
                                            {item.elite}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-muted-foreground">
                            {t('item-type.submachine-gun')}
                        </h2>
                        <Table className="text-sm">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="p-1 w-36">{t('scrap-cash-data-table.name')}</TableHead>
                                    <TableHead className="p-0">{t('scrap-cash-data-table.normal')}</TableHead>
                                    <TableHead className="p-1 dark:text-blue-500 text-blue-700">
                                        {t('scrap-cash-data-table.superior')}
                                    </TableHead>
                                    <TableHead className="p-1 dark:text-yellow-500 text-yellow-700">
                                        {t('scrap-cash-data-table.rare')}
                                    </TableHead>
                                    <TableHead className="p-1 dark:text-violet-500 text-violet-700">
                                        {t('scrap-cash-data-table.elite')}
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {scrapCashSubmachineGunItems.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="p-1">{item.name}</TableCell>
                                        <TableCell className="p-1">{item.normal}</TableCell>
                                        <TableCell className="p-1 dark:text-blue-500 text-blue-700">
                                            {item.superior}
                                        </TableCell>
                                        <TableCell className="p-1 dark:text-yellow-500 text-yellow-700">
                                            {item.rare}
                                        </TableCell>
                                        <TableCell className="p-1 dark:text-violet-500 text-violet-700">
                                            {item.elite}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-muted-foreground">{t('item-type.assault-rifle')}</h2>
                        <Table className="text-sm">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="p-1 w-36">{t('scrap-cash-data-table.name')}</TableHead>
                                    <TableHead className="p-0">{t('scrap-cash-data-table.normal')}</TableHead>
                                    <TableHead className="p-1 dark:text-blue-500 text-blue-700">
                                        {t('scrap-cash-data-table.superior')}
                                    </TableHead>
                                    <TableHead className="p-1 dark:text-yellow-500 text-yellow-700">
                                        {t('scrap-cash-data-table.rare')}
                                    </TableHead>
                                    <TableHead className="p-1 dark:text-violet-500 text-violet-700">
                                        {t('scrap-cash-data-table.elite')}
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {scrapCashAssaultRifleItems.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="p-1">{item.name}</TableCell>
                                        <TableCell className="p-1">{item.normal}</TableCell>
                                        <TableCell className="p-1 dark:text-blue-500 text-blue-700">
                                            {item.superior}
                                        </TableCell>
                                        <TableCell className="p-1 dark:text-yellow-500 text-yellow-700">
                                            {item.rare}
                                        </TableCell>
                                        <TableCell className="p-1 dark:text-violet-500 text-violet-700">
                                            {item.elite}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-muted-foreground">{t('item-type.melee')}</h2>
                        <Table className="text-sm">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="p-1 w-36">{t('scrap-cash-data-table.name')}</TableHead>
                                    <TableHead className="p-0">{t('scrap-cash-data-table.normal')}</TableHead>
                                    <TableHead className="p-1 dark:text-blue-500 text-blue-700">
                                        {t('scrap-cash-data-table.superior')}
                                    </TableHead>
                                    <TableHead className="p-1 dark:text-yellow-500 text-yellow-700">
                                        {t('scrap-cash-data-table.rare')}
                                    </TableHead>
                                    <TableHead className="p-1 dark:text-violet-500 text-violet-700">
                                        {t('scrap-cash-data-table.elite')}
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {scrapCashMeleeItems.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="p-1">{item.name}</TableCell>
                                        <TableCell className="p-1">{item.normal}</TableCell>
                                        <TableCell className="p-1 dark:text-blue-500 text-blue-700">
                                            {item.superior}
                                        </TableCell>
                                        <TableCell className="p-1 dark:text-yellow-500 text-yellow-700">
                                            {item.rare}
                                        </TableCell>
                                        <TableCell className="p-1 dark:text-violet-500 text-violet-700">
                                            {item.elite}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-muted-foreground">{t('item-type.chainsaw')}</h2>
                        <Table className="text-sm">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="p-1 w-36">{t('scrap-cash-data-table.name')}</TableHead>
                                    <TableHead className="p-0">{t('scrap-cash-data-table.normal')}</TableHead>
                                    <TableHead className="p-1 dark:text-blue-500 text-blue-700">
                                        {t('scrap-cash-data-table.superior')}
                                    </TableHead>
                                    <TableHead className="p-1 dark:text-yellow-500 text-yellow-700">
                                        {t('scrap-cash-data-table.rare')}
                                    </TableHead>
                                    <TableHead className="p-1 dark:text-violet-500 text-violet-700">
                                        {t('scrap-cash-data-table.elite')}
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {scrapCashChainsawItems.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="p-1">{item.name}</TableCell>
                                        <TableCell className="p-1">{item.normal}</TableCell>
                                        <TableCell className="p-1 dark:text-blue-500 text-blue-700">
                                            {item.superior}
                                        </TableCell>
                                        <TableCell className="p-1 dark:text-yellow-500 text-yellow-700">
                                            {item.rare}
                                        </TableCell>
                                        <TableCell className="p-1 dark:text-violet-500 text-violet-700">
                                            {item.elite}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-muted-foreground">{t('item-type.head')}</h2>
                        <Table className="text-sm">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="p-1 w-36">{t('scrap-cash-data-table.name')}</TableHead>
                                    <TableHead className="p-0">{t('scrap-cash-data-table.normal')}</TableHead>
                                    <TableHead className="p-1 dark:text-blue-500 text-blue-700">
                                        {t('scrap-cash-data-table.superior')}
                                    </TableHead>
                                    <TableHead className="p-1 dark:text-yellow-500 text-yellow-700">
                                        {t('scrap-cash-data-table.rare')}
                                    </TableHead>
                                    <TableHead className="p-1 dark:text-violet-500 text-violet-700">
                                        {t('scrap-cash-data-table.elite')}
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {scrapCashHeadItems.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="p-1">{item.name}</TableCell>
                                        <TableCell className="p-1">{item.normal}</TableCell>
                                        <TableCell className="p-1 dark:text-blue-500 text-blue-700">
                                            {item.superior}
                                        </TableCell>
                                        <TableCell className="p-1 dark:text-yellow-500 text-yellow-700">
                                            {item.rare}
                                        </TableCell>
                                        <TableCell className="p-1 dark:text-violet-500 text-violet-700">
                                            {item.elite}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-muted-foreground">
                            {t('item-type.body') + '&' + t('item-type.armour')}
                        </h2>
                        <Table className="text-sm">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="p-1 w-36">{t('scrap-cash-data-table.name')}</TableHead>
                                    <TableHead className="p-0">{t('scrap-cash-data-table.normal')}</TableHead>
                                    <TableHead className="p-1 dark:text-blue-500 text-blue-700">
                                        {t('scrap-cash-data-table.superior')}
                                    </TableHead>
                                    <TableHead className="p-1 dark:text-yellow-500 text-yellow-700">
                                        {t('scrap-cash-data-table.rare')}
                                    </TableHead>
                                    <TableHead className="p-1 dark:text-violet-500 text-violet-700">
                                        {t('scrap-cash-data-table.elite')}
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {scrapCashBodyItems.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="p-1">{item.name}</TableCell>
                                        <TableCell className="p-1">{item.normal}</TableCell>
                                        <TableCell className="p-1 dark:text-blue-500 text-blue-700">
                                            {item.superior}
                                        </TableCell>
                                        <TableCell className="p-1 dark:text-yellow-500 text-yellow-700">
                                            {item.rare}
                                        </TableCell>
                                        <TableCell className="p-1 dark:text-violet-500 text-violet-700">
                                            {item.elite}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {scrapCashArmourItems.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="p-1">{item.name}</TableCell>
                                        <TableCell className="p-1">{item.normal}</TableCell>
                                        <TableCell className="p-1 dark:text-blue-500 text-blue-700">
                                            {item.superior}
                                        </TableCell>
                                        <TableCell className="p-1 dark:text-yellow-500 text-yellow-700">
                                            {item.rare}
                                        </TableCell>
                                        <TableCell className="p-1 dark:text-violet-500 text-violet-700">
                                            {item.elite}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-muted-foreground">
                            {t('item-type.legs') + '&' + t('item-type.hands') + '&' + t('item-type.feet')}
                        </h2>
                        <Table className="text-sm">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="p-1 w-36">{t('scrap-cash-data-table.name')}</TableHead>
                                    <TableHead className="p-0">{t('scrap-cash-data-table.normal')}</TableHead>
                                    <TableHead className="p-1 dark:text-blue-500 text-blue-700">
                                        {t('scrap-cash-data-table.superior')}
                                    </TableHead>
                                    <TableHead className="p-1 dark:text-yellow-500 text-yellow-700">
                                        {t('scrap-cash-data-table.rare')}
                                    </TableHead>
                                    <TableHead className="p-1 dark:text-violet-500 text-violet-700">
                                        {t('scrap-cash-data-table.elite')}
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {scrapCashLegsItems.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="p-1">{item.name}</TableCell>
                                        <TableCell className="p-1">{item.normal}</TableCell>
                                        <TableCell className="p-1 dark:text-blue-500 text-blue-700">
                                            {item.superior}
                                        </TableCell>
                                        <TableCell className="p-1 dark:text-yellow-500 text-yellow-700">
                                            {item.rare}
                                        </TableCell>
                                        <TableCell className="p-1 dark:text-violet-500 text-violet-700">
                                            {item.elite}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {scrapCashHandsItems.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="p-1">{item.name}</TableCell>
                                        <TableCell className="p-1">{item.normal}</TableCell>
                                        <TableCell className="p-1 dark:text-blue-500 text-blue-700">
                                            {item.superior}
                                        </TableCell>
                                        <TableCell className="p-1 dark:text-yellow-500 text-yellow-700">
                                            {item.rare}
                                        </TableCell>
                                        <TableCell className="p-1 dark:text-violet-500 text-violet-700">
                                            {item.elite}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {scrapCashFeetItems.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="p-1">{item.name}</TableCell>
                                        <TableCell className="p-1">{item.normal}</TableCell>
                                        <TableCell className="p-1 dark:text-blue-500 text-blue-700">
                                            {item.superior}
                                        </TableCell>
                                        <TableCell className="p-1 dark:text-yellow-500 text-yellow-700">
                                            {item.rare}
                                        </TableCell>
                                        <TableCell className="p-1 dark:text-violet-500 text-violet-700">
                                            {item.elite}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    );
}
