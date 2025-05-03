'use client';

import { useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import SlidingPuzzle from './sliding-puzzle';
import { SlidingPuzzleHandle } from './sliding-puzzle';

export default function SlidingViewer() {
  const [m, setM] = useState(3);
  const [n, setN] = useState(3);

  const sliddingPuzzleRef = useRef<SlidingPuzzleHandle>(null);

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="flex items-center justify-around">
        <div className="relative">
          <Label htmlFor="m" className="absolute -translate-y-[150%]">
            Rows:
          </Label>
          <Input
            type="number"
            id="m"
            value={m}
            onChange={(e) => setM(Number(e.target.value))}
          />
        </div>
        <div className="relative">
          <Label htmlFor="n" className="absolute -translate-y-[150%]">
            Columns:
          </Label>
          <Input
            type="number"
            id="n"
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
          />
        </div>
        <Button onClick={sliddingPuzzleRef.current?.reset}>Reset</Button>
      </div>

      <SlidingPuzzle
        m={m}
        n={n}
        imageUrl="https://df2profiler.com/gamemap/map_background.png"
        ref={sliddingPuzzleRef}
      />
    </div>
  );
}
