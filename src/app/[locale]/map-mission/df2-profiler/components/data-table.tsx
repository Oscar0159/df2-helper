'use client';

import {
    ColumnDef,
    ColumnFiltersState,
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
import { Dispatch, SetStateAction, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { DataTablePagination } from './data-table-pagination';
import { DataTableToolbar } from './data-table-toolbar';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    setData: Dispatch<SetStateAction<TData[]>>;
}

export function DataTable<TData, TValue>({ columns, data, setData }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
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
                pageSize: 10,
            },
        },
        meta: {
            updateData: (rowIndex: number, columnId: string, value: TValue) => {
                setData((old) =>
                    old.map((row, index) => {
                        if (index === rowIndex) {
                            return {
                                ...old[rowIndex]!,
                                [columnId]: value,
                            };
                        }
                        return row;
                    })
                );
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
        <div className="gap-2 flex flex-col grow justify-between">
            <DataTableToolbar table={table} />

            {/* Desktop */}
            <div className="rounded-md border h-[500px] overflow-y-auto hidden sm:block">
                <Table>
                    <TableHeader className="bg-background">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="sticky top-0 bg-background">
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
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Mobile */}
            <div className="rounded-md h-[500px] overflow-y-auto overflow-x-hidden sm:hidden">
                {table.getHeaderGroups().map((headerGroup) => (
                    <div
                        key={headerGroup.id}
                        className="sticky top-0 flex gap-6 items-cente bg-gradient-to-b from-25% from-background to-background/70 px-2 pb-4"
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

                <div className="flex flex-col gap-2 pb-20">
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => {
                            const cells = row.getVisibleCells();
                            const drawdestinationCell = cells.find((cell) => cell.column.id === 'drawdestination');
                            const drawgiverCell = cells.find((cell) => cell.column.id === 'drawgiver');
                            const typeCell = cells.find((cell) => cell.column.id === 'type');
                            const requirementCell = cells.find((cell) => cell.column.id === 'requirement');
                            return (
                                <Card
                                    key={row.id}
                                    // grid grid-cols-${table.getVisibleFlatColumns().length} gap-2 p-2 items-center
                                    className={``}
                                >
                                    <CardHeader>
                                        {typeCell && (
                                            <CardTitle className="text-lg font-medium">
                                                {flexRender(typeCell.column.columnDef.cell, typeCell.getContext())}
                                            </CardTitle>
                                        )}
                                        {requirementCell && (
                                            <CardDescription>
                                                {flexRender(
                                                    requirementCell.column.columnDef.cell,
                                                    requirementCell.getContext()
                                                )}
                                            </CardDescription>
                                        )}
                                    </CardHeader>
                                    <CardFooter>
                                        <div className="flex justify-between w-full">
                                            {drawdestinationCell && (
                                                <div>
                                                    {flexRender(
                                                        drawdestinationCell.column.columnDef.cell,
                                                        drawdestinationCell.getContext()
                                                    )}
                                                </div>
                                            )}
                                            {drawgiverCell && (
                                                <div>
                                                    {flexRender(
                                                        drawgiverCell.column.columnDef.cell,
                                                        drawgiverCell.getContext()
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </CardFooter>
                                </Card>
                            );
                        })
                    ) : (
                        <Card>
                            <div className="h-24 text-center">No results.</div>
                        </Card>
                    )}
                </div>
            </div>

            <DataTablePagination table={table} />
        </div>
    );
}
