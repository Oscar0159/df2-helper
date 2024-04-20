import { Table } from '@tanstack/react-table';
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DataTablePaginationProps<TData> {
    table: Table<TData>;
}

export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
    const t = useTranslations('MapDataTable');

    const pageSizeOptions = ['10', '20', '30', '40', '50', 'All'];

    return (
        <div className="flex items-center justify-between p-2">
            <p className="text-sm text-muted-foreground">
                {table.getFilteredRowModel().rows.length}{' '}
                {table.getFilteredRowModel().rows.length === 1 ? t('result') : t('results')}
            </p>
            <div className="flex items-center space-x-2">
                <Button
                    variant="outline"
                    className="hidden h-8 w-8 p-0 lg:flex"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ChevronsLeftIcon className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ChevronLeftIcon className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <ChevronRightIcon className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    className="hidden h-8 w-8 p-0 lg:flex"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    <ChevronsRightIcon className="h-4 w-4" />
                </Button>
            </div>
            <div className="flex items-center space-x-4 xl:space-x-8">
                <Select
                    value={
                        pageSizeOptions.includes(`${table.getState().pagination.pageSize}`)
                            ? `${table.getState().pagination.pageSize}`
                            : 'All'
                    }
                    onValueChange={(value) => {
                        table.setPageSize(value === 'All' ? table.getFilteredRowModel().rows.length : parseInt(value));
                    }}
                >
                    <SelectTrigger className="h-8">
                        <SelectValue placeholder={`${table.getState().pagination.pageSize}`} />
                    </SelectTrigger>
                    <SelectContent>
                        {pageSizeOptions.map((pageSize) => (
                            <SelectItem key={pageSize} value={pageSize}>
                                {pageSize}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <p className="shrink-0 text-sm">
                    {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
                </p>
            </div>
        </div>
    );
}
