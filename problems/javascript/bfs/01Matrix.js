/* 
Multi-sourced BFS solution, passes on LeetCode 

Given an m x n binary matrix mat, return the distance of the nearest 0 for each cell.
The distance between two adjacent cells is 1.
*/

const { Queue } = require('../../../utils/queue');

//    0  1  2
// 0 [0, 0, 0],
// 1 [0, 1, 0],
// 2 [1, 1, 1],

const directions = [
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0],
];

const getRowColString = (rowCol) => {
    const { row, col } = rowCol;

    return `${row}, ${col}`;
};

const getZeroFilledMatrix = (grid, fillWithValue) => {
    const numRows = grid.length;
    const numCols = grid[0].length;

    const array = new Array(numRows);
    for (let row = 0; row < numRows; row++) {
        array[row] = new Array(numCols).fill(fillWithValue);
    }

    return array;
};

const getZeroLocations = (grid) => {
    const locations = [];
    const numRows = grid.length;
    const numCols = grid[0].length;

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            if (grid[row][col] === 0) locations.push({ row, col });
        }
    }

    return locations;
};

const isInBound = (row, col, grid) => {
    const numRows = grid.length;
    const numCols = grid[0].length;

    const isRowInBound = row >= 0 && row < numRows;
    const isColInBound = col >= 0 && col < numCols;

    return isRowInBound && isColInBound;
};

const getChildren = (row, col, grid) => {
    const children = [];

    for (const direction of directions) {
        const [rowDir, colDir] = direction;

        const newRow = row + rowDir;
        const newCol = col + colDir;

        if (!isInBound(newRow, newCol, grid) || grid[newRow][newCol] === 0) continue;

        children.push({ row: newRow, col: newCol });
    }

    return children;
};

const getDistanceFromZero = (grid) => {
    const queue = new Queue();
    const visited = new Set();

    const zeroFilledGrid = getZeroFilledMatrix(grid, 0);
    const zeroLocations = getZeroLocations(grid);

    for (const zeroLocation of zeroLocations) {
        visited.add(getRowColString(zeroLocation));
        queue.enqueue({ ...zeroLocation, distanceFromZero: 0 });
    }

    while (queue.size() > 0) {
        // Remove row, col
        const { row, col, distanceFromZero } = queue.dequeue();

        // Process row, col
        if (grid[row][col] === 1) zeroFilledGrid[row][col] = distanceFromZero;

        // Get children
        const children = getChildren(row, col, grid);
        for (const child of children) {
            if (visited.has(getRowColString(child))) continue;

            visited.add(getRowColString(child));
            queue.enqueue({ ...child, distanceFromZero: distanceFromZero + 1 });
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
