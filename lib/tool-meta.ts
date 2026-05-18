export type ToolMeta = {
  id: string;
  href: string;
  label: string;
  description: string;
  badge: string;
};

export const toolRoutes = [
  { id: 'binary', href: '/binary-converter' },
  { id: 'alphaNumeric', href: '/letter-number-converter' },
  { id: 'wordFinder', href: '/word-finder' },
  { id: 'morse', href: '/morse-converter' },
  { id: 'lightsOut', href: '/lights-out' },
  { id: 'slidingPuzzle', href: '/sliding-puzzle' },
] as const;

export function getToolMeta(translate: (key: string) => string): ToolMeta[] {
  return toolRoutes.map((tool) => ({
    id: tool.id,
    href: tool.href,
    label: translate(`${tool.id}.label`),
    description: translate(`${tool.id}.description`),
    badge: translate(`${tool.id}.badge`),
  }));
}
