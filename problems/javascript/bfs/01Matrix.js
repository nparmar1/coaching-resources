/* 
Multi-sourced BFS solution, passes on LeetCode 

Given an m x n binary matrix mat, return the distance of the nearest 0 for each cell.
The distance between two adjacent cells is 1.
*/

const { Queue } = require('../../../utils/queue');

const ZERO = 0;

const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
];

const getRowColString = ({ row, col }) => `${row}, ${col}`;

const isBound = (row, col, grid) => {
    const numRows = grid.length;
    const numCols = grid[0].length;

    const isRowBound = row >= 0 && row < numRows;
    const isColBound = col >= 0 && col < numCols;
    return isRowBound && isColBound;
};

const getChildren = (row, col, grid) => {
    const children = [];

    for (const direction of directions) {
        const [rowDir, colDir] = direction;

        const newRow = row + rowDir;
        const newCol = col + colDir;

        if (!isBound(newRow, newCol, grid) || grid[newRow][newCol] === ZERO) continue;

        children.push({ row: newRow, col: newCol });
    }

    return children;
};

const getZeroLocations = (grid) => {
    const numRows = grid.length;
    const numCols = grid[0].length;

    const zeroLocations = [];

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            if (grid[row][col] === ZERO) zeroLocations.push({ row, col });
        }
    }

    return zeroLocations;
};

const getZeroFilledGrid = (grid) => {
    const numRows = grid.length;
    const numCols = grid[0].length;

    const array = new Array(numRows);

    for (let row = 0; row < numRows; row++) {
        array[row] = new Array(numCols).fill(0);
    }

    return array;
};

const getDistanceFromZero = (grid) => {
    const zeroFilledGrid = getZeroFilledGrid(grid);
    const zeroLocations = getZeroLocations(grid);

    const queue = [];
    const visited = new Set();

    for (const zeroLocation of zeroLocations) {
        visited.add(getRowColString(zeroLocation));
        queue.push({ ...zeroLocation, distanceFromZero: 0 });
    }

    while (queue.length > 0) {
        // Remove row, col
        const { row, col, distanceFromZero } = queue.shift();

        // Process row, col
        zeroFilledGrid[row][col] = distanceFromZero;

        // Get children
        const children = getChildren(row, col, grid);
        for (const child of children) {
            if (visited.has(getRowColString(child))) continue;
            visited.add(getRowColString(child));

            queue.push({ ...child, distanceFromZero: distanceFromZero + 1 });
        }
    }

    return zeroFilledGrid;
};

const matrix = [
    [0, 0, 0],
    [0, 1, 0],
    [1, 1, 1],
];

console.log(`Your answer: ${getDistanceFromZero(matrix)}`);
console.log(
    `Correct answer: ${[
        [0, 0, 0],
        [0, 1, 0],
        [1, 2, 1],
    ]}`,
);
