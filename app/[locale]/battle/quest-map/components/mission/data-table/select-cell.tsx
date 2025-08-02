import React from 'react';
import { useShallow } from 'zustand/shallow';

import { Checkbox } from '@/components/ui/checkbox';

import { Mission } from '../../../schema/mission';
import { useMissionSelection } from '../../../stores/mission-selection';

type Role = 'dist' | 'giver';

function SelectCell({ mission, role }: { mission: Mission; role: Role }) {
  const { addSelectDist, addSelectGiver, removeSelectDist, removeSelectGiver } =
    useMissionSelection(
      useShallow((state) => ({
        addSelectDist: state.addSelectDist,
        addSelectGiver: state.addSelectGiver,
        removeSelectDist: state.removeSelectDist,
        removeSelectGiver: state.removeSelectGiver,
      })),
    );

  const checked = useMissionSelection((state) =>
    role === 'dist'
      ? state.isDistSelected(mission.id)
      : state.isGiverSelected(mission.id),
  );
  
  const isDisabled =
    role === 'dist' ? mission.distCoord === null : mission.giverCoord === null;

  const handelToggle = (checked: boolean) => {
    if (checked) {
      if (role === 'dist') {
        addSelectDist(mission.id);
      } else {
        addSelectGiver(mission.id);
      }
    } else {
      if (role === 'dist') {
        removeSelectDist(mission.id);
      } else {
        removeSelectGiver(mission.id);
      }
    }
  };

  return (
    <Checkbox
      checked={checked}
      onCheckedChange={handelToggle}
      disabled={isDisabled}
      className="disabled:hidden"
    />
  );
}

export default React.memo(SelectCell);
