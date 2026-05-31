import { useTranslations } from 'next-intl';

import { AppLogoMark, AppLogoWordmark } from '@/components/shared/app-logo';
import LanguageSwitcher from '@/components/shared/language-switcher';
import ThemeToggle from '@/components/shared/theme-toggle';
import { Badge } from '@/components/ui/badge';
import { Link } from '@/i18n/navigation';
import { getExternalResourceMeta } from '@/lib/external-resource-meta';
import { getToolMeta } from '@/lib/tool-meta';

import { HeaderSearch } from './header-search';

export function Header() {
  const t = useTranslations('header');
  const toolMeta = useTranslations('tools.meta');
  const resourceMeta = useTranslations('home.resources.items');
  const tools = getToolMeta(toolMeta);
  const resources = getExternalResourceMeta(resourceMeta);
  const officialResources = resources.filter((resource) => resource.category === 'official');
  const unofficialResources = resources.filter((resource) => resource.category === 'unofficial');
  const isPreview = process.env.NODE_ENV !== 'production' || process.env.VERCEL_ENV === 'preview';

  return (
    <header className="bg-background sticky top-0 z-30 py-3">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-3 px-4 py-2 sm:grid-cols-[auto_minmax(0,1fr)_auto_auto] sm:gap-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-foreground hover:text-foreground/80 inline-flex shrink-0 items-center gap-2.5 transition-colors"
        >
          <AppLogoMark variant="header" />
          <AppLogoWordmark variant="header" />
          {isPreview && (
            <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
              {t('previewLabel')}
            </Badge>
          )}
        </Link>

        <HeaderSearch
          searchLabel={t('searchLabel')}
          searchSuffix={t('searchSuffix')}
          dialogTitle={t('dialogTitle')}
          dialogDescription={t('dialogDescription')}
          searchPlaceholder={t('searchPlaceholder')}
          emptyLabel={t('empty')}
          toolGroupHeading={t('toolGroupHeading')}
          officialGroupHeading={t('officialGroupHeading')}
          unofficialGroupHeading={t('unofficialGroupHeading')}
          tools={tools}
          officialResources={officialResources}
          unofficialResources={unofficialResources}
        />

        <LanguageSwitcher />

        <ThemeToggle />
      </div>
    </header>
  );
}
