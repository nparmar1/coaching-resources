/*
Given an m x n matrix board where each cell is a battleship 'X' or empty '.', return the number of the battleships on board.

Battleships can only be placed horizontally or vertically on board. In other words, they can only be made of the shape 1 x k (1 row, k columns) 
or k x 1 (k rows, 1 column), where k can be of any size. At least one horizontal or vertical cell separates between two battleships 
(i.e., there are no adjacent battleships).
*/

//     0    1    2     3
// 0 ['X', '.', '.', 'X'],
// 1 ['.', '.', '.', 'X'],
// 2 ['.', '.', '.', 'X'],

const BATTLE_SHIP = 'X';

const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
];

const getRowColString = (row, col) => `${row}, ${col}`;

const isInBound = (row, col, matrix) => {
    const numRows = matrix.length;
    const numCols = matrix[0].length;

    const isRowBound = row >= 0 && row < numRows;
    const isColBound = col >= 0 && col < numCols;

    return isRowBound && isColBound;
};

const getNeighbors = (row, col, matrix) => {
    const neighbors = [];

    for (const direction of directions) {
        const [rowDir, colDir] = direction;

        const newRow = row + rowDir;
        const newCol = col + colDir;

        if (!isInBound(newRow, newCol, matrix)) continue;
        if (matrix[newRow][newCol] !== BATTLE_SHIP) continue;

        neighbors.push([newRow, newCol]);
    }

    return neighbors;
};

const markComponentAsVisited = (row, col, visited, matrix) => {
    // Base case
    if (visited.has(getRowColString(row, col))) return;
    // Process node
    visited.add(getRowColString(row, col));

    // Recurse on neighbors
    const neighbors = getNeighbors(1, 3, matrix);
    for (const neighbor of neighbors) {
        const [neighborRow, neighborCol] = neighbor;

        markComponentAsVisited(neighborRow, neighborCol, visited, matrix);
    }
};

const countBattleships = (board) => {
    const visited = new Set();
    const numRows = board.length;
    const numCols = board[0].length;

    let numBattleShips = 0;

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            if (board[row][col] !== BATTLE_SHIP) continue;
            if (visited.has(getRowColString(row, col))) continue;

            numBattleShips++;
            markComponentAsVisited(row, col, visited, board);
        }
    }

    return numBattleShips;
};

const board = [
    ['X', '.', '.', 'X'],
    ['.', '.', '.', 'X'],
    ['.', '.', '.', 'X'],
];

console.log(`Your answer: ${countBattleships(board)}`);
console.log(`Correct answer: ${2}`);
