'use client';

import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';
import { Link, usePathname } from '@/navigation';
import { Button } from '@/components/ui/button';

const ConvertNavButtonGroup = ({ className }: Readonly<{ className?: string }>) => {
    const pathname = usePathname();

    const t = useTranslations('PuzzlePage');

    return (
        <div className={cn('flex justify-center gap-5', className)}>
            <Button variant={pathname.includes('/puzzle/letters') ? 'default' : 'ghost'} asChild>
                <Link href="/puzzle/letters">{t("letters.title")}</Link>
            </Button>
            <Button variant={pathname.includes('/puzzle/binary') ? 'default' : 'ghost'} asChild>
                <Link href="/puzzle/binary">{t("binary.title")}</Link>
            </Button>
            <Button variant={pathname.includes('/puzzle/morse') ? 'default' : 'ghost'} asChild>
                <Link href="/puzzle/morse">{t("morse.title")}</Link>
            </Button>
        </div>
    );
};

export { ConvertNavButtonGroup };
