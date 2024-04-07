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
        accessorKey: 'minlvl',
        header: ({ column }) => <DataTableColumnHeader column={column} translationKey="minlvl" />,
        filterFn: (row, id, value) => {
            return (row.getValue(id) as number) <= value;
        },
    },
    {
        accessorKey: 'maxlvl',
        header: ({ column }) => <DataTableColumnHeader column={column} translationKey="maxlvl" />,
        filterFn: (row, id, value) => {
            return (row.getValue(id) as number) >= value;
        },
    },
    {
        accessorKey: 'drawdestination',
        header: ({ table, column }) => (
            <div className="flex items-center justify-center gap-2">
                <Checkbox
                    disabled={table
                        .getPaginationRowModel()
                        .rows.every((row) => !row.original.xcoord || !row.original.ycoord)}
                    checked={
                        !table
                            .getPaginationRowModel()
                            .rows.every((row) => !row.original.xcoord || !row.original.ycoord) &&
                        (table
                            .getPaginationRowModel()
                            .rows.every(
                                (row) => row.original.drawdestination || !row.original.xcoord || !row.original.ycoord
                            ) ||
                            (table
                                .getPaginationRowModel()
                                .rows.some(
                                    (row) => row.original.drawdestination && row.original.xcoord && row.original.ycoord
                                ) &&
                                'indeterminate'))
                    }
                    className="flex items-center justify-center"
                    onClick={() => {
                        table
                            .getPaginationRowModel()
                            .rows.forEach((row) =>
                                table.options.meta?.updateData(
                                    row.index,
                                    'drawdestination',
                                    !table.getPaginationRowModel().rows.every((row) => row.original.drawdestination)
                                )
                            );
                    }}
                />
                <span>Dst</span>
            </div>
        ),
        cell: ({ table, row }) => (
            <div className="flex items-center justify-center">
                <Checkbox
                    disabled={!row.original.xcoord || !row.original.ycoord}
                    checked={row.getValue('drawdestination')}
                    onCheckedChange={(value) => {
                        table.options.meta?.updateData(row.index, 'drawdestination', value);
                    }}
                    className={!row.original.xcoord || !row.original.ycoord ? 'opacity-0 bg-red-500' : ''}
                />
            </div>
        ),
    },
    {
        accessorKey: 'drawgiver',
        header: ({ table, column }) => (
            <div className="flex items-center justify-center gap-2">
                <Checkbox
                    disabled={table
                        .getPaginationRowModel()
                        .rows.every((row) => !row.original.giverxcoord || !row.original.giverycoord)}
                    checked={
                        !table
                            .getPaginationRowModel()
                            .rows.every((row) => !row.original.giverxcoord || !row.original.giverycoord) &&
                        (table
                            .getPaginationRowModel()
                            .rows.every(
                                (row) =>
                                    row.original.drawgiver || !row.original.giverxcoord || !row.original.giverycoord
                            ) ||
                            (table
                                .getPaginationRowModel()
                                .rows.some(
                                    (row) =>
                                        row.original.drawgiver && row.original.giverxcoord && row.original.giverycoord
                                ) &&
                                'indeterminate'))
                    }
                    className="flex items-center justify-center"
                    onClick={() => {
                        table
                            .getPaginationRowModel()
                            .rows.forEach((row) =>
                                table.options.meta?.updateData(
                                    row.index,
                                    'drawgiver',
                                    !table.getPaginationRowModel().rows.every((row) => row.original.drawgiver)
                                )
                            );
                    }}
                />
                <span>Giv</span>
            </div>
        ),
        cell: ({ table, row }) => (
            <div className="flex items-center justify-center">
                <Checkbox
                    disabled={!row.original.giverxcoord || !row.original.giverycoord}
                    checked={row.getValue('drawgiver')}
                    onCheckedChange={(value) => {
                        table.options.meta?.updateData(row.index, 'drawgiver', value);
                    }}
                    className={!row.original.giverxcoord || !row.original.giverycoord ? 'opacity-0 bg-red-500' : ''}
                />
            </div>
        ),
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
    {
        accessorKey: 'building',
        header: ({ column }) => <DataTableColumnHeader column={column} translationKey="building" />,
    },
];
