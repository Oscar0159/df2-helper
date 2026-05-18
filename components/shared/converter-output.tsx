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
      <div className="tool-subpanel">
        <p className="tool-section-label">{primaryTitle}</p>
        <p className="mt-2 text-3xl font-semibold tracking-[0.24em] break-all">{primary}</p>
      </div>

      <div className="tool-subpanel-inset">
        <p className="tool-section-label">{detailTitle}</p>
        {secondaryItems.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {secondaryItems.map((item) => (
              <span
                key={item.id}
                className="border-border/60 bg-muted rounded-full border px-3 py-1 text-sm font-medium"
              >
                {item.label}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground mt-2 text-sm">{secondary}</p>
        )}
      </div>
    </div>
  );
}
