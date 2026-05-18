import type { MetadataRoute } from 'next';

import { routing } from '@/i18n/routing';
import { metadataBase } from '@/lib/seo';
import { toolRoutes } from '@/lib/tool-meta';

const staticRoutes = ['/', ...toolRoutes.map((tool) => tool.href)];

function toLocalizedPath(locale: (typeof routing.locales)[number], pathname: string) {
  if (pathname === '/') {
    return `/${locale}`;
  }

  return `/${locale}${pathname}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return staticRoutes.flatMap((pathname) => {
    const languages = Object.fromEntries(
      routing.locales.map((locale) => [
        locale,
        new URL(toLocalizedPath(locale, pathname), metadataBase).toString(),
      ]),
    );

    return routing.locales.map((locale) => ({
      url: new URL(toLocalizedPath(locale, pathname), metadataBase).toString(),
      priority: pathname === '/' ? 1 : 0.8,
      alternates: {
        languages,
      },
    }));
  });
}
