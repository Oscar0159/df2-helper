'use client';

import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { HTMLMotionProps, motion } from 'motion/react';

export default function Sortable({
  id,
  children,
  ...props
}: { id: UniqueIdentifier } & Omit<HTMLMotionProps<'div'>, 'id'>) {
  const { attributes, listeners, setNodeRef, isDragging } = useSortable({ id });
  console.log('Sortable rendered with id:', id); // Log the ID of the sortable component

  return (
    <motion.div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
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
