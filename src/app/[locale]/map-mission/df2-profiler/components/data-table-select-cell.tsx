import { Column, Row, Table } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';

import { Mission } from '../types';

interface DataTableSelectCellProps<TData, TValue> {
    table: Table<TData>;
    row: Row<TData>;
    column: Column<TData, TValue>;
}

export function DataTableSelectCell<TData, TValue>({ table, row, column }: DataTableSelectCellProps<TData, TValue>) {
    return (
        <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => {
                row.toggleSelected(!!value, { selectChildren: !!value });
            }}
        />
    );
}
