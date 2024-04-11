'use client';

import { MoonIcon, SunIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export default function ModeToggle() {
    const { theme, setTheme } = useTheme();

    const t = useTranslations('ModeToggle');

    return (
        <Button
            variant="ghost"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="xl:w-full xl:justify-start xl:px-4 aspect-square w-10 rounded-full p-2 font-semibold"
        >
            <SunIcon size={22} className="dark:hidden" />
            <MoonIcon size={22} className="hidden dark:block" />
            <p className="ml-3 hidden xl:flex">{theme === 'light' ? t('light') : t('dark')}</p>
        </Button>
    );
}
