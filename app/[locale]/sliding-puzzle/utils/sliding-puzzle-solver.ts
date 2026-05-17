export type SlidingPuzzleGrid = number[][];
export type SlidingPuzzleDirection = "U" | "D" | "L" | "R";
export type SlidingPuzzleStepDirection = "up" | "down" | "left" | "right";

export type SlidingPuzzleSolutionStep = {
  index: number;
  tile: number;
  direction: SlidingPuzzleStepDirection;
};

export function createGoalGrid(rows: number, cols: number): SlidingPuzzleGrid {
  const grid: SlidingPuzzleGrid = Array.from({ length: rows }, (_, rowIndex) =>
    Array.from(
      { length: cols },
      (_, colIndex) => rowIndex * cols + colIndex + 1,
    ),
  );

  grid[rows - 1][cols - 1] = 0;
  return grid;
}

export function cloneGrid(grid: SlidingPuzzleGrid): SlidingPuzzleGrid {
  return grid.map((row) => row.slice());
}

export function findValue(
  grid: SlidingPuzzleGrid,
  value: number,
): [number, number] {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === value) {
        return [i, j];
      }
    }
  }
  return [-1, -1];
}

export function swapTiles(
  grid: SlidingPuzzleGrid,
  row: number,
  col: number,
  nextRow: number,
  nextCol: number,
): SlidingPuzzleGrid {
  const newGrid = cloneGrid(grid);
  [newGrid[row][col], newGrid[nextRow][nextCol]] = [
    newGrid[nextRow][nextCol],
    newGrid[row][col],
  ];
  return newGrid;
}

export function getAdjacentPositions(
  grid: SlidingPuzzleGrid,
  row: number,
  col: number,
): Array<readonly [number, number]> {
  return moves
    .map(
      ([rowOffset, colOffset]) => [row + rowOffset, col + colOffset] as const,
    )
    .filter(
      ([nextRow, nextCol]) =>
        nextRow >= 0 &&
        nextRow < grid.length &&
        nextCol >= 0 &&
        nextCol < grid[0].length,
    );
}

export function canSlideTile(
  grid: SlidingPuzzleGrid,
  row: number,
  col: number,
): boolean {
  const [blankRow, blankCol] = findValue(grid, 0);
  return Math.abs(blankRow - row) + Math.abs(blankCol - col) === 1;
}

export function slideTile(
  grid: SlidingPuzzleGrid,
  row: number,
  col: number,
): SlidingPuzzleGrid | null {
  if (!canSlideTile(grid, row, col)) {
    return null;
  }

  const [blankRow, blankCol] = findValue(grid, 0);
  return swapTiles(grid, row, col, blankRow, blankCol);
}

export function isSolved(grid: SlidingPuzzleGrid): boolean {
  const goal = createGoalGrid(grid.length, grid[0].length);
  return grid.every((row, rowIndex) =>
    row.every((value, colIndex) => value === goal[rowIndex][colIndex]),
  );
}

export function createShuffledGrid(
  rows: number,
  cols: number,
  iterations = rows * cols * 18,
): SlidingPuzzleGrid {
  let grid = createGoalGrid(rows, cols);
  let previousBlankKey: string | null = null;

  for (let index = 0; index < iterations; index++) {
    const [blankRow, blankCol] = findValue(grid, 0);
    const candidates = getAdjacentPositions(grid, blankRow, blankCol).filter(
      ([nextRow, nextCol]) => `${nextRow}-${nextCol}` !== previousBlankKey,
    );
    const pool = candidates.length
      ? candidates
      : getAdjacentPositions(grid, blankRow, blankCol);
    const [tileRow, tileCol] = pool[
      Math.floor(Math.random() * pool.length)
    ] ?? [blankRow, blankCol];

    previousBlankKey = `${blankRow}-${blankCol}`;
    grid = swapTiles(grid, blankRow, blankCol, tileRow, tileCol);
  }

  return grid;
}

function manhattanDistance(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): number {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function manhattanMisplacedDistance(
  grid: SlidingPuzzleGrid,
  goalGrid: SlidingPuzzleGrid,
): number {
  let distance = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 0) {
        continue;
      }
      const [gi, gj] = findValue(goalGrid, grid[i][j]);
      distance += manhattanDistance(i, j, gi, gj);
    }
  }
  return distance;
}

const moves = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
] as const;

const moveToDirection = (
  i: number,
  j: number,
  ni: number,
  nj: number,
): SlidingPuzzleDirection => {
  if (ni === i - 1) return "U";
  if (ni === i + 1) return "D";
  if (nj === j - 1) return "L";
  if (nj === j + 1) return "R";

  throw new Error("Invalid sliding puzzle direction");
};

function getTileDirection(
  direction: SlidingPuzzleDirection,
): SlidingPuzzleStepDirection {
  switch (direction) {
    case "U":
      return "down";
    case "D":
      return "up";
    case "L":
      return "right";
    case "R":
      return "left";
  }
}

function getNextBlankPosition(
  row: number,
  col: number,
  direction: SlidingPuzzleDirection,
): [number, number] {
  switch (direction) {
    case "U":
      return [row - 1, col];
    case "D":
      return [row + 1, col];
    case "L":
      return [row, col - 1];
    case "R":
      return [row, col + 1];
  }
}

