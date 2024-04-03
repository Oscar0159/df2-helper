'use client';

import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function ModeToggle({ className }: { className?: string }) {
    const { theme, setTheme } = useTheme();

    return (
        <Button
            variant="ghost"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className={cn('', className)}
        >
            {theme === 'light' ? <SunIcon size={20} /> : <MoonIcon size={20} />}
        </Button>
    );
}
