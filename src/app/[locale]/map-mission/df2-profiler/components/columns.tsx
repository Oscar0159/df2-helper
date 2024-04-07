'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

import type { DrawOption, Mission } from '../types';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableSelectCell } from './data-table-select-cell';
import { DataTableSelectHeader } from './data-table-select-header';

export const columns: ColumnDef<Mission & DrawOption>[] = [
    // {
    //     id: 'select',
    //     header: ({ table }) => <DataTableSelectHeader table={table} />,
    //     cell: ({ table, row }) => <DataTableSelectCell table={table} row={row} />,
    //     enableSorting: false,
    //     enableHiding: false,
    // },
    {
        accessorKey: 'drawdestination',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} translationKey="drawdestination" className="justify-center" />
        ),
        cell: ({ table, row }) => (
            <div className="flex items-center justify-center">
                <Checkbox
                    disabled={!row.original.xcoord || !row.original.ycoord}
                    checked={row.getValue('drawdestination')}
                    onCheckedChange={(value) => {
                        (
                            table.options.meta as {
                                updateData: (rowIndex: number, columnId: string, value: any) => void;
                            }
                        ).updateData(row.index, 'drawdestination', value);
                    }}
                    className={(!row.original.xcoord || !row.original.ycoord) ? 'opacity-0 bg-red-500' : ''}
                />
            </div>
        ),
    },
    {
        accessorKey: 'drawgiver',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} translationKey="drawgiver" className="justify-center" />
        ),
        cell: ({ table, row }) =>
            row.original.giverxcoord && row.original.giverycoord ? (
                <div className="flex items-center justify-center">
                    <Checkbox
                        disabled={!row.original.giverxcoord || !row.original.giverycoord}
                        checked={row.getValue('drawgiver')}
                        onCheckedChange={(value) => {
                            (
                                table.options.meta as {
                                    updateData: (rowIndex: number, columnId: string, value: any) => void;
                                }
                            ).updateData(row.index, 'drawgiver', value);
                        }}
                        className={(!row.original.giverxcoord || !row.original.giverycoord) ? 'opacity-0 bg-red-500' : ''}
                    />
                </div>
            ) : null,
    },
    {
        accessorKey: 'type',
        header: ({ column }) => <DataTableColumnHeader column={column} translationKey="type" />,
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: 'requirement',
        header: ({ column }) => <DataTableColumnHeader column={column} translationKey="requirement" />,
    },
];
