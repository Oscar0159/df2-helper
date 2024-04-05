import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image';

import { Link } from '@/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import BreadcrumbNav from '@/components/breadcrumb-nav';

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
            title: t('DF2ProfilerPage.title'),
            description: t('DF2ProfilerPage.description'),
            href: '/map-mission/df2-profiler',
        },
        {
            title: t('SideMissionsPage.title'),
            description: t('SideMissionsPage.description'),
            href: '/map-mission/side-missions',
        }
    ];

    return (
        <>
            <div>
                <h1 className="text-4xl font-semibold">{t('MapMissionPage.title')}</h1>
                <BreadcrumbNav className='mt-2' />
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {mapMissionItems.map(({ title, description, href, image }) => (
                    <Link key={href} href={href}>
                        <Card className="transition-all duration-300 hover:bg-secondary">
                            <CardHeader>
                                <CardTitle>{title}</CardTitle>
                                <CardDescription>{description}</CardDescription>
                            </CardHeader>
                            <CardContent>{image && <Image src={image} alt={title} />}</CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </>
    );
}
