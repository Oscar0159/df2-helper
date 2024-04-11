import { locales } from '@/config';
import { GlobeIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import LocaleSwitcherSelect from './locale-switcher-select';

const localeMap = {
    en: 'English',
    'zh-TW': '繁體中文',
};

export default function LocaleSwitcher() {
    return (
        <LocaleSwitcherSelect>
            <SelectTrigger className="bg-background/0 border-none" asChild>
                <Button variant="ghost" className="w-10 rounded-full p-2 xl:w-full xl:justify-start xl:px-4">
                    <GlobeIcon size={22} />
                    <p className="ml-3 hidden font-semibold xl:flex">
                        <SelectValue placeholder="Select a Language" />
                    </p>
                </Button>
            </SelectTrigger>
            <SelectContent align="center">
                <SelectGroup>
                    {locales.map((locale) => (
                        <SelectItem key={locale} value={locale} className="select-item">
                            {localeMap[locale]}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </LocaleSwitcherSelect>
    );
}
