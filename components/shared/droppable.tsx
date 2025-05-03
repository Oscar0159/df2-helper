'use client';

import { UniqueIdentifier, useDroppable } from '@dnd-kit/core';
import { HTMLMotionProps, motion } from 'motion/react';

export default function Droppable({
  id,
  children,
  ...props
}: { id: UniqueIdentifier } & Omit<HTMLMotionProps<'div'>, 'id'>) {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <motion.div
      ref={setNodeRef}
      data-over={isOver}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
