import { locales } from '@/config';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import BreadcrumbNav from '@/components/breadcrumb-nav';

import noThumbnail from '../../../../public/images/thumbnail/no-thumbnail.png';

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
    const t = await getTranslations({ locale, namespace: 'ResourceLinkPage' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default function ResourceLink({ params: { locale } }: Props) {
    // Enable static rendering
    unstable_setRequestLocale(locale);

    const t = useTranslations('ResourceLinkPage');

    const resourceLinkItems: ResourceLinkItem[] = [
        {
            title: 'DF2Profiler',
            description: t('df2profiler.description'),
            locales: ['en'],
            href: 'https://df2profiler.com/',
            image: noThumbnail.src,
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
                            <CardContent>
                                {image && (
                                    <div className="relative h-52">
                                        <Image src={image} alt={title} fill className="rounded-md object-cover" />
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </a>
                ))}
            </div>
        </>
    );
}