// https://en.wikipedia.org/wiki/Iterative_deepening_A*
function idaStar(grid: SlidingPuzzleGrid): number[][] {
  const goalGrid = createGoalGrid(grid.length, grid[0].length);
  let bound = manhattanMisplacedDistance(grid, goalGrid);
  const path: number[][] = [findValue(grid, 0)];
  while (true) {
    const t = idaSearch(grid, goalGrid, path, 0, bound);
    if (t === 0) {
      return path;
    }
    if (t === Infinity) {
      return [];
    }
    bound = t;
  }
}

function idaSearch(
  grid: SlidingPuzzleGrid,
  goalGrid: SlidingPuzzleGrid,
  path: number[][],
  g: number,
  bound: number,
): number {
  // TODO: do not calculate the heuristic distance for each search, instead calculate it once and update it when swapping the tiles
  // but i think it's fine since the grid is small, more readable and easier to debug
  const h = manhattanMisplacedDistance(grid, goalGrid);
  const f = g + h;

  if (f > bound) return f;
  if (h === 0) return 0;

  let min = Infinity;
  const [i, j] = path[path.length - 1]; // blank tile position
  for (let k = 0; k < moves.length; k++) {
    // new position of the blank tile
    const ni = i + moves[k][0];
    const nj = j + moves[k][1];

    // out of bounds
    if (ni < 0 || ni >= grid.length || nj < 0 || nj >= grid[0].length) {
      continue;
    }

    // check if the move is the reverse of the previous move
    if (path.length > 1) {
      const [pi, pj] = path[path.length - 2];
      if (ni === pi && nj === pj) {
        continue;
      }
    }

    // TODO: do not create a new grid for each move, instead swap the tiles in place but remember to swap back
    // but i think it's fine since the grid is small, more readable and easier to debug
    // swap the blank tile with the adjacent tile
    const newGrid = swapTiles(grid, i, j, ni, nj);
    path.push([ni, nj]);
    const t = idaSearch(newGrid, goalGrid, path, g + 1, bound);
    if (t === 0) {
      return 0;
    }
    min = Math.min(min, t);

    // remove the move
    path.pop();
  }
  return min;
}

export function isSolvable(grid: SlidingPuzzleGrid): boolean {
  const m = grid.length;
  const n = grid[0].length;

  let inversions = 0;
  const flatGrid = grid.flat();
  for (let i = 0; i < flatGrid.length; i++) {
    for (let j = i + 1; j < flatGrid.length; j++) {
      if (flatGrid[i] === 0 || flatGrid[j] === 0) {
        continue;
      }
      if (flatGrid[i] > flatGrid[j]) {
        inversions++;
      }
    }
  }

  // MN puzzle
  // https://www.cs.mcgill.ca/~newborn/nxp_puzzleOct9.htm
  if (m !== n) {
    // Odd column width
    if (n % 2 === 1) return inversions % 2 === 0;

    // Even column & row width
    const [i] = findValue(grid, 0);
    if (m % 2 === 0 && n % 2 === 0) {
      return (inversions + i + 1) % 2 === 0;
    }

    // Even column & odd row width
    return (inversions + i + 1) % 2 === 1;
  }

  // N puzzle
  // Odd column width
  if (n % 2 === 1) return inversions % 2 === 0;

  // Even column width
  const [i] = findValue(grid, 0);
  if ((m - i) % 2 === 0) {
    return inversions % 2 === 0;
  }
  return inversions % 2 === 1;
}

export function solve(grid: SlidingPuzzleGrid): {
  solution: SlidingPuzzleDirection[];
  hasSolution: boolean;
} {
  if (!isSolvable(grid)) {
    return { solution: [], hasSolution: false };
  }

  // the blank tile move path, ex. [[0, 0], [0, 1], [1, 1], [1, 0], [2, 0]]
  const path = idaStar(grid);

  // convert the path to a sequence of moves, ex. ["R", "D", "L", "D"]
  const solution: SlidingPuzzleDirection[] = [];
  for (let _i = 1; _i < path.length; _i++) {
    const [i, j] = path[_i - 1];
    const [ni, nj] = path[_i];
    solution.push(moveToDirection(i, j, ni, nj));
  }

  return { solution, hasSolution: true };
}

export function getSolutionDetails(grid: SlidingPuzzleGrid): {
  hasSolution: boolean;
  solution: SlidingPuzzleDirection[];
  steps: SlidingPuzzleSolutionStep[];
} {
  const { solution, hasSolution } = solve(grid);

  if (!hasSolution) {
    return {
      hasSolution: false,
      solution: [],
      steps: [],
    };
  }

  const steps: SlidingPuzzleSolutionStep[] = [];
  let workingGrid = cloneGrid(grid);

  for (const [index, direction] of solution.entries()) {
    const [blankRow, blankCol] = findValue(workingGrid, 0);
    const [tileRow, tileCol] = getNextBlankPosition(
      blankRow,
      blankCol,
      direction,
    );
    const tile = workingGrid[tileRow][tileCol];

    steps.push({
      index: index + 1,
      tile,
      direction: getTileDirection(direction),
    });

    workingGrid = swapTiles(workingGrid, blankRow, blankCol, tileRow, tileCol);
  }

  return {
    hasSolution: true,
    solution,
    steps,
  };
}
