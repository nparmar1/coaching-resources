/*
You are given an m x n grid rooms initialized with these three possible values.

- -1 A wall or an obstacle.
- 0 A gate.
- INF Infinity means an empty room. We use the value 2^31 - 1 = 2147483647 to represent INF as you may assume that the distance to a gate is less than 2147483647.

Fill each empty room with the distance to its nearest gate. If it is impossible to reach a gate, it should be filled with INF.
*/

const { Queue } = require('../../../utils/queue');

const GATE = 0;
const EMPTY_ROOM = 2147483647;
const WALL = -1;

const directions = [
    [0, 1],
    [1, 0],
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

const getGateLocations = (rooms) => {
    const gateLocations = [];

    const numRows = rooms.length;
    const numCols = rooms[0].length;

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            if (rooms[row][col] === GATE) gateLocations.push([row, col]);
        }
    }

    return gateLocations;
};

const getRowColString = (row, col) => `${row}, ${col}`;

const getNeighbors = (row, col, matrix) => {
    const neighbors = [];

    for (const direction of directions) {
        const [rowDir, colDir] = direction;

        const newRow = row + rowDir;
        const newCol = col + colDir;

        if (
            !isInBound(newRow, newCol, matrix) ||
            matrix[newRow][newCol] === WALL ||
            matrix[newRow][newCol] === GATE
        )
            continue;

        neighbors.push([newRow, newCol]);
    }

    return neighbors;
};

const updateWallsAndGatesMatrix = (rooms) => {
    const gateLocations = getGateLocations(rooms);
    const visited = new Set();
    const queue = [];

    for (const gateLocation of gateLocations) {
        const [row, col] = gateLocation;
        const rowColString = getRowColString(row, col);
        visited.add(rowColString);

        queue.push([row, col, 0]);
    }

    while (queue.length > 0) {
        // Remove node
        const [row, col, path] = queue.shift();

        // Process node
        if (rooms[row][col] === EMPTY_ROOM) rooms[row][col] = path;

        // Get neighbors
        const neighbors = getNeighbors(row, col, rooms);
        for (const neighbor of neighbors) {
            const [neighborRow, neighborCol] = neighbor;
            if (visited.has(getRowColString(neighborRow, neighborCol))) continue;

            visited.add(getRowColString(neighborRow, neighborCol));
            queue.push([neighborRow, neighborCol, path + 1]);
        }
    }

    return rooms;
};

const rooms = [
    [2147483647, -1, 0, 2147483647],
    [2147483647, 2147483647, 2147483647, -1],
    [2147483647, -1, 2147483647, -1],
    [0, -1, 2147483647, 2147483647],
];

console.log(`Your answer: ${updateWallsAndGatesMatrix(rooms)}`);
console.log(
    `Correct answer: ${[
        [3, -1, 0, 1],
        [2, 2, 1, -1],
        [1, -1, 2, -1],
        [0, -1, 3, 4],
    ]}`,
);
