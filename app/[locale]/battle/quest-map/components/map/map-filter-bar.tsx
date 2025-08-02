'use client';

import { AudioWaveform, Check, Funnel, Trash, X } from 'lucide-react';
import { useEffect, useState } from 'react';

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
import { useMapFilter } from '../../stores/map-filter';

const buildingTypeNameMap = {
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

export default function MapFilterBar({
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div {...props}>
      <ClearButton />
      <BuildingTypeFilter />
      <ShowMapPathButton />
      <BuildingFilter />
    </div>
  );
}

function ClearButton() {
  const { buildingTypeFilter, buildingFilter, clearFilters } = useMapFilter();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={clearFilters}
      disabled={
        buildingTypeFilter === undefined && buildingFilter === undefined
      }
    >
      <Trash />
    </Button>
  );
}

function BuildingTypeFilter() {
  const [open, setOpen] = useState(false);

  const { buildingTypeFilter, setBuildingTypeFilter } = useMapFilter();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={buildingTypeFilter === undefined ? 'outline' : 'default'}
          size="icon"
        >
          <Funnel />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput placeholder="Search type..." />
          <CommandEmpty>No type found.</CommandEmpty>
          <CommandGroup>
            {BuildingTypeSchema.options.map((type) => (
              <CommandItem
                key={type}
                onSelect={() => {
                  setBuildingTypeFilter(type);
                  setOpen(false);
                }}
              >
                <Check
                  className={
                    buildingTypeFilter === type ? 'opacity-100' : 'opacity-0'
                  }
                />
                {buildingTypeNameMap[type] || type}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function ShowMapPathButton() {
  const { showMapPath, setShowMapPath } = useMapFilter();
  return (
    <Button
      variant={showMapPath ? 'default' : 'outline'}
      size="icon"
      onClick={() => setShowMapPath(!showMapPath)}
    >
      <AudioWaveform />
    </Button>
  );
}

function BuildingFilter() {
  const { buildingFilter, setBuildingFilter } = useMapFilter();
  const [value, setValue] = useState('');
  const debounceValue = useDebounce(value, 300);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onClear = () => {
    setValue('');
    setBuildingFilter(undefined);
  };

  useEffect(() => {
    setBuildingFilter(debounceValue ? debounceValue : undefined);
  }, [setBuildingFilter, debounceValue]);

  useEffect(() => {
    setValue(buildingFilter || '');
  }, [buildingFilter]);

  return (
    <div className="relative">
      <Input value={value} onChange={onChange} placeholder="Enter building" />
      <X
        className={cn(
          'absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer',
          'text-gray-500 transition-colors duration-150 ease-in hover:text-gray-400',
          value ? 'block' : 'hidden',
        )}
        onClick={onClear}
      />
    </div>
  );
}
