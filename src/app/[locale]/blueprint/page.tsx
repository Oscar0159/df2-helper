import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import BreadcrumbNav from '@/components/breadcrumb-nav';

type Props = {
    params: { locale: string };
};

type BlueprintItem = {
    title: string;
    description: string;
    href: string;
    image?: string;
};

export default function Blueprint({ params: { locale } }: Props) {
    // Enable static rendering
    unstable_setRequestLocale(locale);

    const t = useTranslations();

    const blueprintItems: BlueprintItem[] = [
        {
            title: t('RoninsBladePage.title'),
            description: t('RoninsBladePage.description'),
            href: '/blueprint/ronins-blade',
        },
        {
            title: t('StairwayToHellPage.title'),
            description: t('StairwayToHellPage.description'),
            href: '/blueprint/stairway-to-hell',
        },
        {
            title: t('GoreTrimmerPage.title'),
            description: t('GoreTrimmerPage.description'),
            href: '/blueprint/gore-trimmer',
        },
        {
            title: t('ViciousHoarderBackpackPage.title'),
            description: t('ViciousHoarderBackpackPage.description'),
            href: '/blueprint/vicious-hoarder-backpack',
        },
        {
            title: t('CallOfTheAccursedPage.title'),
            description: t('CallOfTheAccursedPage.description'),
            href: '/blueprint/call-of-the-accursed',
        },
        {
            title: t('AllBlueprintListPage.title'),
            description: t('AllBlueprintListPage.description'),
            href: '/blueprint/all-blueprint-list',
        },
    ];

    return (
        <>
            <div>
                <h1 className="text-4xl font-semibold">{t('BlueprintPage.title')}</h1>
                <BreadcrumbNav className="mt-2" />
            </div>
            <div className="mt-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {blueprintItems.map((blueprint) => (
                        <Link key={blueprint.title} href={blueprint.href}>
                            <Card className="transition-all duration-300 hover:bg-secondary">
                                <CardHeader>
                                    <CardTitle>{blueprint.title}</CardTitle>
                                    <CardDescription>{blueprint.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {blueprint.image && <Image src={blueprint.image} alt={blueprint.title} />}
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}
