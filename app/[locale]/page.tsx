import {
  ArrowRight,
  BookOpen,
  ExternalLink,
  MapIcon,
  MessageSquare,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getExternalResourceMeta } from "@/lib/external-resource-meta";
import {
  createPageMetadata,
  defaultSiteDescription,
  isAppLocale,
} from "@/lib/seo";
import { getToolMeta, type ToolMeta } from "@/lib/tool-meta";

const resourceIcons = {
  support: ShieldCheck,
  discord: MessageSquare,
  missions: Sparkles,
  map: MapIcon,
  wiki: BookOpen,
} as const;

const flatCardClass =
  "group hover:-translate-y-0.5 flex h-full flex-col rounded-[24px] border border-border/60 bg-card/80 p-5 shadow-sm transition-all hover:border-foreground/20 hover:shadow-md";

const flatBadgeClass =
  "inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 font-medium text-muted-foreground text-xs uppercase tracking-wide";

const flatSectionClass =
  "rounded-[28px] border border-border/60 bg-card/40 p-5 shadow-sm sm:p-6";

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
    pathname: "/",
    title: "DF2 Helper",
    description: defaultSiteDescription[locale],
    keywords:
      locale === "zh-TW"
        ? [
            "DF2 Helper",
            "Dead Frontier 2",
            "解謎工具",
            "二進制",
            "摩斯密碼",
            "滑塊拼圖",
          ]
        : [
            "DF2 Helper",
            "Dead Frontier 2",
            "puzzle tools",
            "binary converter",
            "Morse converter",
            "sliding puzzle",
          ],
  });

  return {
    ...metadata,
    title: {
      absolute: "DF2 Helper",
    },
    openGraph: metadata.openGraph
      ? {
          ...metadata.openGraph,
          title: "DF2 Helper",
        }
      : undefined,
    twitter: metadata.twitter
      ? {
          ...metadata.twitter,
          title: "DF2 Helper",
        }
      : undefined,
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const toolMeta = await getTranslations({ locale, namespace: "tools.meta" });
  const resourceItems = await getTranslations({
    locale,
    namespace: "home.resources.items",
  });
  const resources = await getTranslations({
    locale,
    namespace: "home.resources",
  });
  const tools = getToolMeta(toolMeta);
  const externalResources = getExternalResourceMeta(resourceItems);
  const officialResources = externalResources.filter(
    (resource) => resource.category === "official",
  );
  const unofficialResources = externalResources.filter(
    (resource) => resource.category === "unofficial",
  );

  return (
    <main className="space-y-8">
      <section className="overflow-hidden rounded-[28px] border border-border/60 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.8),transparent_35%),linear-gradient(135deg,rgba(248,250,252,0.95),rgba(226,232,240,0.9))] p-6 shadow-sm sm:p-8 dark:bg-[radial-gradient(circle_at_top_left,rgba(148,163,184,0.18),transparent_35%),linear-gradient(135deg,rgba(15,23,42,0.96),rgba(30,41,59,0.92))]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <div className="space-y-2">
              <h1 className="font-semibold text-3xl tracking-tight sm:text-4xl">
                {t("title")}
              </h1>
              <p className="max-w-xl text-muted-foreground sm:text-base">
                {t("description")}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href={tools[0]?.href ?? "/"}>
                {t("cta")}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:auto-rows-fr md:grid-cols-2 xl:grid-cols-3">
        {tools.map((tool: ToolMeta) => (
          <Link key={tool.id} href={tool.href} className={flatCardClass}>
            <div className="mb-4 flex items-center justify-between gap-3">
              <span className={flatBadgeClass}>{tool.badge}</span>
              <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
            </div>
            <div className="flex-1 space-y-2">
              <h2 className="font-semibold text-lg">{tool.label}</h2>
              <p className="text-muted-foreground text-sm leading-6">
                {tool.description}
              </p>
            </div>
          </Link>
        ))}
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1 text-muted-foreground text-xs uppercase tracking-[0.24em]">
              <ExternalLink className="size-3.5" />
              {resources("eyebrow")}
            </div>
            <div className="space-y-1">
              <h2 className="font-semibold text-2xl tracking-tight">
                {resources("title")}
              </h2>
              <p className="max-w-2xl text-muted-foreground text-sm sm:text-base">
                {resources("description")}
              </p>
            </div>
          </div>
          <p className="text-muted-foreground text-xs sm:text-sm">
            {resources("hint")}
          </p>
        </div>

        <div className="space-y-4">
          <div className={flatSectionClass}>
            <div className="mb-5 space-y-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-1 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                <ShieldCheck className="size-3.5" />
                {resources("groups.official.eyebrow")}
              </span>
              <div className="space-y-1">
                <h3 className="font-semibold text-xl tracking-tight">
                  {resources("groups.official.title")}
                </h3>
                <p className="text-muted-foreground text-sm leading-6">
                  {resources("groups.official.description")}
                </p>
              </div>
            </div>

            <div className="grid auto-rows-fr gap-4 md:grid-cols-2">
              {officialResources.map((resource) => {
                const Icon =
                  resourceIcons[resource.id as keyof typeof resourceIcons];

                return (
                  <a
                    key={resource.id}
                    href={resource.href}
                    target="_blank"
                    rel="noreferrer"
                    className={flatCardClass}
                  >
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <span className={flatBadgeClass}>
                        <Icon className="size-3.5" />
                        {resource.badge}
                      </span>
                      <ExternalLink className="group-hover:-translate-y-0.5 size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h4 className="font-semibold text-lg leading-snug">
                        {resource.label}
                      </h4>
                      <p className="text-muted-foreground text-sm leading-6">
                        {resource.description}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          <div className={flatSectionClass}>
            <div className="mb-5 space-y-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-1 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                <BookOpen className="size-3.5" />
                {resources("groups.unofficial.eyebrow")}
              </span>
              <div className="space-y-1">
                <h3 className="font-semibold text-xl tracking-tight">
                  {resources("groups.unofficial.title")}
                </h3>
                <p className="text-muted-foreground text-sm leading-6">
                  {resources("groups.unofficial.description")}
                </p>
              </div>
            </div>

            <div className="grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-3">
              {unofficialResources.map((resource) => {
                const Icon =
                  resourceIcons[resource.id as keyof typeof resourceIcons];

                return (
                  <a
                    key={resource.id}
                    href={resource.href}
                    target="_blank"
                    rel="noreferrer"
                    className={flatCardClass}
                  >
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <span className={flatBadgeClass}>
                        <Icon className="size-3.5" />
                        {resource.badge}
                      </span>
                      <ExternalLink className="group-hover:-translate-y-0.5 size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h4 className="font-semibold text-lg leading-snug">
                        {resource.label}
                      </h4>
                      <p className="text-muted-foreground text-sm leading-6">
                        {resource.description}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
