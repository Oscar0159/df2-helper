import { Table } from '@tanstack/react-table';
import { XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { DataTableViewOptions } from './data-table-view-options';

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;

    const missionTypes = [
        {
            value: 'Challenges',
            label: 'Challenges',
        },
        {
            value: 'Clear Escape',
            label: 'Clear Escape',
        },
        {
            value: 'Complete Mission',
            label: 'Complete Mission',
        },
        {
            value: 'Escape Stalker',
            label: 'Escape Stalker',
        },
        {
            value: 'Exterminate',
            label: 'Exterminate',
        },
        {
            value: 'Find Item',
            label: 'Find Item',
        },
        {
            value: 'Kill Boss',
            label: 'Kill Boss',
        },
        {
            value: 'Kill Infected',
            label: 'Kill Infected',
        },
        {
            value: 'Locate / Contact Person',
            label: 'Locate / Contact Person',
        },
        {
            value: 'Loot Buildings',
            label: 'Loot Buildings',
        },
        {
            value: 'easterCultistAcolyte',
            label: 'easterCultistAcolyte',
        },
    ];

    return (
        <div className="flex flex-col justify-center gap-4">
            <div className="flex items-center space-x-2 justify-between">
                <Input
                    placeholder="Filter requirement..."
                    value={(table.getColumn('requirement')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('requirement')?.setFilterValue(event.target.value)}
                />
                <DataTableViewOptions table={table} />
            </div>
            <div className="flex items-center space-x-2">
                {table.getColumn('type') && (
                    <DataTableFacetedFilter column={table.getColumn('type')} title="Type" options={missionTypes} />
                )}
                {isFiltered && (
                    <Button variant="default" onClick={() => table.resetColumnFilters()} className="px-2 lg:px-3">
                        Reset
                        <XIcon className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
        </div>
    );
}
