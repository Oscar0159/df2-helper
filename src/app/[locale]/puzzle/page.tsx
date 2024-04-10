import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import BreadcrumbNav from '@/components/breadcrumb-nav';

import alphabetPageThumbnail from '../../../../public/images/thumbnail/alphabet-page-thumbnail.png';
import binaryPageThumbnail from '../../../../public/images/thumbnail/binary-page-thumbnail.png';
import letterPageThumbnail from '../../../../public/images/thumbnail/letter-page-thumbnail.png';
import lightOutPageThumbnail from '../../../../public/images/thumbnail/light-out-page-thumbnail.png';
import morsePageThumbnail from '../../../../public/images/thumbnail/morse-page-thumbnail.png';
import slidingPageThumbnail from '../../../../public/images/thumbnail/sliding-page-thumbnail.png';

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
            title: t('BinaryPage.title'),
            description: t('BinaryPage.description'),
            href: '/puzzle/binary',
            image: binaryPageThumbnail.src,
        },
        {
            title: t('AlphabetPage.title'),
            description: t('AlphabetPage.description'),
            href: '/puzzle/alphabet',
            image: alphabetPageThumbnail.src,
        },
        {
            title: t('LetterPage.title'),
            description: t('LetterPage.description'),
            href: '/puzzle/letter',
            image: letterPageThumbnail.src,
        },
        {
            title: t('MorsePage.title'),
            description: t('MorsePage.description'),
            href: '/puzzle/morse',
            image: morsePageThumbnail.src,
        },
        {
            title: t('LightOutPage.title'),
            description: t('LightOutPage.description'),
            href: '/puzzle/light-out',
            image: lightOutPageThumbnail.src,
        },
        {
            title: t('SlidingPage.title'),
            description: t('SlidingPage.description'),
            href: '/puzzle/sliding',
            image: slidingPageThumbnail.src,
        },
    ];

    return (
        <>
            <div>
                <h1 className="text-4xl font-semibold">{t('PuzzlePage.title')}</h1>
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
                </div>
            </div>
        </>
    );
}
