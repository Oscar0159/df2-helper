'use client';

import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useEffect, useMemo, useState } from 'react';

import ThemeToggle from '@/components/shared/theme-toggle';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Kbd, KbdGroup } from '@/components/ui/kbd';
import { Link, useRouter } from '@/i18n/navigation';
import { getExternalResourceMeta } from '@/lib/external-resource-meta';
import { getToolMeta } from '@/lib/tool-meta';

import { AppLogoMark, AppLogoWordmark } from '../shared/app-logo';
import LanguageSwitcher from '../shared/language-switcher';
import { Button } from '../ui/button';

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const t = useTranslations('header');
  const toolMeta = useTranslations('tools.meta');
  const resourceMeta = useTranslations('home.resources.items');
  const router = useRouter();
  const tools = useMemo(() => getToolMeta(toolMeta), [toolMeta]);
  const resources = useMemo(() => getExternalResourceMeta(resourceMeta), [resourceMeta]);
  const officialResources = useMemo(
    () => resources.filter((resource) => resource.category === 'official'),
    [resources],
  );
  const unofficialResources = useMemo(
    () => resources.filter((resource) => resource.category === 'unofficial'),
    [resources],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isSearchShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k';

      if (!isSearchShortcut) {
        return;
      }

      event.preventDefault();
      setIsSearchOpen((open) => !open);
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <>
      <header className="bg-background sticky top-0 z-30 py-3">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-3 px-4 py-2 sm:grid-cols-[auto_minmax(0,1fr)_auto_auto] sm:gap-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-foreground hover:text-foreground/80 inline-flex shrink-0 items-center gap-2.5 transition-colors"
          >
            <AppLogoMark variant="header" />
            <AppLogoWordmark variant="header" />
          </Link>

          <Button
            onClick={() => setIsSearchOpen(true)}
            variant="outline"
            className="text-muted-foreground col-span-3 row-start-2 justify-between sm:col-span-1 sm:row-start-auto"
          >
            <span className="inline-flex min-w-0 items-center gap-2">
              <Search className="size-4 shrink-0" />
              <span className="truncate">{t('searchLabel')}</span>
              <span className="hidden truncate sm:inline">{t('searchSuffix')}</span>
            </span>
            <KbdGroup className="hidden sm:inline-flex">
              <Kbd>Ctrl</Kbd>
              <span>+</span>
              <Kbd>K</Kbd>
            </KbdGroup>
          </Button>

          <LanguageSwitcher />

          <ThemeToggle />
        </div>
      </header>

      <CommandDialog
        open={isSearchOpen}
        onOpenChange={setIsSearchOpen}
        title={t('dialogTitle')}
        description={t('dialogDescription')}
      >
        <Command>
          <CommandInput placeholder={t('searchPlaceholder')} />
          <CommandList>
            <CommandEmpty>{t('empty')}</CommandEmpty>
            <CommandGroup heading={t('groupHeading')}>
              {tools.map((tool) => {
                return (
                  <CommandItem
                    key={tool.id}
                    onSelect={() => {
                      setIsSearchOpen(false);
                      router.push(tool.href);
                    }}
                  >
                    <div className="flex flex-col gap-0.5">
                      <span>{tool.label}</span>
                      <span className="text-muted-foreground text-xs leading-5">
                        {tool.description}
                      </span>
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            <CommandGroup heading={t('officialGroupHeading')}>
              {officialResources.map((resource) => {
                return (
                  <CommandItem
                    key={resource.id}
                    onSelect={() => {
                      setIsSearchOpen(false);
                      window.open(resource.href, '_blank', 'noreferrer');
                    }}
                  >
                    <div className="flex flex-col gap-0.5">
                      <span>{resource.label}</span>
                      <span className="text-muted-foreground text-xs leading-5">
                        {resource.description}
                      </span>
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            <CommandGroup heading={t('unofficialGroupHeading')}>
              {unofficialResources.map((resource) => {
                return (
                  <CommandItem
                    key={resource.id}
                    onSelect={() => {
                      setIsSearchOpen(false);
                      window.open(resource.href, '_blank', 'noreferrer');
                    }}
                  >
                    <div className="flex flex-col gap-0.5">
                      <span>{resource.label}</span>
                      <span className="text-muted-foreground text-xs leading-5">
                        {resource.description}
                      </span>
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
