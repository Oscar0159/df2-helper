import { useLocale } from 'next-intl';
import { locales } from '../config';
import LocaleSwitcherSelect from './locale-switcher-select';

const localeMap = {
    en: 'English',
    'zh-TW': '繁體中文',
};

export default function LocaleSwitcher() {
    const locale = useLocale();

    return (
        <LocaleSwitcherSelect defaultValue={locale} label="label">
            {locales.map((locale) => (
                <option key={locale} value={locale}>
                    {localeMap[locale]}
                </option>
            ))}
        </LocaleSwitcherSelect>
    );
}
