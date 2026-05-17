"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { cn } from "@/lib/utils";

type ConversionModeOption<T extends string> = {
  value: T;
  label: string;
};

type ConversionModeToggleProps<T extends string> = {
  value: T;
  options: readonly ConversionModeOption<T>[];
  onValueChange: (value: T) => void;
  className?: string;
};

export function ConversionModeToggle<T extends string>({
  value,
  options,
  onValueChange,
  className,
}: ConversionModeToggleProps<T>) {
  return (
    <ButtonGroup
      className={cn(
        "rounded-lg border border-border/60 bg-background/75 p-0.5 shadow-none",
        className,
      )}
    >
      {options.map((option) => {
        const active = option.value === value;

        return (
          <Button
            type="button"
            key={option.value}
            size="sm"
            variant={active ? "default" : "ghost"}
            className={cn(
              "rounded-md border-0 shadow-none",
              !active && "text-muted-foreground hover:text-foreground",
            )}
            onClick={() => onValueChange(option.value)}
            aria-pressed={active}
          >
            {option.label}
          </Button>
        );
      })}
    </ButtonGroup>
  );
}
