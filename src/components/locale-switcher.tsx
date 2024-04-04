import { useLocale } from 'next-intl';
import { GlobeIcon } from 'lucide-react';

import { locales } from '@/config';
import { Button } from '@/components/ui/button';
import { SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import LocaleSwitcherSelect from './locale-switcher-select';

const localeMap = {
    en: 'English',
    'zh-TW': '繁體中文',
};

export default function LocaleSwitcher() {
    const locale = useLocale();

    return (
        <LocaleSwitcherSelect>
            <Button
                asChild
                variant="ghost"
                className="aspect-square w-10 rounded-full p-2 xl:w-full xl:justify-start xl:px-4"
            >
                <SelectTrigger className='border-none ring-0 focus:ring-0 focus:border-none ring-background border-background'>
                    <GlobeIcon size={22} />
                    <p className="ml-3 hidden xl:flex font-semibold">
                        <SelectValue placeholder="Select a Language" />
                    </p>
                </SelectTrigger>
            </Button>
            <SelectContent className="sm:mb:0 mb-5 -translate-x-1/3 sm:translate-x-0">
                <SelectGroup>
                    {locales.map((locale) => (
                        <SelectItem key={locale} value={locale}>
                            {localeMap[locale]}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </LocaleSwitcherSelect>
    );
}
