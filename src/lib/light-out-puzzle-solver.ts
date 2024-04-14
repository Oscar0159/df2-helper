// https://mathworld.wolfram.com/LightsOutPuzzle.html

// generate light-out puzzle toggle system matrix
function generateToggle(m: number, n: number): boolean[][] {
    const toggle: boolean[][] = [];

    for (let i = 0; i < m * n; i++) {
        const row: boolean[] = new Array(m * n).fill(false);
        row[i] = true;
        if (i - n >= 0) row[i - n] = true;
        if (i + n < m * n) row[i + n] = true;
        if (i % n !== 0) row[i - 1] = true;
        if (i % n !== n - 1) row[i + 1] = true;
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
        let maxVal: boolean = M[i][j];
        for (let k = i + 1; k < m; k++) {
            if (M[k][j]) {
                maxVal = M[k][j];
                maxIndex = k;
            }
        }

        // swap rows
        [M[i], M[maxIndex]] = [M[maxIndex], M[i]];

        const aijn: boolean[] = M[i].slice(j);

        const col: boolean[] = M.map(row => row[j]); // make a copy otherwise M will be directly affected

        col[i] = false; // avoid xoring pivot row with itself

        const flip: boolean[][] = col.map(colVal => aijn.map(aijnVal => colVal && aijnVal));

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

export function solve(grid: boolean[][]): { solution: boolean[][], hasSolution: boolean } {
    const m = grid.length;
    const n = grid[0].length;
    const toggle = generateToggle(m, n);
    const augmented = toggle.map((row, i) => row.concat(grid.flat()[i])) // augmented matrix [toggle | puzzle]

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
            solution[Math.floor(i / n)][i % n] = (solution[Math.floor(i / n)][i % n] !== (U[i][j] && solution[Math.floor(j / n)][j % n]));
        }
    }

    return { solution, hasSolution: true };
}