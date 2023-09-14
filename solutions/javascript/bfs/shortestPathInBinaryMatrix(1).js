/*
Given an n x n binary matrix grid, return the length of the shortest clear path in the matrix. If there is no clear path, return -1.

A clear path in a binary matrix is a path from the top-left cell (i.e., (0, 0)) to the bottom-right cell (i.e., (n - 1, n - 1)) such that:

All the visited cells of the path are 0.
All the adjacent cells of the path are 8-directionally connected (i.e., they are different and they share an edge or a corner).
The length of a clear path is the number of visited cells of this path.
*/

const { Queue } = require('../../../utils/queue');

const NO_CLEAR_PATH = -1;
const CLEAR = 0;

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

const getPositionString = (row, col) => {
    return `${row}, ${col}`;
};

const isInBounds = (grid, row, col) => {
    const numRows = grid.length;
    const numCols = grid[0].length;

    const rowInBounds = row >= 0 && row < numRows;
    const colInBounds = col >= 0 && col < numCols;

    return rowInBounds && colInBounds;
};

const getNeighbors = (row, col, grid) => {
    // A neighbor is...
    // 8-directionally connected cell that is in bounds AND is a 0

    const neighbors = [];

    // row = 0, col = 1

    for (const direction of directions) {
        // [-1,1]
        const [rowChange, colChange] = direction;

        const newRow = row + rowChange;
        const newCol = col + colChange;

        if (!isInBounds(grid, newRow, newCol)) continue;
        if (grid[newRow][newCol] !== CLEAR) continue;

        neighbors.push({
            row: newRow,
            col: newCol,
        });
    }

    // [{row:0, col:1}, {row:1,col:0}]

    return neighbors;
};

const shortestPathBinaryMatrix = (grid) => {
    // Validate that grid is not an empty array
    if (grid.length === 0) return NO_CLEAR_PATH;

    const targetRow = grid.length - 1;
    const targetCol = grid[0].length - 1;

    // Validate start and end positions
    const startPositionValue = grid[0][0];
    const targetPositionValue = grid[targetRow][targetCol];

    if (startPositionValue !== CLEAR || targetPositionValue !== CLEAR) return NO_CLEAR_PATH;

    const queue = new Queue();
    const visited = new Set();

    queue.enqueue({
        row: 0,
        col: 0,
        pathLengthSoFar: 1,
    });
    visited.add(getPositionString(0, 0));

    while (queue.size() > 0) {
        // Remove node
        const { row, col, pathLengthSoFar } = queue.dequeue();

        // Process node
        const isTarget = row === targetRow && col === targetCol;
        if (isTarget) return pathLengthSoFar;

        // Add neighbors
        const neighbors = getNeighbors(row, col, grid); // [{row:0, col:1}, {row:1,col:0}]
        for (const neighbor of neighbors) {
            const neighborRow = neighbor.row;
            const neighborCol = neighbor.col;

            const neighborPositionString = getPositionString(neighborRow, neighborCol);

            // Check if visited
            if (visited.has(neighborPositionString)) continue;

            // Add to visited
            visited.add(neighborPositionString);

            // Add to queue
            queue.enqueue({
                row: neighborRow,
                col: neighborCol,
                pathLengthSoFar: pathLengthSoFar + 1,
            });
        }
    }

    return NO_CLEAR_PATH;

    // Note: think about why this algorithm finds the SHORTEST path
};

const grid = [
    [0, 0, 0],
    [1, 1, 0],
    [1, 1, 0],
];

console.log();
console.log(`Your answer: ${shortestPathBinaryMatrix(grid)}`);
console.log(`Correct answer: ${4}`);
