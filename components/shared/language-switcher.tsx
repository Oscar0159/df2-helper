'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useLocale, useTranslations } from 'next-intl';
import { Locale } from 'next-intl';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import { useState } from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemText,
  SelectLabel,
  SelectPortal,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

const languageMap: Record<Locale, string> = {
  'en-US': 'English',
  'zh-TW': '繁體中文',
};

export default function LanguageSwitcher() {
  const t = useTranslations('language-switcher');
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const onSelectChange = (value: string) => {
    const selectedLocale = routing.locales.find((l) => l === value) as Locale;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: selectedLocale },
      );
    });
  };

  return (
    <Select
      onValueChange={onSelectChange}
      defaultValue={locale}
      disabled={isPending}
    >
      <SelectTrigger className="w-[120px]">
        <SelectValue />
      </SelectTrigger>
      <SelectPortal>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{t('language')}</SelectLabel>
            {routing.locales.map((l, idx) => (
              <SelectItem
                key={l}
                value={l}
                disabled={isPending}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <AnimatePresence>
                  {hoveredIndex === idx && (
                    <motion.span
                      key={idx}
                      layoutId="select-item-hover-background"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: { duration: 0.15 },
                      }}
                      exit={{
                        opacity: 0,
                        transition: { duration: 0.15, delay: 0.2 },
                      }}
                      className="absolute inset-0 -z-1 rounded-sm bg-accent"
                    ></motion.span>
                  )}
                </AnimatePresence>
                <SelectItemText>{languageMap[l] ?? l}</SelectItemText>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </SelectPortal>
    </Select>
  );
}
