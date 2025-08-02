import { Coord } from '../schema/coord';

// === Manhattan Distance ===
function dist(a: Coord, b: Coord): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

// === Convex Hull using Graham Scan ===
function convexHull(points: Coord[]): Coord[] {
  if (points.length < 3) return [...points];
  const sorted = [...points].sort((a, b) =>
    a.x === b.x ? a.y - b.y : a.x - b.x,
  );
  const cross = (o: Coord, a: Coord, b: Coord): number =>
    (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);

  const lower: Coord[] = [];
  for (const p of sorted) {
    while (
      lower.length >= 2 &&
      cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0
    )
      lower.pop();
    lower.push(p);
  }

  const upper: Coord[] = [];
  for (let i = sorted.length - 1; i >= 0; i--) {
    const p = sorted[i];
    while (
      upper.length >= 2 &&
      cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0
    )
      upper.pop();
    upper.push(p);
  }

  upper.pop();
  lower.pop();
  return lower.concat(upper);
}

// === Convex Hull Insertion Heuristic ===
function convexHullInsertion(coords: Coord[]): Coord[] {
  const hull = convexHull(coords);
  const path = [...hull, hull[0]];

  const hullSet = new Set(hull.map((p) => p.x + ',' + p.y));
  const remaining = coords.filter((p) => !hullSet.has(p.x + ',' + p.y));

  while (remaining.length) {
    let bestPoint: Coord | null = null;
    let bestIndex = -1;
    let minIncrease = Infinity;

    for (let i = 0; i < path.length - 1; i++) {
      for (const p of remaining) {
        const increase =
          dist(path[i], p) + dist(p, path[i + 1]) - dist(path[i], path[i + 1]);
        if (increase < minIncrease) {
          minIncrease = increase;
          bestPoint = p;
          bestIndex = i + 1;
        }
      }
    }

    if (bestPoint) {
      path.splice(bestIndex, 0, bestPoint);
      const idx = remaining.findIndex(
        (p) => p.x === bestPoint!.x && p.y === bestPoint!.y,
      );
      remaining.splice(idx, 1);
    }
  }

  return path;
}

// === 2-Opt Improvement ===
function twoOpt(path: Coord[]): Coord[] {
  let improved = true;
  while (improved) {
    improved = false;
    for (let i = 1; i < path.length - 2; i++) {
      for (let j = i + 1; j < path.length - 1; j++) {
        const delta =
          dist(path[i - 1], path[j]) +
          dist(path[i], path[j + 1]) -
          dist(path[i - 1], path[i]) -
          dist(path[j], path[j + 1]);
        if (delta < 0) {
          const reversed = path.slice(i, j + 1).reverse();
          path.splice(i, j - i + 1, ...reversed);
          improved = true;
        }
      }
    }
  }
  return path;
}

// === Insert portals into minimal-cost position ===
function insertPortals(path: Coord[], portals: Coord[]): Coord[] {
  for (const portal of portals) {
    let bestIndex = 0;
    let minIncrease = Infinity;

    for (let i = 0; i < path.length - 1; i++) {
      const increase = 0 + 0 - dist(path[i], path[i + 1]); // portals have 0 cost
      if (increase < minIncrease) {
        minIncrease = increase;
        bestIndex = i + 1;
      }
    }

    path.splice(bestIndex, 0, portal);
  }

  return path;
}

// === Final Solver ===
export function solveTSP(coords: Coord[], portals: Coord[] = []): Coord[] {
  const coordsSet = new Set(portals.map((p) => p.x + ',' + p.y));
  const mainPoints = coords.filter((p) => !coordsSet.has(p.x + ',' + p.y));
  if (mainPoints.length < 3) return coords;

  let path = convexHullInsertion(mainPoints);
  path = twoOpt(path);
  path = insertPortals(path, portals);
  return path;
}
