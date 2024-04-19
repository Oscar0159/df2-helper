import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import BreadcrumbNav from '@/components/breadcrumb-nav';

import noThumbnail from '@/../public/images/thumbnail/no-thumbnail.png';

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
            title: t('InformationPage.title'),
            description: t('InformationPage.description'),
            href: '/information',
            image: noThumbnail.src,
        },
        {
            title: t('MapMissionPage.title'),
            description: t('MapMissionPage.description'),
            href: '/map-mission',
            image: noThumbnail.src,
        },
        {
            title: t('PuzzlePage.title'),
            description: t('PuzzlePage.description'),
            href: '/puzzle',
            image: noThumbnail.src,
        },
        {
            title: t('BlueprintPage.title'),
            description: t('BlueprintPage.description'),
            href: '/blueprint',
            image: noThumbnail.src,
        },
        {
            title: t('CalculatorPage.title'),
            description: t('CalculatorPage.description'),
            href: '/calculator',
            image: noThumbnail.src,
        },
        {
            title: t('ToolPage.title'),
            description: t('ToolPage.description'),
            href: '/tool',
            image: noThumbnail.src,
        },
        {
            title: t('ResourceLinkPage.title'),
            description: t('ResourceLinkPage.description'),
            href: '/resource-link',
            image: noThumbnail.src,
        },
    ];

    return (
        <>
            <div>
                <h1 className="text-4xl font-semibold">{t('HomePage.title')}</h1>
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
                            <CardContent>
                                {image && (
                                    <div className="relative h-52">
                                        <Image src={image} alt={title} fill className="rounded-md object-cover" />
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </section>
        </>
    );
}
