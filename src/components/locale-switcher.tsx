// TODO: make the code more clean and readable
import { locales } from '@/config';
import { GlobeIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { cn } from '@/lib/utils';

import LocaleSwitcherSelect from './locale-switcher-select';

const localeMap = {
    en: 'English',
    'zh-TW': '繁體中文',
};

export default function LocaleSwitcher() {
    return (
        <LocaleSwitcherSelect>
            <Button
                asChild
                variant="ghost"
                className="aspect-square w-10 rounded-full p-2 xl:w-full xl:justify-start xl:px-4"
            >
                <SelectTrigger className="border-none border-background ring-0 ring-background focus:border-none focus:ring-0">
                    <GlobeIcon size={22} />
                    <p className="ml-3 hidden font-semibold xl:flex">
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
