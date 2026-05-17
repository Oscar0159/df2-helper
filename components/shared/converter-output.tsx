type ConverterOutputProps = {
  primaryTitle: string;
  detailTitle: string;
  primary: string;
  secondary: string;
};

function splitSecondaryItems(secondary: string) {
  const counts = new Map<string, number>();

  return secondary
    .split(" • ")
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
        <p className="mt-2 break-all font-semibold text-3xl tracking-[0.24em]">
          {primary}
        </p>
      </div>

      <div className="tool-subpanel-inset">
        <p className="tool-section-label">{detailTitle}</p>
        {secondaryItems.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {secondaryItems.map((item) => (
              <span
                key={item.id}
                className="rounded-full border border-border/60 bg-muted px-3 py-1 font-medium text-sm"
              >
                {item.label}
              </span>
            ))}
          </div>
        ) : (
          <p className="mt-2 text-muted-foreground text-sm">{secondary}</p>
        )}
      </div>
    </div>
  );
}
