'use client';

import { Check, CopyCheck, Funnel, Trash, X } from 'lucide-react';
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

import { MissionTypeSchema } from '../../schema/mission-type';
import { useMissionFilter } from '../../stores/mission-filter';

export default function MissionFilterBar({
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div {...props}>
      <ClearButton />
      <MissionTypeFilter />
      <ShowSelectedMissionsButton />
      {/* <DailyMissionFilter /> */}
      {/* <ForeverMissionFilter /> */}
      <RequirementFilter />
    </div>
  );
}

function ClearButton() {
  const {
    missionTypeFilter,
    requirementFilter,
    onlyShowSelectedMissions,
    clearFilters,
  } = useMissionFilter();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={clearFilters}
      disabled={
        missionTypeFilter === undefined &&
        requirementFilter === undefined &&
        !onlyShowSelectedMissions
      }
    >
      <Trash />
    </Button>
  );
}

function MissionTypeFilter() {
  const [open, setOpen] = useState(false);

  const { missionTypeFilter, setMissionTypeFilter } = useMissionFilter();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={missionTypeFilter === undefined ? 'outline' : 'default'}
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
            {MissionTypeSchema.options.map((type) => (
              <CommandItem
                key={type}
                onSelect={() => {
                  if (missionTypeFilter === type) {
                    setMissionTypeFilter(undefined);
                  } else {
                    setMissionTypeFilter(type);
                  }
                  setOpen(false);
                }}
              >
                <Check
                  className={
                    missionTypeFilter === type ? 'opacity-100' : 'opacity-0'
                  }
                />
                {type}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function ShowSelectedMissionsButton() {
  const { onlyShowSelectedMissions, setOnlyShowSelectedMissions } =
    useMissionFilter();
  return (
    <Button
      variant={onlyShowSelectedMissions ? 'default' : 'outline'}
      size="icon"
      onClick={() => setOnlyShowSelectedMissions(!onlyShowSelectedMissions)}
    >
      <CopyCheck />
    </Button>
  );
}

function DailyMissionFilter() {
  const { dailyMissionsFilter, setDailyMissionFilter } = useMissionFilter();

  return (
    <Button
      variant={dailyMissionsFilter === 'show' ? 'outline' : 'default'}
      onClick={() =>
        setDailyMissionFilter(
          dailyMissionsFilter === 'show'
            ? 'only'
            : dailyMissionsFilter === 'only'
              ? 'hide'
              : 'show',
        )
      }
      className={cn(
        'flex gap-2',
        dailyMissionsFilter === 'hide' && 'line-through',
      )}
    >
      Daily
    </Button>
  );
}

function ForeverMissionFilter() {
  const { foreverMissionsFilter, setForeverMissionFilter } = useMissionFilter();

  return (
    <Button
      variant={foreverMissionsFilter === 'show' ? 'outline' : 'default'}
      onClick={() =>
        setForeverMissionFilter(
          foreverMissionsFilter === 'show'
            ? 'only'
            : foreverMissionsFilter === 'only'
              ? 'hide'
              : 'show',
        )
      }
      className={cn(
        'flex gap-2',
        foreverMissionsFilter === 'hide' && 'line-through',
      )}
    >
      Forever
    </Button>
  );
}

function RequirementFilter() {
  const { requirementFilter, setRequirementFilter } = useMissionFilter();
  const [value, setValue] = useState('');
  const debounceValue = useDebounce(value, 300);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onClear = () => {
    setValue('');
    setRequirementFilter(undefined);
  };

  useEffect(() => {
    setRequirementFilter(debounceValue ? debounceValue : undefined);
  }, [setRequirementFilter, debounceValue]);

  useEffect(() => {
    setValue(requirementFilter || '');
  }, [requirementFilter]);

  return (
    <div className="relative">
      <Input
        value={value}
        onChange={onChange}
        placeholder="Enter requirement"
      />
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
