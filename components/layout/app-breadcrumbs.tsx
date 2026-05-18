'use client';

import { useTranslations } from 'next-intl';

import { useMemo } from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Link, usePathname } from '@/i18n/navigation';
import { getToolMeta } from '@/lib/tool-meta';

function formatSegmentLabel(segment: string) {
  return segment
    .split('-')
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() + part.slice(1))
    .join(' ');
}

export function AppBreadcrumbs() {
  const pathname = usePathname();
  const t = useTranslations('breadcrumbs');
  const toolMeta = useTranslations('tools.meta');
  const tools = useMemo(() => getToolMeta(toolMeta), [toolMeta]);

  const currentTool = tools.find((tool) => tool.href === pathname);
  const lastSegment = pathname.split('/').filter(Boolean).at(-1);

  if (pathname === '/') {
    return null;
  }

  return (
    <Breadcrumb className="mx-auto w-full max-w-6xl px-4 pt-3 sm:px-6 sm:pt-4 lg:px-8">
      <BreadcrumbList className="text-xs sm:text-sm">
        <BreadcrumbItem className="hidden sm:inline-flex">
          <BreadcrumbLink asChild>
            <Link href="/">{t('home')}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden sm:block" />
        <BreadcrumbItem>
          <BreadcrumbPage className="max-w-[70vw] truncate sm:max-w-none">
            {currentTool?.label ?? formatSegmentLabel(lastSegment ?? '')}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
