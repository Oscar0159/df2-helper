import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader } from '../ui/card';

type ConverterOutputProps = {
  primaryTitle: string;
  detailTitle: string;
  primary: string;
  secondary: string;
};

function splitSecondaryItems(secondary: string) {
  const counts = new Map<string, number>();

  return secondary
    .split(' • ')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      const occurrence = (counts.get(item) ?? 0) + 1;
      counts.set(item, occurrence);

      return {
        id: `${item}-${occurrence}`,
        label: item,
      };
    });
}

export function ConverterOutput({
  primaryTitle,
  detailTitle,
  primary,
  secondary,
}: ConverterOutputProps) {
  const secondaryItems = splitSecondaryItems(secondary);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <p className="leading-none font-medium">{primaryTitle}</p>
        </CardHeader>
        <CardContent>
          <p className="mt-2 text-3xl font-semibold tracking-[0.24em] break-all">{primary}</p>
        </CardContent>
      </Card>

      <div className="tool-subpanel-inset">
        <p className="tool-section-label">{detailTitle}</p>
        {secondaryItems.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {secondaryItems.map((item) => (
              <Badge key={item.id} variant="outline">
                {item.label}
              </Badge>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground mt-2 text-sm">{secondary}</p>
        )}
      </div>
    </div>
  );
}
