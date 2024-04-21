import { Table } from '@tanstack/react-table';
import { XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { DataTableViewOptions } from './data-table-view-options';

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
    const t = useTranslations();

    const isFiltered = table.getState().columnFilters.length > 0;

    const scrapCashTypes = [
        {
            value: t('ScrapCashItemType.Pistol'),
            label: t('ScrapCashItemType.Pistol'),
        },
        {
            value: t('ScrapCashItemType.Rifle'),
            label: t('ScrapCashItemType.Rifle'),
        },
        {
            value: t('ScrapCashItemType.Shotgun'),
            label: t('ScrapCashItemType.Shotgun'),
        },
        {
            value: t('ScrapCashItemType.Submachine Gun'),
            label: t('ScrapCashItemType.Submachine Gun'),
        },
        {
            value: t('ScrapCashItemType.Assault Rifle'),
            label: t('ScrapCashItemType.Assault Rifle'),
        },
        {
            value: t('ScrapCashItemType.Melee'),
            label: t('ScrapCashItemType.Melee'),
        },
        {
            value: t('ScrapCashItemType.Chainsaw'),
            label: t('ScrapCashItemType.Chainsaw'),
        },
        {
            value: t('ScrapCashItemType.Armour'),
            label: t('ScrapCashItemType.Armour'),
        },
        {
            value: t('ScrapCashItemType.Head'),
            label: t('ScrapCashItemType.Head'),
        },
        {
            value: t('ScrapCashItemType.Body'),
            label: t('ScrapCashItemType.Body'),
        },
        {
            value: t('ScrapCashItemType.Legs'),
            label: t('ScrapCashItemType.Legs'),
        },
        {
            value: t('ScrapCashItemType.Hands'),
            label: t('ScrapCashItemType.Hands'),
        },
        {
            value: t('ScrapCashItemType.Feet'),
            label: t('ScrapCashItemType.Feet'),
        },
    ];

    return (
        <div className="flex flex-col justify-center gap-4">
            <div className="flex items-center space-x-2 justify-between">
                <Input
                    placeholder={t('ScrapCashDataTable.filter-name')}
                    value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
                />
                <DataTableViewOptions table={table} />
            </div>
            <div className="flex items-center space-x-2">
                {table.getColumn('type') && (
                    <DataTableFacetedFilter
                        column={table.getColumn('type')}
                        title={t('ScrapCashDataTable.filter-type')}
                        options={scrapCashTypes}
                    />
                )}
                {isFiltered && (
                    <Button variant="default" onClick={() => table.resetColumnFilters()} className="px-2 lg:px-3">
                        {t('DataTable.clear-filters')}
                        <XIcon className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
        </div>
    );
}
