import React from 'react';
import { useCallback } from 'react';

import { Checkbox } from '@/components/ui/checkbox';

import { Mission } from '../../../schema/mission';
import { useMissionStore } from '../../../stores/use-mission-store';

type Role = 'dist' | 'giver';

export default function SelectCell({
  mission,
  role,
}: {
  mission: Mission;
  role: Role;
}) {
  const isSelected = useMissionStore(
    useCallback(
      (s) => s.selectedMissions[role].has(mission.id),
      [mission.id, role],
    ),
  );
  const setMissionSelection = useMissionStore((s) => s.setMissionSelection);

  const isDisabled =
    role === 'dist' ? mission.distCoord === null : mission.giverCoord === null;

  return (
    <Checkbox
      checked={isSelected}
      onCheckedChange={(checked) =>
        setMissionSelection(mission.id, role, !!checked)
      }
      disabled={isDisabled}
      className="disabled:hidden"
    />
  );
}
