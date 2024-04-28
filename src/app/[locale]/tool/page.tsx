import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import BreadcrumbNav from '@/components/breadcrumb-nav';

import crosshairPageThumbnail from '@/../public/images/thumbnail/crosshair-page-thumbnail.png';

type Props = {
    params: { locale: string };
};

type ToolItem = {
    title: string;
    description: string;
    href: string;
    image?: string;
};

export default function Tool({ params: { locale } }: Props) {
    // Enable static rendering
    unstable_setRequestLocale(locale);

    const t = useTranslations('tool-page');

    const toolItems: ToolItem[] = [
        {
            title: t('crosshair.title'),
            description: t('crosshair.description'),
            href: 'https://apps.microsoft.com/detail/9n1k9q56hvxr',
            image: crosshairPageThumbnail.src,
        },
        {
            title: t('borderless-gaming.title'),
            description: t('borderless-gaming.description'),
            href: 'https://github.com/Codeusa/Borderless-Gaming',
            image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/388080/header.jpg',
        },
    ];

    return (
        <>
            <div>
                <h1 className="text-4xl font-semibold">{t('title')}</h1>
                <BreadcrumbNav className="mt-2" />
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {toolItems.map(({ title, description, href, image }) => (
                    <a key={title} href={href} target="_blank" rel="noopener noreferrer">
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
                    </a>
                ))}
            </div>
        </>
    );
}
