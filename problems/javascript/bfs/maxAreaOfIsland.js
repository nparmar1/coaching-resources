/*
You are given an m x n binary matrix grid. An island is a group of 1's (representing land) connected 4-directionally (horizontal or vertical.) 
You may assume all four edges of the grid are surrounded by water.

The area of an island is the number of cells with a value 1 in the island.

Return the maximum area of an island in grid. If there is no island, return 0.
*/

//    0  1  2  3  4  5  6  7  8  9  10 11 12
// 0 [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
// 1 [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
// 2 [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
// 3 [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
// 4 [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
// 5 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
// 6 [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
// 7 [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],

const { Queue } = require('../../../utils/queue');

const directions = [
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0],
];

const ISLAND = 1;
const WATER = 0;

const getRowColString = (row, col) => `${row}, ${col}`;

const isBound = (newRow, newCol, grid) => {
    const rowBound = grid.length;
    const colBound = grid[0].length;

    const isRowBound = newRow >= 0 && newRow < rowBound;
    const isColBound = newCol >= 0 && newCol < colBound;

    return isRowBound && isColBound;
};

const getChildren = (row, col, grid) => {
    const children = [];

    for (const direction of directions) {
        const [rowDir, colDir] = direction;

        const newRow = row + rowDir;
        const newCol = col + colDir;

        const isInBound = isBound(newRow, newCol, grid);
        if (!isInBound) continue;

        if (grid[newRow][newCol] === WATER) continue;

        children.push([newRow, newCol]);
    }
    return children;
};

const getIslandArea = (row, col, grid, visited) => {
    const queue = new Queue();
    const rowColString = getRowColString(row, col);

    visited.add(rowColString);
    queue.enqueue([row, col]);

    let areaOfIsland = 0;
    while (queue.size() > 0) {
        const [row, col] = queue.dequeue();

        // Process node
        areaOfIsland++;

        const children = getChildren(row, col, grid);
        for (const child of children) {
            const [rowChild, colChild] = child;

            const childRowColString = getRowColString(rowChild, colChild);
            if (visited.has(childRowColString)) continue;

            if (visited.add(childRowColString));
            queue.enqueue([rowChild, colChild]);
        }
    }
    return areaOfIsland;
};

const maxAreaOfIsland = (grid) => {
    if (grid.length === 0) return 0;
    const visited = new Set();
    let maxArea = 0;

    const rows = grid.length;
    const cols = grid[0].length;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const isIsland = grid[row][col] !== ISLAND;
            if (isIsland) continue;

            const rowColString = getRowColString(row, col);
            if (visited.has(rowColString)) continue;

            const currentMaxArea = getIslandArea(row, col, grid, visited);
            if (currentMaxArea > maxArea) maxArea = currentMaxArea;
        }
    }

    return maxArea;
};

const grid = [
    [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
];

console.log(`Your answer: ${maxAreaOfIsland(grid)}`);
console.log(`Correct answer: ${6}`);
