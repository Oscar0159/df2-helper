import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import BreadcrumbNav from '@/components/breadcrumb-nav';

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
        },
        {
            title: t('MapMissionPage.title'),
            description: t('MapMissionPage.description'),
            href: '/map-mission',
        },
        {
            title: t('PuzzlePage.title'),
            description: t('PuzzlePage.description'),
            href: '/puzzle',
        },
        {
            title: t('BlueprintPage.title'),
            description: t('BlueprintPage.description'),
            href: '/blueprint',
        },
        {
            title: t('ToolPage.title'),
            description: t('ToolPage.description'),
            href: '/tool',
        },
        {
            title: t('ResourceLinkPage.title'),
            description: t('ResourceLinkPage.description'),
            href: '/resource-link',
        },
    ];

    return (
        <>
            <h1 className="text-2xl font-bold">{t('HomePage.title')}</h1>
            <BreadcrumbNav className="mt-2" />
            <p className="mt-2">{t('HomePage.description')}</p>

            <section className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {navigationItems.map(({ title, description, href, image }) => (
                    <Link key={title} href={href}>
                        <Card className="transition-all duration-300 hover:bg-secondary">
                            <CardHeader>
                                <CardTitle>{title}</CardTitle>
                                <CardDescription>{description}</CardDescription>
                            </CardHeader>
                            <CardContent>{image && <Image src={image} alt={title} />}</CardContent>
                        </Card>
                    </Link>
                ))}
            </section>
        </>
    );
}
