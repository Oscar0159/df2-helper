import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import BreadcrumbNav from '@/components/breadcrumb-nav';

import bluePrintPageThumbnail from '@/../public/images/thumbnail/blueprint-page-thumbnail.png';
import mapMissionPageThumbnail from '@/../public/images/thumbnail/map-mission-page-thumbnail.png';
import noThumbnail from '@/../public/images/thumbnail/no-thumbnail.png';
import puzzlePageThumbnail from '@/../public/images/thumbnail/puzzle-page-thumbnail.png';
import toolPageThumbnail from '@/../public/images/thumbnail/tool-page-thumbnail.png';

type Props = {
    params: { locale: string };
};

type NavigationItem = {
    title: string;
    description?: string;
    href: string;
    image?: string;
};

export default function Home({ params: { locale } }: Props) {
    // Enable static rendering
    unstable_setRequestLocale(locale);

    const t = useTranslations();

    const navigationItems: NavigationItem[] = [
        {
            title: t('information-page.title'),
            description: t('information-page.description'),
            href: '/information',
            image: noThumbnail.src,
        },
        {
            title: t('map-mission-page.title'),
            description: t('map-mission-page.description'),
            href: '/map-mission',
            image: mapMissionPageThumbnail.src,
        },
        {
            title: t('puzzle-page.title'),
            description: t('puzzle-page.description'),
            href: '/puzzle',
            image: puzzlePageThumbnail.src,
        },
        {
            title: t('blueprint-page.title'),
            description: t('blueprint-page.description'),
            href: '/blueprint',
            image: bluePrintPageThumbnail.src,
        },
        {
            title: t('calculator-page.title'),
            description: t('calculator-page.description'),
            href: '/calculator',
            image: noThumbnail.src,
        },
        {
            title: t('tool-page.title'),
            description: t('tool-page.description'),
            href: '/tool',
            image: toolPageThumbnail.src,
        },
        {
            title: t('resource-link-page.title'),
            description: t('resource-link-page.description'),
            href: '/resource-link',
            image: noThumbnail.src,
        },
    ];

    return (
        <>
            <div>
                <h1 className="text-4xl font-semibold">{t('home-page.title')}</h1>
                <BreadcrumbNav className="mt-2" />
            </div>

            <section className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-3 sm:grid-cols-2">
                {navigationItems.map(({ title, description, href, image }) => (
                    <Link key={title} href={href}>
                        <Card className="transition-all duration-300 hover:bg-secondary">
                            <CardHeader>
                                <CardTitle>{title}</CardTitle>
                                <CardDescription>{description}</CardDescription>
                            </CardHeader>
                            {image && (
                                <CardContent>
                                    <div className="relative h-52">
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
            </section>
        </>
    );
}
