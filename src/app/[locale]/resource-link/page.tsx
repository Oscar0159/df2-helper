import { locales } from '@/config';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import BreadcrumbNav from '@/components/breadcrumb-nav';

import noThumbnail from '@/../public/images/thumbnail/no-thumbnail.png';

type Props = {
    params: { locale: string };
};

type ResourceLinkItem = {
    title: string;
    description?: string;
    locales: (typeof locales)[number][];
    href: string;
    image?: string;
};

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
    const t = await getTranslations({ locale });

    return {
        title: t('ResourceLinkPage.title'),
        description: t('ResourceLinkPage.description'),
        openGraph: {
            title: t('ResourceLinkPage.title'),
            description: t('ResourceLinkPage.description'),
            url: `https://df2-helper.vercel.app/${locale}/resource-link`,
            siteName: t('LocaleLayout.title'),
            locale: locale,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('ResourceLinkPage.title'),
            description: t('ResourceLinkPage.description'),
            site: t('LocaleLayout.title'),
        },
    };
}

export default function ResourceLink({ params: { locale } }: Props) {
    // Enable static rendering
    unstable_setRequestLocale(locale);

    const t = useTranslations('ResourceLinkPage');

    const resourceLinkItems: ResourceLinkItem[] = [
        {
            title: 'Dead Frontier II Wiki',
            description: t('dead-frontier-ii-wiki.description'),
            locales: ['en'],
            href: 'https://deadfrontier2.fandom.com/wiki/Deadfrontier_II_Wiki',
        },
        {
            title: 'DF2Profiler',
            description: t('df2profiler.description'),
            locales: ['en'],
            href: 'https://df2profiler.com/',
        },
        {
            title: 'DF2Haven',
            description: t('df2haven.description'),
            locales: ['en'],
            href: 'https://www.df2haven.com/',
        },
        {
            title: 'Dead Frontier II Discord',
            description: t('dead-frontier-ii-discord.description'),
            locales: ['en'],
            href: 'https://discordapp.com/invite/deadfrontier2',
        },
        {
            title: 'Dead Frontier II Support',
            description: t('dead-frontier-ii-support.description'),
            locales: ['en'],
            href: 'http://support.deadfrontier2.com/home',
        },
        {
            title: 'Dead Frontier II 筆記',
            description: '由作者：[ℕ.ℂ.] 𝑭𝒂𝒏𝒕𝒂𝒔𝒚 𝑫𝒆𝒊𝒕𝒚整理的DF2筆記',
            locales: ['zh-TW'],
            href: 'https://docs.google.com/spreadsheets/d/1BvPEnkWrWL7KWxabj7JWqzJ48gu_LwPo_tdkU_wZKyk',
        },
        {
            title: 'Dead Frontier II 實用資訊',
            description: 'Discord [DF系列專群]內張貼的實用資訊',
            locales: ['zh-TW'],
            href: 'https://docs.google.com/spreadsheets/d/1KdgvE0y1ZEPK7MXJ59K2DmBQDe7XKnDPTIL0npwkpbE',
        },
    ];

    return (
        <>
            <div>
                <h1 className="text-4xl font-semibold">{t('title')}</h1>
                <BreadcrumbNav className="mt-2" />
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {resourceLinkItems.map(({ title, description, href, image }) => (
                    <a key={title} href={href} target="_blank" rel="noopener noreferrer">
                        <Card className="transition-all duration-300 hover:bg-secondary">
                            <CardHeader>
                                <CardTitle>{title}</CardTitle>
                                <CardDescription>{description}</CardDescription>
                            </CardHeader>
                        </Card>
                    </a>
                ))}
            </div>
        </>
    );
}
