'use client';

import { UniqueIdentifier, useDraggable } from '@dnd-kit/core';
import { HTMLMotionProps, motion } from 'motion/react';

export default function Draggable({
  id,
  children,
  ...props
}: { id: UniqueIdentifier } & Omit<HTMLMotionProps<'div'>, 'id'>) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
  });

  return (
    <motion.div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      data-dragging={isDragging}
      initial={{ scale: 1 }}
      animate={{
        scale: isDragging ? 1.1 : 1,
        zIndex: isDragging ? 10 : 0,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
