export type ExternalResourceCategory = "official" | "unofficial";

export type ExternalResourceMeta = {
  id: string;
  href: string;
  label: string;
  description: string;
  badge: string;
  category: ExternalResourceCategory;
};

export const externalResourceRoutes = [
  {
    id: "support",
    href: "https://dead-frontier-2-2.tenderapp.com/",
    category: "official",
  },
  {
    id: "discord",
    href: "https://discord.com/invite/deadfrontier2",
    category: "official",
  },
  {
    id: "missions",
    href: "https://www.df2haven.com/missions/",
    category: "unofficial",
  },
  {
    id: "map",
    href: "https://df2profiler.com/gamemap/",
    category: "unofficial",
  },
  {
    id: "wiki",
    href: "https://deadfrontier2.fandom.com/wiki/Deadfrontier_II_Wiki",
    category: "unofficial",
  },
] as const;

export function getExternalResourceMeta(
  translate: (key: string) => string,
): ExternalResourceMeta[] {
  return externalResourceRoutes.map((resource) => ({
    id: resource.id,
    href: resource.href,
    label: translate(`${resource.id}.label`),
    description: translate(`${resource.id}.description`),
    badge: translate(`${resource.id}.badge`),
    category: resource.category,
  }));
}
