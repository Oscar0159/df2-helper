function generateGoalGrid(m: number, n: number): number[][] {
    const grid: number[][] = Array.from({ length: m }, (_, i) => Array.from({ length: n }, (_, j) => i * n + j + 1));
    grid[m - 1][n - 1] = 0;
    return grid;
}

function find(grid: number[][], value: number): [number, number] {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === value) {
                return [i, j];
            }
        }
    }
    return [-1, -1];
}

// return a new grid with the values at (i, j) and (ni, nj) swapped
const swap = (grid: number[][], i: number, j: number, ni: number, nj: number): number[][] => {
    const newGrid = grid.map((row) => row.slice());
    [newGrid[i][j], newGrid[ni][nj]] = [newGrid[ni][nj], newGrid[i][j]];
    return newGrid;
};

function manhattanDistance(x1: number, y1: number, x2: number, y2: number): number {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function manhattanMisplacedDistance(grid: number[][], goalGrid: number[][]): number {
    let distance = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 0) {
                continue;
            }
            const [gi, gj] = find(goalGrid, grid[i][j]);
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
];

const moveToDirection = (i: number, j: number, ni: number, nj: number): string => {
    if (ni === i - 1) return 'U';
    if (ni === i + 1) return 'D';
    if (nj === j - 1) return 'L';
    if (nj === j + 1) return 'R';
    return '';
};

// https://en.wikipedia.org/wiki/Iterative_deepening_A*
function idaStar(grid: number[][]): number[][] {
    const goalGrid = generateGoalGrid(grid.length, grid[0].length);
    let bound = manhattanMisplacedDistance(grid, goalGrid);
    const path: number[][] = [find(grid, 0)];
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

function idaSearch(grid: number[][], goalGrid: number[][], path: number[][], g: number, bound: number): number {
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
        if (path.length > 0) {
            const [pi, pj] = path[path.length - 1];
            if (ni === pi && nj === pj) {
                continue;
            }
        }

        // TODO: do not create a new grid for each move, instead swap the tiles in place but remember to swap back
        // but i think it's fine since the grid is small, more readable and easier to debug
        // swap the blank tile with the adjacent tile
        const newGrid = swap(grid, i, j, ni, nj);
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

function isSolvable(grid: number[][]): boolean {
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
        const [i, j] = find(grid, 0);
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
    const [i, j] = find(grid, 0);
    if ((m - i) % 2 === 0) {
        return inversions % 2 === 0;
    }
    return inversions % 2 === 1;
}

export function solve(grid: number[][]): { solution: string[]; hasSolution: boolean } {
    if (!isSolvable(grid)) {
        return { solution: [], hasSolution: false };
    }

    // the blank tile move path, ex. [[0, 0], [0, 1], [1, 1], [1, 0], [2, 0]]
    const path = idaStar(grid);

    // convert the path to a sequence of moves, ex. ["R", "D", "L", "D"]
    const solution: string[] = [];
    for (let _i = 1; _i < path.length; _i++) {
        const [i, j] = path[_i - 1];
        const [ni, nj] = path[_i];
        solution.push(moveToDirection(i, j, ni, nj));
    }

    return { solution: solution, hasSolution: true };
}
