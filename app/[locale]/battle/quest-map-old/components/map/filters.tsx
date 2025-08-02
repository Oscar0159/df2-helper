'use client';

import { Check, Funnel, Trash, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useDebounce } from '@/hooks/use-debounce';
import { cn } from '@/lib/utils';

import { BuildingTypeSchema } from '../../schema/building-type';

export function ClearFilter({
  className,
  ...porps
}: React.ComponentProps<typeof Button>) {
  return (
    <Button variant="outline" size="icon" className={className} {...porps}>
      <Trash />
    </Button>
  );
}

const buildingTypeMap = {
  HOS: 'Hospital',
  POL: 'Police',
  IND: 'Industrial',
  HOT: 'Hotel',
  HOU: 'House',
  SHP: 'Shop',
  RST: 'Restaurant',
  APT: 'Apartment',
  OFF: 'Office',
  MAN: 'Mansion',
};
export function TypeFilter({ ...props }: React.ComponentProps<typeof Button>) {
  const [open, setOpen] = useState(false);

  const onSelect = () => {
    // const result = BuildingTypeSchema.safeParse(value);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={false ? 'default' : 'outline'} size="icon" {...props}>
          {/* {filterValue ? MissionTypeSchema.options.find((t) => t === filterValue) : 'Select Type ...'} */}
          <Funnel />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search type..." />
          <CommandEmpty>No type found.</CommandEmpty>
          <CommandGroup>
            {BuildingTypeSchema.options.map((t) => (
              <CommandItem key={t} onSelect={onSelect}>
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    false ? 'opacity-100' : 'opacity-0',
                  )}
                />
                {buildingTypeMap[t] || t}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function BuildingFilter({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [value, setValue] = useState<string>('');
  const debounceValue = useDebounce(value, 300);

  const isTypingRef = useRef<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    isTypingRef.current = true;
    setValue(e.target.value);
  };

  const onClear = () => {
    setValue('');
  };

  useEffect(() => {
    if (!isTypingRef.current) {
    }
  }, [debounceValue]);

  return (
    <div className={cn('relative', className)} {...props}>
      <Input
        placeholder="Search Building ..."
        onChange={onChange}
        value={value}
      />
      <X
        className={cn(
          'absolute right-0 h-full -translate-x-1/2 -translate-y-full cursor-pointer',
          'text-gray-500 transition-colors duration-150 ease-in hover:text-gray-400',
          value ? 'block' : 'hidden',
        )}
        onClick={onClear}
      />
    </div>
  );
}
