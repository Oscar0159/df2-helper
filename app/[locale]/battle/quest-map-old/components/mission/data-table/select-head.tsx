'use client';

import { Table } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

import { Mission } from '../../../schema/mission';
import { useMissionStore } from '../../../stores/use-mission-store';

type Role = 'dist' | 'giver';

export default function SelectHead({
  table,
  role,
  label,
}: {
  table: Table<Mission>;
  role: Role;
  label: string;
}) {
  const selectedMissions = useMissionStore((s) => s.selectedMissions);
  const setMissionSelection = useMissionStore((s) => s.setMissionSelection);

  const visibleMissions = table.getRowModel().rows.map((row) => row.original);

  const allSelected = visibleMissions.every(
    (m) =>
      (role === 'dist' ? m.distCoord === null : m.giverCoord === null) ||
      selectedMissions[role].has(m.id),
  );
  const someSelected =
    !allSelected &&
    visibleMissions.some((m) => selectedMissions[role].has(m.id));
  const someHaveSelected =
    role === 'dist'
      ? visibleMissions.some((m) => m.distCoord !== null)
      : visibleMissions.some((m) => m.giverCoord !== null);

  const handleToggleAll = (checked: boolean) => {
    visibleMissions.forEach((mission) => {
      const canCheck =
        role === 'dist'
          ? mission.distCoord !== null
          : mission.giverCoord !== null;
      if (canCheck) {
        setMissionSelection(mission.id, role, checked);
      }
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id={`select-all-${role}`}
        disabled={!visibleMissions.length || !someHaveSelected}
        checked={allSelected ? true : someSelected ? 'indeterminate' : false}
        onCheckedChange={(val) => handleToggleAll(!!val)}
      />
      <Label htmlFor={`select-all-${role}`}>{label}</Label>
    </div>
  );
}
