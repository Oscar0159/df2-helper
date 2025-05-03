'use client';

import { Column, Table } from '@tanstack/react-table';
import { Check, Funnel } from 'lucide-react';
import { CopyCheck, Trash, X } from 'lucide-react';
import {
  startTransition,
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react';

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

import { MissionTypeSchema } from '../../../schema/mission-type';
import { useMissionStore } from '../../../stores/use-mission-store';

export function ClearFilter<TData>({
  table,
  className,
  ...porps
}: { table: Table<TData> } & React.ComponentProps<typeof Button>) {
  const [isPending, startTransition] = useTransition();

  const columnFilters = table.getState().columnFilters;

  const onClick = () => {
    startTransition(() => {
      table.resetColumnFilters();
    });
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onClick}
      className={className}
      {...porps}
      disabled={isPending || !columnFilters.length}
    >
      <Trash />
    </Button>
  );
}

export function TypeFilter<TData>({
  column,
  ...props
}: { column?: Column<TData, unknown> } & React.ComponentProps<typeof Button>) {
  const [open, setOpen] = useState(false);

  const filterValue = column?.getFilterValue();

  const onSelect = (value: string) => {
    const result = MissionTypeSchema.safeParse(value);
    startTransition(() => {
      if (!result.success) column?.setFilterValue('');
      else if (result.data === filterValue) column?.setFilterValue('');
      else column?.setFilterValue(result.data);
    });

    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={filterValue ? 'default' : 'outline'}
          size="icon"
          {...props}
        >
          {/* {filterValue ? MissionTypeSchema.options.find((t) => t === filterValue) : 'Select Type ...'} */}
          <Funnel />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search type..." />
          <CommandEmpty>No type found.</CommandEmpty>
          <CommandGroup>
            {MissionTypeSchema.options.map((t) => (
              <CommandItem key={t} onSelect={onSelect}>
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    filterValue === t ? 'opacity-100' : 'opacity-0',
                  )}
                />
                {t}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function SelectedFilter<TData>({
  table,
  className,
  ...props
}: { table: Table<TData> } & React.ComponentProps<typeof Button>) {
  const selectedMissions = useMissionStore((s) => s.selectedMissions);

  const selectedIds = new Set([
    ...selectedMissions['dist'],
    ...selectedMissions['giver'],
  ]);

  const filteredValue = table.getColumn('distSelect')?.getFilterValue() as
    | Set<string>
    | undefined;

  const onClick = () => {
    if (filteredValue !== undefined) {
      table.getColumn('distSelect')?.setFilterValue(undefined);
      table.getColumn('giverSelect')?.setFilterValue(undefined);
      return;
    }

    table.getColumn('distSelect')?.setFilterValue(selectedIds);
    table.getColumn('giverSelect')?.setFilterValue(selectedIds);
  };

  return (
    <Button
      variant={filteredValue !== undefined ? 'default' : 'outline'}
      size="icon"
      title="Show Selected"
      className={className}
      onClick={onClick}
      {...props}
    >
      <CopyCheck />
    </Button>
  );
}

export function RequirementFilter<TData>({
  column,
  className,
  ...props
}: { column?: Column<TData, unknown> } & React.ComponentProps<'div'>) {
  const [value, setValue] = useState<string>('');
  const debounceValue = useDebounce(value, 300);

  const isTypingRef = useRef(false);

  const filteredValue =
    typeof column?.getFilterValue() === 'string'
      ? (column.getFilterValue() as string)
      : '';

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    isTypingRef.current = true;
  };

  const onClear = () => {
    setValue('');
    startTransition(() => {
      column?.setFilterValue('');
    });
  };

  useEffect(() => {
    startTransition(() => {
      column?.setFilterValue(debounceValue);
    });
  }, [column, debounceValue]);

  useEffect(() => {
    if (!isTypingRef.current && filteredValue !== value) {
      setValue(filteredValue);
    }
  }, [filteredValue, value]);

  return (
    <div className={cn('relative', className)} {...props}>
      <Input
        placeholder="Search Requirements ..."
        onChange={onChange}
        value={value}
      />
      <X
        className={cn(
          'absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer',
          'text-gray-500 transition-colors duration-150 ease-in hover:text-gray-400',
          filteredValue ? 'block' : 'hidden',
        )}
        onClick={onClear}
      />
    </div>
  );
}
