'use client';

import { createContext, useContext } from 'react';

import { Mission } from '../../schema/mission';

const MissionContext = createContext<Mission[] | undefined>(undefined);

export function MissionProvider({
  missions,
  children,
}: {
  missions: Mission[];
  children: React.ReactNode;
}) {
  return (
    <MissionContext.Provider value={missions}>
      {children}
    </MissionContext.Provider>
  );
}

export function useMissions() {
  const context = useContext(MissionContext);
  if (!context) {
    throw new Error('useMissions must be used within a MissionProvider');
  }
  return context;
}
