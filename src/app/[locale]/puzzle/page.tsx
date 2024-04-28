import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import BreadcrumbNav from '@/components/breadcrumb-nav';

import alphabetPageThumbnail from '@/../public/images/thumbnail/alphabet-page-thumbnail.png';
import binaryPageThumbnail from '@/../public/images/thumbnail/binary-page-thumbnail.png';
import letterPageThumbnail from '@/../public/images/thumbnail/letter-page-thumbnail.png';
import lightOutPageThumbnail from '@/../public/images/thumbnail/light-out-page-thumbnail.png';
import morsePageThumbnail from '@/../public/images/thumbnail/morse-page-thumbnail.png';
import slidingPageThumbnail from '@/../public/images/thumbnail/sliding-page-thumbnail.png';

type Props = {
    params: { locale: string };
};

type PuzzleItem = {
    title: string;
    description: string;
    href: string;
    image?: string;
};

export default function Puzzle({ params: { locale } }: Props) {
    // Enable static rendering
    unstable_setRequestLocale(locale);

    const t = useTranslations();

    const puzzleItems: PuzzleItem[] = [
        {
            title: t('binary-page.title'),
            description: t('binary-page.description'),
            href: '/puzzle/binary',
            image: binaryPageThumbnail.src,
        },
        {
            title: t('alphabet-page.title'),
            description: t('alphabet-page.description'),
            href: '/puzzle/alphabet',
            image: alphabetPageThumbnail.src,
        },
        {
            title: t('letter-page.title'),
            description: t('letter-page.description'),
            href: '/puzzle/letter',
            image: letterPageThumbnail.src,
        },
        {
            title: t('morse-page.title'),
            description: t('morse-page.description'),
            href: '/puzzle/morse',
            image: morsePageThumbnail.src,
        },
        {
            title: t('light-out-page.title'),
            description: t('light-out-page.description'),
            href: '/puzzle/light-out',
            image: lightOutPageThumbnail.src,
        },
        {
            title: t('sliding-page.title'),
            description: t('sliding-page.description'),
            href: '/puzzle/sliding',
            image: slidingPageThumbnail.src,
        },
    ];

    return (
        <>
            <div>
                <h1 className="text-4xl font-semibold">{t('puzzle-page.title')}</h1>
                <BreadcrumbNav className="mt-2" />
            </div>
            <div className="mt-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {puzzleItems.map(({ title, description, href, image }) => (
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
