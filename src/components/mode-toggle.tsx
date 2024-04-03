'use client';

import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Props = {
    className?: string;
};

export default function ModeToggle({ className }: Props) {
    const { theme, setTheme } = useTheme();

    const t = useTranslations('ModeToggle');

    return (
        <Button
            variant="ghost"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className={cn('', className)}
        >
            {theme === 'light' ? <SunIcon size={22} /> : <MoonIcon size={22} />}
            <p className="ml-3 hidden xl:flex">{theme === 'light' ? t('light') : t('dark')}</p>
        </Button>
    );
}
