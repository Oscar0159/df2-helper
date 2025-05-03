import { Column } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { Mission } from '../../../schema/mission';

export default function SortingButton({
  column,
  ...props
}: { column: Column<Mission> } & React.ComponentProps<'button'>) {
  const sortDirection = column.getIsSorted();

  const onClick = () => {
    if (sortDirection === 'desc') {
      column.clearSorting();
      return;
    }

    column.toggleSorting(sortDirection === 'asc');
  };

  return (
    <Button variant="ghost" size="icon" onClick={onClick} {...props}>
      <ArrowUpDown
        className={cn('hidden', sortDirection === false && 'block')}
      />
      <ArrowDown
        className={cn('hidden', sortDirection === 'desc' && 'block')}
      />
      <ArrowUp className={cn('hidden', sortDirection === 'asc' && 'block')} />
    </Button>
  );
}
