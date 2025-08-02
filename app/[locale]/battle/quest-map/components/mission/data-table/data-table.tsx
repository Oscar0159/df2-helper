'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Header } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { AnimatePresence } from 'motion/react';
import { useRef } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

import { Mission } from '../../../schema/mission';

interface DataTableProps {
  columns: ColumnDef<Mission, unknown>[];
  data: Mission[];
}

export default function DataTable({
  columns,
  data,
  ...props
}: DataTableProps & React.ComponentProps<'div'>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const rowHeight = 37;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const allRows = table.getRowModel().rows;

  const rowVirtualizer = useVirtualizer({
    count: allRows.length,
    getScrollElement: () => scrollContainerRef.current,
    estimateSize: () => rowHeight, // Adjust this based on your row height
  });

  const virtualizedRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();

  const paddingTop = virtualizedRows.length > 0 ? virtualizedRows[0].start : 0;
  const paddingBottom =
    virtualizedRows.length > 0 ? totalSize - virtualizedRows.at(-1)!.end : 0;

  const isEmpty = virtualizedRows.length === 0;

  const getHeaderClassName = (header: Header<Mission, unknown>) => {
    return cn(
      header.id === 'id' && 'w-10 sm:w-12',
      header.id === 'missionType' && 'w-18 sm:w-36',
      header.id === 'distSelect' && 'w-16 sm:w-20',
      header.id === 'giverSelect' && 'w-16 sm:w-20',
      header.column.columnDef.meta?.textAlign === 'center' && 'text-center',
    );
  };

  return (
    <>
      <div ref={scrollContainerRef} {...props}>
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
                    className={getHeaderClassName(header)}
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
            {isEmpty ? (
              <TableRow
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                layout
              >
                <TableCell
                  colSpan={columns.length}
                  className="text-center text-muted-foreground"
                >
                  No Result.
                </TableCell>
              </TableRow>
            ) : (
              <>
                {paddingTop > 0 && (
                  <TableRow id="top">
                    <TableCell
                      style={{ height: `${paddingTop}px` }}
                      colSpan={columns.length}
                    />
                  </TableRow>
                )}

                <AnimatePresence initial={false}>
                  {virtualizedRows.map((virtualRow) => {
                    const row = allRows[virtualRow.index];
                    return (
                      <TableRow
                        key={row.original.id}
                        initial={{
                          opacity: 0,
                        }}
                        animate={{
                          opacity: 1,
                        }}
                        layout
                      >
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
                </AnimatePresence>

                {paddingBottom > 0 && (
                  <TableRow id="bottom">
                    <TableCell
                      style={{ height: `${paddingBottom}px` }}
                      colSpan={columns.length}
                    />
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </div>
      <span className="text-center text-sm text-muted-foreground bg-muted rounded-b-sm py-1">
        {`${data.length} row(s) mission`}
      </span>
    </>
  );
}
