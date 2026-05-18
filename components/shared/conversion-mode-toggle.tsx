'use client';

import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';

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
    <ButtonGroup>
      {options.map((option) => {
        const active = option.value === value;

        return (
          <Button
            key={option.value}
            variant={active ? 'default' : 'outline'}
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
