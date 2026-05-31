'use client';

import { ExternalLink, Search } from 'lucide-react';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Kbd, KbdGroup } from '@/components/ui/kbd';
import { useRouter } from '@/i18n/navigation';
import type { ExternalResourceMeta } from '@/lib/external-resource-meta';
import type { ToolMeta } from '@/lib/tool-meta';

type HeaderSearchProps = {
  searchLabel: string;
  searchSuffix: string;
  dialogTitle: string;
  dialogDescription: string;
  searchPlaceholder: string;
  emptyLabel: string;
  toolGroupHeading: string;
  officialGroupHeading: string;
  unofficialGroupHeading: string;
  tools: ToolMeta[];
  officialResources: ExternalResourceMeta[];
  unofficialResources: ExternalResourceMeta[];
};

export function HeaderSearch({
  searchLabel,
  searchSuffix,
  dialogTitle,
  dialogDescription,
  searchPlaceholder,
  emptyLabel,
  toolGroupHeading,
  officialGroupHeading,
  unofficialGroupHeading,
  tools,
  officialResources,
  unofficialResources,
}: HeaderSearchProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();

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
      <Button
        onClick={() => setIsSearchOpen(true)}
        variant="outline"
        className="text-muted-foreground col-span-3 row-start-2 justify-between sm:col-span-1 sm:row-start-auto"
      >
        <span className="inline-flex min-w-0 items-center gap-2">
          <Search className="size-4 shrink-0" />
          <span className="truncate">{searchLabel}</span>
          <span className="hidden truncate sm:inline">{searchSuffix}</span>
        </span>
        <KbdGroup className="hidden sm:inline-flex">
          <Kbd>Ctrl</Kbd>
          <span>+</span>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Button>

      <CommandDialog
        open={isSearchOpen}
        onOpenChange={setIsSearchOpen}
        title={dialogTitle}
        description={dialogDescription}
      >
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyLabel}</CommandEmpty>
            <CommandGroup heading={toolGroupHeading}>
              {tools.map((tool) => {
                return (
                  <CommandItem
                    key={tool.id}
                    onSelect={() => {
                      setIsSearchOpen(false);
                      router.push(tool.href);
                    }}
                  >
                    <span>{tool.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading={officialGroupHeading}>
              {officialResources.map((resource) => {
                return (
                  <CommandItem
                    key={resource.id}
                    onSelect={() => {
                      setIsSearchOpen(false);
                      window.open(resource.href, '_blank', 'noopener,noreferrer');
                    }}
                  >
                    <span>{resource.label}</span>
                    <ExternalLink className="size-3.5" />
                  </CommandItem>
                );
              })}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading={unofficialGroupHeading}>
              {unofficialResources.map((resource) => {
                return (
                  <CommandItem
                    key={resource.id}
                    onSelect={() => {
                      setIsSearchOpen(false);
                      window.open(resource.href, '_blank', 'noreferrer');
                    }}
                  >
                    <span>{resource.label}</span>
                    <ExternalLink className="size-3.5" />
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
