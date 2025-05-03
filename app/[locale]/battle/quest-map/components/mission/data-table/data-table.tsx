'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
import { useState } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

import {
  ClearFilter,
  RequirementFilter,
  SelectedFilter,
  TypeFilter,
} from './filters';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  className,
  ...props
}: DataTableProps<TData, TValue> & React.ComponentProps<'div'>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  });

  console.log('rerender, columnFilters:', columnFilters);

  const parentRef = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 37, // Adjust this based on your row height
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();

  const paddingTop = virtualRows[0]?.start ?? 0;
  const paddingBottom = totalSize - (virtualRows.at(-1)?.end ?? 0);

  return (
    <div className="relative w-full">
      <div className="absolute flex w-full -translate-y-[150%] items-center justify-between gap-2">
        <ClearFilter table={table} />
        <TypeFilter column={table.getColumn('missionType')} />
        <SelectedFilter table={table} />
        <RequirementFilter
          column={table.getColumn('requirement')}
          className="w-full"
        />
      </div>
      <div
        ref={parentRef}
        className={cn(
          'aspect-[726/644] h-84 w-full overflow-x-auto rounded-sm backdrop-blur-sm sm:h-108 md:rounded-lg xl:h-auto',
          className,
        )}
        {...props}
      >
        <Table className="table-fixed">
          <TableHeader className="sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-muted transition-colors duration-300 hover:bg-muted"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={cn(
                      header.id === 'id' && 'w-10 sm:w-12',
                      header.id === 'missionType' && 'w-18 sm:w-36',
                      header.id === 'distSelect' && 'w-16 sm:w-20',
                      header.id === 'giverSelect' && 'w-16 sm:w-20',
                      header.column.columnDef.meta?.textAlign === 'center' &&
                        'text-center',
                    )}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {paddingTop > 0 && (
              <TableRow id="top">
                <TableCell
                  style={{ height: `${paddingTop}px` }}
                  colSpan={columns.length}
                />
              </TableRow>
            )}

            {virtualRows.map((virtualRow) => {
              const row = table.getRowModel().rows[virtualRow.index];
              return (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="truncate" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}

            {paddingBottom > 0 && (
              <TableRow id="bottom">
                <TableCell
                  style={{ height: `${paddingBottom}px` }}
                  colSpan={columns.length}
                />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
