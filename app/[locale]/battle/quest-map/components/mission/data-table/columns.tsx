'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Mission } from '../../../schema/mission';
import SelectCell from './select-cell';
import SelectHead from './select-head';

export const columns: ColumnDef<Mission>[] = [
  {
    id: 'id',
    header: 'ID',
    cell: ({ row }) => row.original.id,
    sortingFn: (rowA, rowB) => rowA.original.id.localeCompare(rowB.original.id),
  },
  {
    id: 'missionType',
    header: 'Type',
    cell: ({ row }) => row.original.type,
    filterFn: (row, columnId, filterValue) => {
      const mission = row.original;
      return mission.type === filterValue;
    },
  },
  {
    id: 'distSelect',
    header: ({ table }) => (
      <SelectHead table={table} role="dist" label="Dist" />
    ),
    cell: ({ row }) => <SelectCell mission={row.original} role="dist" />,
    meta: {
      textAlign: 'center',
    },
    filterFn: (row, columnId, filterValue: Set<string>) => {
      const mission = row.original;
      console.log(filterValue?.has(mission.id));
      return filterValue?.has(mission.id);
    },
  },
  {
    id: 'giverSelect',
    header: ({ table }) => (
      <SelectHead table={table} role="giver" label="Giver" />
    ),
    cell: ({ row }) => <SelectCell mission={row.original} role="giver" />,
    meta: {
      textAlign: 'center',
    },
    filterFn: (row, columnId, filterValue: Set<string>) => {
      const mission = row.original;
      console.log(filterValue?.has(mission.id));
      return filterValue?.has(mission.id);
    },
  },
  {
    id: 'requirement',
    header: 'Requirement',
    cell: ({ row }) => (
      <span title={row.original.requirement || ''}>
        {row.original.requirement}
      </span>
    ),
    filterFn: (row, columnId, filterValue) => {
      const mission = row.original;
      const requirement = mission.requirement?.toLowerCase();
      return requirement?.includes(filterValue.toLowerCase()) || false;
    },
  },
  // {
  //   id: 'isForever',
  //   header: 'Forever',
  //   cell: ({ row }) => <span>{row.original.isForever ? 'Yes' : 'No'}</span>,
  // },
  // {
  //   id: 'isDaily',
  //   header: 'Daily',
  //   cell: ({ row }) => <span>{row.original.isDaily ? 'Yes' : 'No'}</span>,
  // },
  // {
  //   id: 'distBuilding',
  //   header: 'Dist Building',
  //   cell: ({ row }) => <span title={row.original.distBuilding || ''}>{row.original.distBuilding}</span>,
  // },
  // {
  //   id: 'giverBuilding',
  //   header: 'Giver Building',
  //   cell: ({ row }) => <span title={row.original.giverBuilding || ''}>{row.original.giverBuilding}</span>,
  // },
];
