/*
Given an n x n binary matrix grid, return the length of the shortest clear path in the matrix. If there is no clear path, return -1.

A clear path in a binary matrix is a path from the top-left cell (i.e., (0, 0)) to the bottom-right cell (i.e., (n - 1, n - 1)) such that:

All the visited cells of the path are 0.
All the adjacent cells of the path are 8-directionally connected (i.e., they are different and they share an edge or a corner).
The length of a clear path is the number of visited cells of this path.
*/

const { Queue } = require('../../../utils/queue');
const PATH = 0;
const NO_CLEAR_PATH = -1;

/*

   0  1  2 
0 [0, 0, 0],
1 [1, 1, 0],
2 [1, 1, 0],

*/

const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
];

const isInBound = (grid, newRow, newCol) => {
    const rowBound = grid.length;
    const colBound = grid[0].length;

    const isRowBound = newRow >= 0 && newRow < rowBound;
    const isColBound = newCol >= 0 && newCol < colBound;

    return isRowBound && isColBound;
};

const getNeighbors = (grid, row, col) => {
    const neighbors = [];

    for (const direction of directions) {
        const [rowDir, colDir] = direction;

        const newRow = row + rowDir;
        const newCol = col + colDir;

        const isBound = isInBound(grid, newRow, newCol);

        if (!isBound || grid[newRow][newCol] !== PATH) continue;
        neighbors.push({ row: newRow, col: newCol });
    }

    return neighbors;
};

const getRowColString = (row, col) => {
    return `${row}, ${col}`;
};

const shortestPathBinaryMatrix = (grid) => {
    if (grid[0].length === 0) return [];

    if (grid[0][0] !== PATH || grid[grid.length - 1][grid[0].length - 1] !== PATH) {
        return NO_CLEAR_PATH;
    }

    const queue = new Queue();
    const visited = new Set();

    const initialRowColString = getRowColString(0, 0);
    visited.add(initialRowColString);

    queue.enqueue({ row: 0, col: 0, pathSoFar: 1 });

    while (queue.size() > 0) {
        const { row, col, pathSoFar } = queue.dequeue();

        const targetRow = grid.length - 1;
        const targetCol = grid[0].length - 1;

        if (row === targetRow && col === targetCol) return pathSoFar;

        // Process node
        const neighbors = getNeighbors(grid, row, col);
        for (const neighbor of neighbors) {
            const { row, col } = neighbor;

            const neighborRolColString = getRowColString(row, col);
            if (visited.has(neighborRolColString)) continue;

            visited.add(neighborRolColString);
            queue.enqueue({ row: row, col: col, pathSoFar: pathSoFar + 1 });
        }
    }

    return NO_CLEAR_PATH;
};

const grid = [
    [0, 0, 0],
    [1, 1, 0],
    [1, 1, 0],
];

console.log(`Your answer: ${shortestPathBinaryMatrix(grid)}`);
console.log(`Correct answer: ${4}`);
