// https://mathworld.wolfram.com/LightsOutPuzzle.html

export type LightsOutGrid = boolean[][];

// generate light-out puzzle toggle system matrix
function generateToggleMatrix(rows: number, cols: number): boolean[][] {
  const toggle: boolean[][] = [];

  for (let i = 0; i < rows * cols; i++) {
    const row: boolean[] = new Array(rows * cols).fill(false);
    row[i] = true;
    if (i - cols >= 0) row[i - cols] = true;
    if (i + cols < rows * cols) row[i + cols] = true;
    if (i % cols !== 0) row[i - 1] = true;
    if (i % cols !== cols - 1) row[i + 1] = true;
    toggle.push(row);
  }

  return toggle;
}

// https://gist.github.com/popcornell/bc29d1b7ba37d824335ab7b6280f7fec
// gauss elimination over GF(2)
function gf2elim(M: boolean[][]): boolean[][] {
  const m: number = M.length;
  const n: number = M[0].length;

  let i: number = 0;
  let j: number = 0;

  while (i < m && j < n) {
    // find value and index of largest element in remainder of column j
    let maxIndex: number = i;
    for (let k = i + 1; k < m; k++) {
      if (M[k][j]) {
        maxIndex = k;
      }
    }

    // swap rows
    [M[i], M[maxIndex]] = [M[maxIndex], M[i]];

    const aijn: boolean[] = M[i].slice(j);

    const col: boolean[] = M.map((row) => row[j]); // make a copy otherwise M will be directly affected

    col[i] = false; // avoid xoring pivot row with itself

    const flip: boolean[][] = col.map((colVal) => aijn.map((aijnVal) => colVal && aijnVal));

    for (let row = 0; row < M.length; row++) {
      for (let colIdx = j; colIdx < M[row].length; colIdx++) {
        M[row][colIdx] = M[row][colIdx] !== flip[row][colIdx - j];
      }
    }

    i++;
    j++;
  }

  return M;
}

export function createGrid(rows: number, cols: number, value = false): LightsOutGrid {
  return Array.from({ length: rows }, () => Array(cols).fill(value));
}

export function resizeGrid(grid: LightsOutGrid, rows: number, cols: number): LightsOutGrid {
  return Array.from({ length: rows }, (_, rowIndex) =>
    Array.from({ length: cols }, (_, colIndex) => grid[rowIndex]?.[colIndex] ?? false),
  );
}

export function mapGrid(
  grid: LightsOutGrid,
  mapper: (value: boolean, rowIndex: number, colIndex: number) => boolean,
): LightsOutGrid {
  return grid.map((row, rowIndex) =>
    row.map((value, colIndex) => mapper(value, rowIndex, colIndex)),
  );
}

export function invertGrid(grid: LightsOutGrid): LightsOutGrid {
  return mapGrid(grid, (value) => !value);
}

export function fillGrid(grid: LightsOutGrid, value: boolean): LightsOutGrid {
  return mapGrid(grid, () => value);
}

export function createRandomGrid(grid: LightsOutGrid): LightsOutGrid {
  return mapGrid(grid, () => Math.random() >= 0.5);
}

export function toggleCrossCell(
  grid: LightsOutGrid,
  rowIndex: number,
  colIndex: number,
): LightsOutGrid {
  return mapGrid(grid, (value, currentRow, currentCol) => {
    const isSameCell = currentRow === rowIndex && currentCol === colIndex;
    const isVerticalNeighbor = currentCol === colIndex && Math.abs(currentRow - rowIndex) === 1;
    const isHorizontalNeighbor = currentRow === rowIndex && Math.abs(currentCol - colIndex) === 1;

    return isSameCell || isVerticalNeighbor || isHorizontalNeighbor ? !value : value;
  });
}

export function toggleSingleCell(
  grid: LightsOutGrid,
  rowIndex: number,
  colIndex: number,
): LightsOutGrid {
  return mapGrid(grid, (value, currentRow, currentCol) =>
    currentRow === rowIndex && currentCol === colIndex ? !value : value,
  );
}

export function getSolutionSteps(solution: LightsOutGrid): Array<{
  row: number;
  col: number;
  index: number;
}> {
  const steps: Array<{ row: number; col: number; index: number }> = [];

  for (let row = 0; row < solution.length; row++) {
    for (let col = 0; col < solution[row].length; col++) {
      if (solution[row][col]) {
        steps.push({ row, col, index: steps.length + 1 });
      }
    }
  }

  return steps;
}

export function solve(grid: LightsOutGrid): {
  solution: LightsOutGrid;
  hasSolution: boolean;
} {
  const m = grid.length;
  const n = grid[0].length;
  const toggle = generateToggleMatrix(m, n);
  const augmented = toggle.map((row, i) => row.concat(grid.flat()[i])); // augmented matrix [toggle | puzzle]

  const U = gf2elim(augmented);

  const solution = Array.from({ length: m }, () => Array(n).fill(false));
  for (let i = m * n - 1; i >= 0; i--) {
    let pivot = -1;
    for (let j = 0; j < m * n; j++) {
      if (U[i][j]) {
        pivot = j;
        break;
      }
    }

    if (pivot === -1) {
      if (U[i][m * n]) {
        return { solution, hasSolution: false };
      }
    }

    solution[Math.floor(i / n)][i % n] = U[i][m * n];
    for (let j = pivot + 1; j < m * n; j++) {
      solution[Math.floor(i / n)][i % n] =
        solution[Math.floor(i / n)][i % n] !== (U[i][j] && solution[Math.floor(j / n)][j % n]);
    }
  }

  return { solution, hasSolution: true };
}
