import { Column } from '@tanstack/react-table';
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon, ChevronsUpDownIcon, EyeOffIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { cn } from '@/lib/utils';

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>;
    translationKey: string;
}

export function DataTableColumnHeader<TData, TValue>({
    column,
    translationKey,
    className,
}: DataTableColumnHeaderProps<TData, TValue>) {
    const t = useTranslations();

    if (!column.getCanSort()) {
        return <div className={cn(className)}>{t('MapDataTable.' + translationKey)}</div>;
    }

    return (
        <div className={cn('flex items-center space-x-2', className)}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="-ml-3 h-8 data-[state=open]:bg-accent">
                        <span>{t('MapDataTable.' + translationKey)}</span>
                        {column.getIsSorted() === 'desc' ? (
                            <ArrowDownIcon className="ml-2 h-4 w-4" />
                        ) : column.getIsSorted() === 'asc' ? (
                            <ArrowUpIcon className="ml-2 h-4 w-4" />
                        ) : (
                            <ChevronsUpDownIcon className="ml-2 h-4 w-4" />
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                        <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        {t('DataTable.sort-ascending')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                        <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        {t('DataTable.sort-descending')}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {column.getIsSorted() && (
                        <DropdownMenuItem onClick={() => column.clearSorting()}>
                            <ArrowUpDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                            {t('DataTable.clear-sorting')}
                        </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
                        <EyeOffIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        {t('DataTable.hide-column')}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
