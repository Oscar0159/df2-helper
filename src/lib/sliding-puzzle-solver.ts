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

const swap = (grid: number[][], i: number, j: number, ni: number, nj: number): number[][] => {
    const newGrid = grid.map(row => row.slice());
    [newGrid[i][j], newGrid[ni][nj]] = [newGrid[ni][nj], newGrid[i][j]];
    return newGrid;
}

function isSolvable(grid: number[][]): boolean {
    return false;
}

function manhattanDistance(grid: number[][], goalGrid: number[][]): number {
    return 0;
}

function idaStar(grid: number[][]): number[] {
    const goalGrid = generateGoalGrid(grid.length, grid[0].length);
    let bound = manhattanDistance(grid, goalGrid);
    const path: number[] = [];
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

function idaSearch(grid: number[][], goalGrid: number[][], path: number[], g: number, bound: number): number {
    const h = manhattanDistance(grid, generateGoalGrid(grid.length, grid[0].length));
    const f = g + h;
    if (f > bound) {
        return f;
    }
    if (grid.flat().toString() === goalGrid.flat().toString()) {
        return 0;
    }
    let min = Infinity;
    const [i, j] = find(grid, 0);
    for (const [ni, nj] of [[i - 1, j], [i + 1, j], [i, j - 1], [i, j + 1]]) {
        if (ni < 0 || ni >= grid.length || nj < 0 || nj >= grid[0].length) {
            continue;
        }
        const newGrid = swap(grid, i, j, ni, nj);
        const t = idaSearch(newGrid, goalGrid, path, g + 1, bound);
        if (t === 0) {
            path.push(newGrid[ni][nj]);
            return 0;
        }
        min = Math.min(min, t);
    }
    return min;
}

export function solve(grid: number[][]): { solution: number[], hasSolution: boolean } {
    if (!isSolvable(grid)) {
        return { solution: [], hasSolution: false };
    }
    
    const path = idaStar(grid);
    return { solution: path, hasSolution: true };
}