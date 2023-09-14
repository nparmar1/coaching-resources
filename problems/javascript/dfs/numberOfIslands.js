/*
Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. 
You may assume all four edges of the grid are all surrounded by water.
*/

//     0    1    2    3    4
// 0 ['1', '1', '0', '0', '0'],
// 1 ['1', '1', '0', '0', '0'],
// 2 ['0', '0', '1', '0', '0'],
// 3 ['0', '0', '0', '1', '1'],

const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
];

const WATER = '0';

const getRowColString = (row, col) => `${row}, ${col}`;

const isInBound = (row, col, grid) => {
    const numRows = grid.length;
    const numCols = grid[0].length;

    const isRowBound = row >= 0 && row < numRows;
    const isColBound = col >= 0 && col < numCols;

    return isRowBound && isColBound;
};

const getChildren = (row, col, grid, visited) => {
    const children = [];

    for (const [rowDir, colDir] of directions) {
        const newRow = row + rowDir;
        const newCol = col + colDir;

        if (!isInBound(newRow, newCol, grid)) continue;
        if (grid[newRow][newCol] === WATER) continue;

        children.push([newRow, newCol]);
    }

    return children;
};

const markAsVisited = (row, col, grid, visited) => {
    // Base case
    if (visited.has(getRowColString(row, col))) return;

    // Process node
    visited.add(getRowColString(row, col));

    // Get children
    const children = getChildren(row, col, grid, visited);
    for (const [rowChild, colChild] of children) {
        if (visited.has(getRowColString(rowChild, colChild))) continue;

        markAsVisited(rowChild, colChild, grid, visited);
    }
};

const getNumIslands = (grid) => {
    const numRows = grid.length;
    const numCols = grid[0].length;
    const visited = new Set();

    let numIsland = 0;

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            if (visited.has(getRowColString(row, col))) continue;
            if (grid[row][col] === WATER) continue;

            numIsland++;
            markAsVisited(row, col, grid, visited);
        }
    }

    return numIsland;
};

const grid = [
    ['1', '1', '0', '0', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '1', '0', '0'],
    ['0', '0', '0', '1', '1'],
];
console.log(`Your answer: ${getNumIslands(grid)}`);
console.log(`Correct answer: ${3}`);
