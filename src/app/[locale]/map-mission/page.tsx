import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import BreadcrumbNav from '@/components/breadcrumb-nav';

import df2profilerPageThumbnail from '@/../public/images/thumbnail/df2profiler-page-thumbnail.png';
import noThumbnail from '@/../public/images/thumbnail/no-thumbnail.png';

type Props = {
    params: { locale: string };
};

type MapMissionItem = {
    title: string;
    description: string;
    href: string;
    image?: string;
};

export default function MapMission({ params: { locale } }: Props) {
    // Enable static rendering
    unstable_setRequestLocale(locale);

    const t = useTranslations();

    const mapMissionItems: MapMissionItem[] = [
        {
            title: t('df2profiler-page.title'),
            description: t('df2profiler-page.description'),
            href: '/map-mission/df2-profiler',
            image: df2profilerPageThumbnail.src,
        },
        {
            title: t('side-missions-page.title'),
            description: t('side-missions-page.description'),
            href: '/map-mission/side-missions',
            image: noThumbnail.src,
        },
    ];

    return (
        <>
            <div>
                <h1 className="text-4xl font-semibold">{t('map-mission-page.title')}</h1>
                <BreadcrumbNav className="mt-2" />
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {mapMissionItems.map(({ title, description, href, image }) => (
                    <Link key={href} href={href}>
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
            </div>
        </>
    );
}
