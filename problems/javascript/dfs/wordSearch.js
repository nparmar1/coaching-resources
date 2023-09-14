/*
Question:
Given an m x n grid of characters board and a string word, return true if word exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. 
The same letter cell may not be used more than once.
*/
const START_IDX = 0;

const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
];

const isInBound = (row, col, board) => {
    const numRow = board.length;
    const numCol = board[0].length;

    const isRowBound = row >= 0 && row < numRow;
    const isColBound = col >= 0 && col < numCol;

    return isRowBound && isColBound;
};

const getNeighbors = (row, col, board) => {
    const neighbors = [];

    for (const direction of directions) {
        const [rowDir, colDir] = direction;

        const newRow = row + rowDir;
        const newCol = col + colDir;

        if (!isInBound(newRow, newCol, board)) continue;

        neighbors.push([newRow, newCol]);
    }

    return neighbors;
};

const getRowColString = (row, col) => `${row}, ${col}`;

const checkIfWordExist = (row, col, visited, board, index, word) => {
    // Base case
    const currChar = board[row][col];
    const currWordChar = word[index];

    if (index > word.length - 1) return true;
    if (visited.has(getRowColString(row, col))) return false;
    if (currChar !== currWordChar) {
        visited.delete(getRowColString(row, col));
        return false;
    }

    // Process node
    visited.add(getRowColString(row, col));

    // Recurse on neighbors
    const neighbors = getNeighbors(row, col, board);
    for (const neighbor of neighbors) {
        const [neighborRow, neighborCol] = neighbor;

        if (checkIfWordExist(neighborRow, neighborCol, visited, board, index + 1, word))
            return true;
    }

    visited.delete(getRowColString(row, col));
    return false;
};

const doesWordExist = (board, word) => {
    const visited = new Set();
    const numRows = board.length;
    const numCols = board[0].length;
    if (word.length === 1 && board[0][0] === word[0]) return true;

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            if (checkIfWordExist(row, col, visited, board, START_IDX, word)) return true;
        }
    }

    return false;
};

let board = [
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'C', 'S'],
    ['A', 'D', 'E', 'E'],
];
let word = 'ABCCED';

console.log(`Your answer: ${doesWordExist(board, word)}`);
console.log(`Correct answer: ${true}`);

// board = [
//     ['A', 'B', 'C', 'E'],
//     ['S', 'F', 'C', 'S'],
//     ['A', 'D', 'E', 'E'],
// ];
// word = 'ABCB';

// console.log(`Your answer: ${doesWordExist(board, word)}`);
// console.log(`Correct answer: ${false}`);
