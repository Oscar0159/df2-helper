'use client';

import {
    ColumnDef,
    ColumnFiltersState,
    RowData,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { ScrapCashItem } from '../types';
import { DataTablePagination } from './data-table-pagination';
import { DataTableToolbar } from './data-table-toolbar';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
    const t = useTranslations();

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({ building: false });
    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
        },
        initialState: {
            pagination: {
                pageSize: data.length,
            },
        },
        enableRowSelection: true,
        filterFromLeafRows: false,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    });

    return (
        <div className="grid grid-cols-1">
            <div className="gap-4 flex flex-col justify-between">
                <DataTableToolbar table={table} />

                {/* Desktop */}
                <div className="rounded-md border h-[500px] overflow-y-auto hidden sm:block">
                    <Table>
                        <TableHeader className="bg-background sticky top-0 shadow">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(header.column.columnDef.header, header.getContext())}
                                            </TableHead>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        {t('DataTable.no-results')}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Mobile */}
                <div className="rounded-md h-[500px] overflow-y-auto overflow-x-hidden sm:hidden">
                    <div className="sticky top-0  flex overflow-y-auto">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <div
                                key={headerGroup.id}
                                className="flex gap-6 items-cente bg-gradient-to-b from-25% from-background to-background/70 px-2 pb-8 pt-4"
                            >
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <div key={header.id} className="sticky top-0 bg-background">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col gap-2 pb-20">
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => {
                                const cells = row.getVisibleCells();
                                const nameCell = cells.find((cell) => cell.column.id === 'name');
                                const typeCell = cells.find((cell) => cell.column.id === 'type');
                                const normalCell = cells.find((cell) => cell.column.id === 'normal');
                                const superiorCell = cells.find((cell) => cell.column.id === 'superior');
                                const rareCell = cells.find((cell) => cell.column.id === 'rare');
                                const eliteCell = cells.find((cell) => cell.column.id === 'elite');
                                return (
                                    <Card
                                        key={row.id}
                                        // grid grid-cols-${table.getVisibleFlatColumns().length} gap-2 p-2 items-center
                                        className={``}
                                    >
                                        <CardHeader>
                                            {nameCell && (
                                                <CardTitle className="text-lg font-medium">
                                                    {flexRender(nameCell.column.columnDef.cell, nameCell.getContext())}
                                                </CardTitle>
                                            )}
                                            {typeCell && (
                                                <CardDescription>
                                                    {flexRender(typeCell.column.columnDef.cell, typeCell.getContext())}
                                                </CardDescription>
                                            )}
                                        </CardHeader>
                                        <CardContent className="flex gap-2">
                                            {normalCell && (
                                                <div className="flex-1">
                                                    <h3>{t('ScrapCashDataTable.normal')}</h3>
                                                    <span>
                                                        {flexRender(
                                                            normalCell.column.columnDef.cell,
                                                            normalCell.getContext()
                                                        )}
                                                    </span>
                                                </div>
                                            )}
                                            {superiorCell && (
                                                <div className="flex-1">
                                                    <h3>{t('ScrapCashDataTable.superior')}</h3>
                                                    <span>
                                                        {flexRender(
                                                            superiorCell.column.columnDef.cell,
                                                            superiorCell.getContext()
                                                        )}
                                                    </span>
                                                </div>
                                            )}
                                            {rareCell && (
                                                <div className="flex-1">
                                                    <h3>{t('ScrapCashDataTable.rare')}</h3>
                                                    <span>
                                                        {flexRender(
                                                            rareCell.column.columnDef.cell,
                                                            rareCell.getContext()
                                                        )}
                                                    </span>
                                                </div>
                                            )}
                                            {eliteCell && (
                                                <div className="flex-1">
                                                    <h3>{t('ScrapCashDataTable.elite')}</h3>
                                                    <span>
                                                        {flexRender(
                                                            eliteCell.column.columnDef.cell,
                                                            eliteCell.getContext()
                                                        )}
                                                    </span>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                );
                            })
                        ) : (
                            <Card>
                                <div className="h-24 text-center">{t('DataTable.no-results')}</div>
                            </Card>
                        )}
                    </div>
                </div>

                <DataTablePagination table={table} />
            </div>
        </div>
    );
}
