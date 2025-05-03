'use client';

import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import Image from 'next/image';
import { useEffect, useId, useImperativeHandle, useRef, useState } from 'react';

import Draggable from '@/components/shared/draggable';
import Droppable from '@/components/shared/droppable';

export type SlidingPuzzleHandle = {
  reset: () => void;
};

export default function SlidingPuzzle({
  m,
  n,
  imageUrl,
  showIndex = true,
  ref,
}: {
  m: number;
  n: number;
  imageUrl: string;
  showIndex?: boolean;
  ref?: React.Ref<SlidingPuzzleHandle>;
}) {
  const [items, setItems] = useState<number[]>([]);

  const dimensionsRef = useRef({ m, n });
  const pointerDownRef = useRef<{ x: number; y: number; item: number } | null>(
    null,
  );

  //  https://github.com/clauderic/dnd-kit/issues/926#issuecomment-1640115665
  const id = useId();

  useImperativeHandle(ref, () => ({
    reset: () => {
      const { m, n } = dimensionsRef.current;
      setItems(Array.from({ length: m * n }, (_, i) => i + 1));
    },
  }));

  useEffect(() => {
    dimensionsRef.current = { m, n };
    const newItems = Array.from({ length: m * n }, (_, i) => i + 1);
    setItems(newItems);
  }, [m, n]);

  const handleSwap = (fromIndex: number, toIndex: number) => {
    const newItems = [...items];
    [newItems[fromIndex], newItems[toIndex]] = [
      newItems[toIndex],
      newItems[fromIndex],
    ];
    setItems(newItems);
  };

  const onPointerDown = (x: number, y: number, item: number) => {
    pointerDownRef.current = {
      x,
      y,
      item,
    };
  };

  const onPointerUp = (x: number, y: number, item: number) => {
    const down = pointerDownRef.current;
    pointerDownRef.current = null;
    if (!down) return;
    if (down.item !== item) return;
    const dx = Math.abs(x - down.x);
    const dy = Math.abs(y - down.y);
    if (dx > 10 || dy > 10) return;

    const fromIndex = items.findIndex((i) => i === item);
    const toIndex = items.findIndex((i) => i === m * n);

    if (
      toIndex !== fromIndex + 1 &&
      toIndex !== fromIndex - 1 &&
      toIndex !== fromIndex + n &&
      toIndex !== fromIndex - n
    )
      return;

    console.log('onPointerUp fromIndex:', fromIndex);
    console.log('onPointerUp toIndex:', toIndex);
    handleSwap(fromIndex, toIndex);
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const fromIndex = items.findIndex((item) => item === active.id);
    const toIndex = items.findIndex((item) => item === over.id);

    console.log('onDragEnd fromIndex:', fromIndex);
    console.log('onDragEnd toIndex:', toIndex);

    handleSwap(fromIndex, toIndex);
  };

  return (
    <DndContext
      id={id}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${m}, minmax(0, 1fr))`,
        }}
      >
        {items.map((item) => {
          const isLastItem = item === m * n;
          const row = Math.floor((item - 1) / n);
          const col = (item - 1) % n;

          return (
            <Droppable
              key={item}
              id={item}
              className="rounded-md transition-colors duration-300 data-[over=true]:bg-foreground/30"
            >
              {isLastItem ? (
                <></>
              ) : (
                <Draggable
                  drag
                  dragSnapToOrigin
                  layout
                  //   TODO: onPointerEvent will overwrite dnd kit's listener
                  onPointerDown={(e) => {
                    onPointerDown(e.clientX, e.clientY, item);
                  }}
                  onPointerUp={(e) => {
                    onPointerUp(e.clientX, e.clientY, item);
                  }}
                  id={item}
                  className="relative aspect-square w-36 cursor-grab overflow-hidden rounded-md ring-1 active:cursor-grabbing"
                >
                  {showIndex && (
                    <span className="absolute bottom-2 left-2 z-1 text-2xl font-bold text-white mix-blend-difference">
                      {item}
                    </span>
                  )}
                  <Image
                    src={imageUrl}
                    alt={`part ${item}`}
                    fill
                    className="pointer-events-none"
                    objectFit="none"
                    objectPosition={`${(col * 100) / (n - 1 || 1)}% ${(row * 100) / (m - 1 || 1)}%`}
                  />
                </Draggable>
              )}
            </Droppable>
          );
        })}
      </div>
    </DndContext>
  );
}
