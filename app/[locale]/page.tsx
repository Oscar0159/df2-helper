import {
  ArrowRight,
  BookOpen,
  ExternalLink,
  MapIcon,
  MessageSquare,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { notFound } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { getExternalResourceMeta } from '@/lib/external-resource-meta';
import { createPageMetadata, defaultSiteDescription, isAppLocale } from '@/lib/seo';
import { getToolMeta } from '@/lib/tool-meta';
import type { ToolMeta } from '@/lib/tool-meta';
import { Card, CardAction, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const resourceIcons = {
  support: ShieldCheck,
  discord: MessageSquare,
  missions: Sparkles,
  map: MapIcon,
  wiki: BookOpen,
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isAppLocale(locale)) {
    notFound();
  }

  const metadata = createPageMetadata({
    locale,
    pathname: '/',
    title: 'DF2 Helper',
    description: defaultSiteDescription[locale],
    keywords:
      locale === 'zh-TW'
        ? ['DF2 Helper', 'Dead Frontier 2', '解謎工具', '二進制', '摩斯密碼', '滑塊拼圖']
        : [
            'DF2 Helper',
            'Dead Frontier 2',
            'puzzle tools',
            'binary converter',
            'Morse converter',
            'sliding puzzle',
          ],
  });

  return {
    ...metadata,
    title: {
      absolute: 'DF2 Helper',
    },
    openGraph: metadata.openGraph
      ? {
          ...metadata.openGraph,
          title: 'DF2 Helper',
        }
      : undefined,
    twitter: metadata.twitter
      ? {
          ...metadata.twitter,
          title: 'DF2 Helper',
        }
      : undefined,
  };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
  const toolMeta = await getTranslations({ locale, namespace: 'tools.meta' });
  const resourceItems = await getTranslations({
    locale,
    namespace: 'home.resources.items',
  });
  const resources = await getTranslations({
    locale,
    namespace: 'home.resources',
  });
  const tools = getToolMeta(toolMeta);
  const externalResources = getExternalResourceMeta(resourceItems);
  const officialResources = externalResources.filter(
    (resource) => resource.category === 'official',
  );
  const unofficialResources = externalResources.filter(
    (resource) => resource.category === 'unofficial',
  );

  return (
    <main className="space-y-8">
      {/* HERO */}
      <Card className="bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.8),transparent_35%),linear-gradient(135deg,rgba(248,250,252,0.95),rgba(226,232,240,0.9))] p-0 shadow-sm dark:bg-[radial-gradient(circle_at_top_left,rgba(148,163,184,0.18),transparent_35%),linear-gradient(135deg,rgba(15,23,42,0.96),rgba(30,41,59,0.92))]">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-4 lg:w-1/2">
              <h1 className="scroll-m-20 text-4xl font-bold tracking-tight text-balance">
                {t('title')}
              </h1>
              <p className="text-muted-foreground text-base">{t('description')}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href={tools[0]?.href ?? '/'}>
                  {t('cta')}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* TOOLS */}
      <section className="grid gap-4 md:auto-rows-fr md:grid-cols-2 xl:grid-cols-3">
        {tools.map((tool: ToolMeta) => (
          <Link key={tool.id} href={tool.href}>
            <Card className="h-full">
              <CardHeader className="flex items-center justify-between">
                <Badge variant="secondary">{tool.badge}</Badge>
                <CardAction>
                  <ArrowRight className="text-muted-foreground size-4" />
                </CardAction>
              </CardHeader>
              <CardContent>
                <div className="flex-1 space-y-2">
                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{tool.label}</h4>
                  <p className="text-muted-foreground text-sm">{tool.description}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>

      {/* RESOURCES */}
      <section className="space-y-4">
        <div className="ml-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <Badge
              variant="outline"
              className="text-muted-foreground inline-flex items-center gap-2 tracking-[0.24em] uppercase"
            >
              <ExternalLink className="size-3.5" />
              {resources('eyebrow')}
            </Badge>
            <div className="space-y-2">
              <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                {resources('title')}
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm">{resources('description')}</p>
            </div>
          </div>
        </div>

        <div className="grid auto-rows-fr gap-4 md:grid-cols-2">
          {officialResources.map((resource) => {
            const Icon = resourceIcons[resource.id as keyof typeof resourceIcons];

            return (
              <a key={resource.id} href={resource.href} target="_blank" rel="noopener noreferrer">
                <Card className="h-full">
                  <CardHeader className="flex items-center justify-between">
                    <Badge variant="secondary">
                      <Icon className="size-3.5" />
                      {resource.badge}
                    </Badge>
                    <CardAction>
                      <ExternalLink className="text-muted-foreground size-4" />
                    </CardAction>
                  </CardHeader>
                  <CardContent>
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                      {resource.label}
                    </h4>
                    <p className="text-muted-foreground text-sm">{resource.description}</p>
                  </CardContent>
                </Card>
              </a>
            );
          })}
        </div>

        <div className="grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-3">
          {unofficialResources.map((resource) => {
            const Icon = resourceIcons[resource.id as keyof typeof resourceIcons];

            return (
              <a key={resource.id} href={resource.href} target="_blank" rel="noopener noreferrer">
                <Card className="h-full">
                  <CardHeader className="flex items-center justify-between">
                    <Badge variant="secondary">
                      <Icon className="size-3.5" />
                      {resource.badge}
                    </Badge>
                    <CardAction>
                      <ExternalLink className="text-muted-foreground size-4" />
                    </CardAction>
                  </CardHeader>
                  <CardContent>
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                      {resource.label}
                    </h4>
                    <p className="text-muted-foreground text-sm">{resource.description}</p>
                  </CardContent>
                </Card>
              </a>
            );
          })}
        </div>
      </section>
    </main>
  );
}
