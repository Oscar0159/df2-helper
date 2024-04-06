import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import BreadcrumbNav from '@/components/breadcrumb-nav';

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
        },
        {
            title: t('LettersPage.title'),
            description: t('LettersPage.description'),
            href: '/puzzle/letters',
        },
        {
            title: t('MorsePage.title'),
            description: t('MorsePage.description'),
            href: '/puzzle/morse',
        },
        {
            title: t('LightOutPage.title'),
            description: t('LightOutPage.description'),
            href: '/puzzle/light-out',
        },
        {
            title: t('SlidingPage.title'),
            description: t('SlidingPage.description'),
            href: '/puzzle/sliding',
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
                    {puzzleItems.map((puzzle) => (
                        <Link key={puzzle.title} href={puzzle.href}>
                            <Card className="transition-all duration-300 hover:bg-secondary">
                                <CardHeader>
                                    <CardTitle>{puzzle.title}</CardTitle>
                                    <CardDescription>{puzzle.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {puzzle.image && <Image src={puzzle.image} alt={puzzle.title} />}
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}
