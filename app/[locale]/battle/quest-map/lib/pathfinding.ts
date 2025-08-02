import { Coord } from '../schema/coord';

export function findPath(coords: Coord[]): Coord[] {
  // TODO: implement pathfinding algorithm
  return coords;
}

const INF = Number.MAX_SAFE_INTEGER;

/** 曼哈頓距離 */
function manhattan(a: Coord, b: Coord): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

/**
 * 找出拜訪所有任務點的最短路徑（含傳送點加速）
 * @param tasks 任務點座標
 * @param portals 傳送點座標
 * @returns 最短任務點拜訪順序（座標陣列）
 */
export function findShortestPath(tasks: Coord[], portals: Coord[]): Coord[] {
  const N = tasks.length;
  const M = portals.length;
  const total = N + M;
  const points: Coord[] = [...tasks, ...portals];

  // Step 1: 建構距離矩陣
  const dist: number[][] = Array.from({ length: total }, () =>
    Array(total).fill(INF),
  );

  for (let i = 0; i < total; i++) {
    for (let j = 0; j < total; j++) {
      if (i === j) dist[i][j] = 0;
      else if (i >= N && j >= N)
        dist[i][j] = 0; // 傳送點之間距離為0
      else dist[i][j] = manhattan(points[i], points[j]);
    }
  }

  // Step 2: Floyd-Warshall 計算任意兩點之間最短距離（包含傳送效果）
  for (let k = 0; k < total; k++) {
    for (let i = 0; i < total; i++) {
      for (let j = 0; j < total; j++) {
        dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
      }
    }
  }

  // Step 3: TSP over 任務點（bitmask DP + 路徑追蹤）
  const SIZE = 1 << N;
  const dp: number[][] = Array.from({ length: SIZE }, () => Array(N).fill(INF));
  const parent: number[][] = Array.from({ length: SIZE }, () =>
    Array(N).fill(-1),
  );

  for (let i = 0; i < N; i++) {
    dp[1 << i][i] = 0;
  }

  for (let mask = 0; mask < SIZE; mask++) {
    for (let u = 0; u < N; u++) {
      if ((mask & (1 << u)) === 0) continue;

      for (let v = 0; v < N; v++) {
        if ((mask & (1 << v)) !== 0) continue;

        const nextMask = mask | (1 << v);
        const cost = dist[u][v];
        if (dp[nextMask][v] > dp[mask][u] + cost) {
          dp[nextMask][v] = dp[mask][u] + cost;
          parent[nextMask][v] = u;
        }
      }
    }
  }

  // Step 4: 回溯最佳路徑
  const fullMask = SIZE - 1;
  let minCost = INF;
  let last = -1;
  for (let i = 0; i < N; i++) {
    if (dp[fullMask][i] < minCost) {
      minCost = dp[fullMask][i];
      last = i;
    }
  }

  const path: Coord[] = [];
  let mask = fullMask;
  while (last !== -1) {
    path.push(tasks[last]);
    const prev = parent[mask][last];
    mask = mask ^ (1 << last);
    last = prev;
  }

  path.reverse();
  return path;
}

export function greedyNearestNeighbor(coords: Coord[], start = 0): Coord[] {
  const N = coords.length;
  const visited = new Array(N).fill(false);
  const pathIndices = [start];
  visited[start] = true;

  for (let step = 1; step < N; step++) {
    const last = pathIndices[pathIndices.length - 1];
    let next = -1;
    let minDist = Infinity;

    for (let i = 0; i < N; i++) {
      if (!visited[i]) {
        const dist = manhattan(coords[last], coords[i]);
        if (dist < minDist) {
          minDist = dist;
          next = i;
        }
      }
    }

    pathIndices.push(next);
    visited[next] = true;
  }

  return pathIndices.map((i) => coords[i]);
}

function nearestNeighbor(coords: Coord[], start = 0): number[] {
  const N = coords.length;
  const visited = new Array(N).fill(false);
  const path = [start];
  visited[start] = true;

  for (let step = 1; step < N; step++) {
    const last = path[path.length - 1];
    let next = -1;
    let minDist = Infinity;

    for (let i = 0; i < N; i++) {
      if (!visited[i]) {
        const dist = manhattan(coords[last], coords[i]);
        if (dist < minDist) {
          minDist = dist;
          next = i;
        }
      }
    }

    path.push(next);
    visited[next] = true;
  }

  return path;
}

function twoOpt(path: Coord[]): Coord[] {
  const N = path.length;
  let improved = true;

  while (improved) {
    improved = false;
    for (let i = 1; i < N - 2; i++) {
      for (let k = i + 1; k < N - 1; k++) {
        const a = path[i - 1];
        const b = path[i];
        const c = path[k];
        const d = path[k + 1];

        const currentDist = manhattan(a, b) + manhattan(c, d);
        const swappedDist = manhattan(a, c) + manhattan(b, d);

        if (swappedDist < currentDist) {
          path = [
            ...path.slice(0, i),
            ...path.slice(i, k + 1).reverse(),
            ...path.slice(k + 1)
          ];
          improved = true;
        }
      }
    }
  }

  return path;
}

// function twoOpt(path: Coord[]): Coord[] {
//   let improved = true;

//   while (improved) {
//     improved = false;
//     for (let i = 1; i < path.length - 2; i++) {
//       for (let k = i + 1; k < path.length - 1; k++) {
//         const a = path[i - 1];
//         const b = path[i];
//         const c = path[k];
//         const d = path[k + 1];

//         const current = manhattan(a, b) + manhattan(c, d);
//         const swapped = manhattan(a, c) + manhattan(b, d);

//         if (swapped < current) {
//           const newPath = [
//             ...path.slice(0, i),
//             ...path.slice(i, k + 1).reverse(),
//             ...path.slice(k + 1)
//           ];
//           path = newPath;
//           improved = true;
//         }
//       }
//     }
//   }

//   return path;
// }

export function greedyNearestNeighborWith2Opt(coords: Coord[], start = 0): Coord[] {
  if (coords.length <= 2) return coords; // No need to optimize

  const pathIndices = nearestNeighbor(coords, start);
  const pathCoords = pathIndices.map(i => coords[i]);
  return twoOpt(pathCoords);
}

function findBestStep(from: Coord, to: Coord, portals: Coord[]): { cost: number, via: Coord[] } {
  const directCost = manhattan(from, to);
  let bestVia: Coord[] = [to];
  let minCost = directCost;

  for (const p1 of portals) {
    for (const p2 of portals) {
      const portalCost = manhattan(from, p1) + manhattan(p2, to); // no cost for teleport
      if (portalCost < minCost) {
        minCost = portalCost;
        bestVia = [p1, p2, to];
      }
    }
  }

  return { cost: minCost, via: bestVia };
}

export function greedyNearestNeighborWithPortals(coords: Coord[], portals: Coord[], start = 0): Coord[] {
  const N = coords.length;
  const visited = new Array(N).fill(false);
  const path: Coord[] = [];

  const currentIndex = start;
  let current = coords[currentIndex];
  visited[currentIndex] = true;
  path.push(current);

  for (let step = 1; step < N; step++) {
    let nextIndex = -1;
    let bestStep: { cost: number, via: Coord[] } = { cost: Infinity, via: [] };

    for (let i = 0; i < N; i++) {
      if (visited[i]) continue;
      const stepInfo = findBestStep(current, coords[i], portals);
      if (stepInfo.cost < bestStep.cost) {
        bestStep = stepInfo;
        nextIndex = i;
      }
    }

    visited[nextIndex] = true;
    path.push(...bestStep.via);
    current = coords[nextIndex];
  }

  return path;
}
