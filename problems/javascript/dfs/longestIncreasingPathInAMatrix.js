/*
Question:
Given an m x n integers matrix, return the length of the longest increasing path in matrix.

From each cell, you can either move in four directions: left, right, up, or down. 
You may not move diagonally or move outside the boundary (i.e., wrap-around is not allowed).
*/
const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
];

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

        neighbors.push([newRow, newCol]);
    }

    return neighbors;
};

const findMaxInscreasingPath = (row, col, matrix) => {
    // Base case

    //Process node
    let maxIncreasingPath = 1;

    // Recurse on neighbors
    const neighbors = getNeighbors(row, col, matrix);
    for (const neighbor of neighbors) {
        const [neighborRow, neighborCol] = neighbor;

        if (matrix[row][col] < matrix[neighborRow][neighborCol]) {
            const potentialMaxIncreasingPath =
                findMaxInscreasingPath(neighborRow, neighborCol, matrix) + 1;

            maxIncreasingPath = Math.max(maxIncreasingPath, potentialMaxIncreasingPath);
        }
    }

    return maxIncreasingPath;
};

const longestIncreasingPath = (matrix) => {
    const numRows = matrix.length;
    const numCols = matrix[0].length;

    let maxInscreasingPath = 0;

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const potentialMaxIncreasingPath = findMaxInscreasingPath(row, col, matrix);

            maxInscreasingPath = Math.max(maxInscreasingPath, potentialMaxIncreasingPath);
        }
    }

    return maxInscreasingPath;
};

const matrix = [
    [9, 9, 4],
    [6, 6, 8],
    [2, 1, 1],
];

console.log(`Your answer: ${longestIncreasingPath(matrix)}`);
console.log(`Correct answer: ${4}`);
