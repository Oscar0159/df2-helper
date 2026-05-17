"use client";

import { Globe } from "lucide-react";
import { useParams } from "next/navigation";
import type { Locale } from "next-intl";
import { useLocale } from "next-intl";
import { useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const languageMap: Record<Locale, string> = {
  "en-US": "English",
  "zh-TW": "繁體中文",
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

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
      <SelectTrigger className="w-30">
        <Globe />
        <SelectValue />
      </SelectTrigger>
      <SelectContent position="popper" side="bottom" align="end">
        <SelectGroup>
          {routing.locales.map((locale) => (
            <SelectItem key={locale} value={locale} disabled={isPending}>
              {languageMap[locale] ?? locale}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
