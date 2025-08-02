'use client';

import { AnimatePresence, SVGMotionProps, motion } from 'motion/react';

import { Coord } from '../../schema/coord';

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
};

const lineVariants = {
  initial: { pathLength: 0 },
  animate: { pathLength: 1 },
};

export default function MapPath({
  coords,
  startCoord,
  fastTravel = false,
  ...props
}: {
  coords: Coord[];
  startCoord?: Coord;
  fastTravel?: boolean;
} & SVGMotionProps<SVGElement>) {
  // TODO: find path
  const pathCoords = coords;

  return (
    <motion.svg
      {...props}
      initial="initial"
      animate="animate"
      exit="initial"
      variants={containerVariants}
    >
      <AnimatePresence>
        {pathCoords.map((coord, i) => {
          if (i === pathCoords.length - 1) return null;
          const next = pathCoords[i + 1];
          return (
            <motion.line
              key={i}
              x1={`${(200 * coord.x - 100) / 60}%`}
              y1={`${(200 * coord.y - 100) / 36}%`}
              x2={`${(200 * next.x - 100) / 60}%`}
              y2={`${(200 * next.y - 100) / 36}%`}
              className="pointer-events-auto"
              variants={lineVariants}
            />
          );
        })}
      </AnimatePresence>
    </motion.svg>
  );
}
