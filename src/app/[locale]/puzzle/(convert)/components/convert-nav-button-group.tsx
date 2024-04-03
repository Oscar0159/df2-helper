'use client';

import { cn } from '@/lib/utils';
import { Link, usePathname } from '@/navigation';
import { Button } from '@/components/ui/button';

const ConvertNavButtonGroup = ({ className }: Readonly<{ className?: string }>) => {
    const pathname = usePathname();

    return (
        <div className={cn('flex justify-center gap-5', className)}>
            <Button variant={pathname.includes('/puzzle/letters') ? 'default' : 'ghost'} asChild>
                <Link href="/puzzle/letters">Letters</Link>
            </Button>
            <Button variant={pathname.includes('/puzzle/digital') ? 'default' : 'ghost'} asChild>
                <Link href="/puzzle/digital">Digital</Link>
            </Button>
            <Button variant={pathname.includes('/puzzle/morse') ? 'default' : 'ghost'} asChild>
                <Link href="/puzzle/morse">Morse</Link>
            </Button>
        </div>
    );
};

export { ConvertNavButtonGroup };
