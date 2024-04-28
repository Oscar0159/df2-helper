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

type InformationItem = {
    title: string;
    description: string;
    href: string;
    image?: string;
};

export default function Information({ params: { locale } }: Props) {
    // Enable static rendering
    unstable_setRequestLocale(locale);

    const t = useTranslations();

    const InformationItems: InformationItem[] = [
        {
            title: t('basic-page.title'),
            description: t('basic-page.description'),
            href: '/information/basic',
        },
        {
            title: t('scrap-cash-page.title'),
            description: t('scrap-cash-page.description'),
            href: '/information/scrap-cash',
        },
        {
            title: t('exp-page.title'),
            description: t('exp-page.description'),
            href: '/information/exp',
        },
        {
            title: t('history-event-item-page.title'),
            description: t('history-event-item-page.description'),
            href: '/information/history-event-item',
        },
    ];

    return (
        <>
            <div>
                <h1 className="text-4xl font-semibold">{t('information-page.title')}</h1>
                <BreadcrumbNav className="mt-2" />
            </div>
            <div className="mt-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {InformationItems.map(({ title, description, href, image }) => (
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
                </div>
            </div>
        </>
    );
}
