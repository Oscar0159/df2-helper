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
                className="aspect-square w-10 rounded-full p-2 font-semibold xl:w-full xl:justify-start xl:px-4"
            >
                <SelectTrigger>
                    <GlobeIcon size={22} />
                    <p className="ml-3 hidden xl:flex">
                        <SelectValue placeholder="Select a Language" />
                    </p>
                </SelectTrigger>
            </Button>
            <SelectContent>
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
