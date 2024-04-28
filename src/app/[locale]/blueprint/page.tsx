import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import BreadcrumbNav from '@/components/breadcrumb-nav';

import callOfTheAccursedPageThumbnail from '@/../public/images/thumbnail/call-of-the-accursed-page-thumbnail.png';
import goreTrimmerPageThumbnail from '@/../public/images/thumbnail/gore-trimmer-page-thumbnail.png';
import noThumbnail from '@/../public/images/thumbnail/no-thumbnail.png';
import stairwayToHellPageThumbnail from '@/../public/images/thumbnail/stairway-to-hell-page-thumbnail.png';

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
            title: t('ronins-blade-page.title'),
            description: t('ronins-blade-page.description'),
            href: '/blueprint/ronins-blade',
            image: noThumbnail.src,
        },
        {
            title: t('stairway-to-hell-page.title'),
            description: t('stairway-to-hell-page.description'),
            href: '/blueprint/stairway-to-hell',
            image: stairwayToHellPageThumbnail.src,
        },
        {
            title: t('gore-trimmer-page.title'),
            description: t('gore-trimmer-page.description'),
            href: '/blueprint/gore-trimmer',
            image: goreTrimmerPageThumbnail.src,
        },
        {
            title: t('vicious-hoarder-backpack-page.title'),
            description: t('vicious-hoarder-backpack-page.description'),
            href: '/blueprint/vicious-hoarder-backpack',
            image: noThumbnail.src,
        },
        {
            title: t('call-of-the-accursed-page.title'),
            description: t('call-of-the-accursed-page.description'),
            href: '/blueprint/call-of-the-accursed',
            image: callOfTheAccursedPageThumbnail.src,
        },
        {
            title: t('all-blueprint-list-page.title'),
            description: t('all-blueprint-list-page.description'),
            href: '/blueprint/all-blueprint-list',
            image: noThumbnail.src,
        },
    ];

    return (
        <>
            <div>
                <h1 className="text-4xl font-semibold">{t('blueprint-page.title')}</h1>
                <BreadcrumbNav className="mt-2" />
            </div>
            <div className="mt-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {blueprintItems.map(({ title, description, href, image }) => (
                        <Link key={title} href={href}>
                            <Card className="transition-all duration-300 hover:bg-secondary">
                                <CardHeader>
                                    <CardTitle>{title}</CardTitle>
                                    <CardDescription>{description}</CardDescription>
                                </CardHeader>
                                {image && (
                                    <CardContent>
                                        <div className="relative h-36">
                                            <Image
                                                src={image}
                                                alt={title}
                                                priority
                                                fill
                                                sizes="100% 100%"
                                                className="rounded-md object-cover"
                                            />
                                        </div>
                                    </CardContent>
                                )}
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}
