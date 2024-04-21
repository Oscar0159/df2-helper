'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

import type { ScrapCashItem } from '../types';
import { DataTableColumnHeader } from './data-table-column-header';

export const columns: ColumnDef<ScrapCashItem>[] = [
    {
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} translationKey="name" />,
    },
    {
        accessorKey: 'type',
        header: ({ column }) => <DataTableColumnHeader column={column} translationKey="type" />,
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: 'normal',
        header: ({ column }) => <DataTableColumnHeader column={column} translationKey="normal" />,
    },
    {
        accessorKey: 'superior',
        header: ({ column }) => <DataTableColumnHeader column={column} translationKey="superior" />,
    },
    {
        accessorKey: 'rare',
        header: ({ column }) => <DataTableColumnHeader column={column} translationKey="rare" />,
    },
    {
        accessorKey: 'elite',
        header: ({ column }) => <DataTableColumnHeader column={column} translationKey="elite" />,
    },
];
