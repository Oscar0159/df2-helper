'use client';

import { AnimatePresence, SVGMotionProps, motion } from 'motion/react';

import { greedyNearestNeighborWith2Opt } from '../../lib/pathfinding';
import { Coord } from '../../schema/coord';
import { solveTSP } from '../../lib/tsp';

const containerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

const lineVariants = {
  initial: { pathLength: 0 },
  animate: { pathLength: 1 },
};

const circleVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export default function MapPath({
  coords,
  ...props
}: SVGMotionProps<SVGElement> & {
  coords: Coord[];
}) {
  // const path = greedyNearestNeighborWith2Opt(coords);
  const path = solveTSP(coords, []);

  return (
    <motion.svg
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      {...props}
    >
      <AnimatePresence>
        {path.map((from, i) => {
          const to = path[i + 1];
          if (!to) return null;

          return (
            <motion.line
              key={`line-${i}`}
              x1={`${(200 * from.x - 100) / 60}%`}
              y1={`${(200 * from.y - 100) / 36}%`}
              x2={`${(200 * to.x - 100) / 60}%`}
              y2={`${(200 * to.y - 100) / 36}%`}
              variants={lineVariants}
            />
          );
        })}
        {path.map((node, i) => (
          <motion.circle
            key={`circle-${i}`}
            cx={`${(200 * node.x - 100) / 60}%`}
            cy={`${(200 * node.y - 100) / 36}%`}
            r="5"
            variants={circleVariants}
          />
        ))}
      </AnimatePresence>
    </motion.svg>
  );
}
