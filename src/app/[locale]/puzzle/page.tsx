import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Link } from '@/navigation';
import BreadcrumbNav from '@/components/breadcrumb-nav';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

type PuzzleItem = {
    title: string;
    description: string;
    href: string;
    image?: string;
};

export default function Puzzle() {
    const t = useTranslations('PuzzlePage');

    const puzzleItems: PuzzleItem[] = [
        {
            title: t('binary.title'),
            description: t('binary.description'),
            href: '/puzzle/binary',
        },
        {
            title: t('letters.title'),
            description: t('letters.description'),
            href: '/puzzle/letters',
        },
        {
            title: t('morse.title'),
            description: t('morse.description'),
            href: '/puzzle/morse',
        },
        {
            title: t('light-out.title'),
            description: t('light-out.description'),
            href: '/puzzle/light-out',
        },
        {
            title: t('sliding.title'),
            description: t('sliding.description'),
            href: '/puzzle/sliding',
        },
    ];

    return (
        <main className="w-full p-5 pb-24 sm:pb-5 sm:pt-8">
            <div>
                <h1 className="text-4xl font-semibold">{t('title')}</h1>
                <BreadcrumbNav className="mt-2" />
            </div>
            <div className="mt-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {puzzleItems.map((puzzle) => (
                        <Link key={puzzle.title} href={puzzle.href}>
                            <Card>
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
        </main>
    );
}
