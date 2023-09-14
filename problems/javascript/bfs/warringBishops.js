/*
Imagine that we have an 8 x 8 chess board that has some bishops on it, and no other pieces. 
In chess, bishops can travel diagonally in all 4 directions, and they can move as far as they want in these directions 
(however, if there is another piece in the way, they cannot move past that piece).

You'll be a given an array of arrays. Each of the smaller arrays has size 2, and represents 1 bishop. 
For example, if we have, [[1,2]], then there is a bishop at row = 1, col = 2.

If 2 bishops can attack each other (i.e. they are in the same diagonal), we'll say that these are warring bishops. 
Additionally, if bishop 1 can attack bishop 2, and bishop 2 can attack bishop 3, then all 3 of these are warring bishops.

Given the input list of bishops, return true if all the bishops are part of the same group of warring bishops. Otherwise, return false.
*/

const { Queue } = require('../../../utils/queue');

const areWarring = (bishopOne, bishopTwo) => {
    const [bishopOneXpoint, bishopOneYpoint] = bishopOne;
    const [bishopTwoXpoint, bishopTwoYpoint] = bishopTwo;

    const slope =
        Math.abs(bishopTwoYpoint - bishopOneYpoint) / Math.abs(bishopTwoXpoint - bishopOneXpoint);

    return slope === 1;
};

const buildGraph = (nodes) => {
    const numNodes = nodes.length;
    const graph = {};

    for (let i = 0; i < numNodes; i++) {
        for (let j = i + 1; j < numNodes; j++) {
            const nodeOne = nodes[i];
            const nodeTwo = nodes[j];

            const containsNodeOne = graph.hasOwnProperty(i);
            const containsNodeTwo = graph.hasOwnProperty(j);

            if (!areWarring(nodeOne, nodeTwo)) continue;

            if (!containsNodeOne) graph[i] = [];
            if (!containsNodeTwo) graph[j] = [];

            graph[i].push(j);
            graph[j].push(i);
        }
    }

    return graph;
};

const markComponentAsVisited = (startNode, graph, visited) => {
    const queue = new Queue();
    visited.add(startNode);

    queue.enqueue(startNode);
    while (queue.size() > 0) {
        // Remove node
        const node = queue.dequeue();

        // Process node

        // Get neighbors
        const neighbors = graph[node];
        for (const neighbor of neighbors) {
            if (visited.has(neighbor)) continue;

            visited.add(neighbor);
            queue.enqueue(neighbor);
        }
    }
};

const isGroupOfWarringBishops = (bishops) => {
    const graph = buildGraph(bishops);
    const numBishops = bishops.length;
    const visited = new Set();

    for (let bishop = 0; bishop < numBishops; bishop++) {
        if (visited.has(bishop)) continue;

        markComponentAsVisited(bishop, graph, visited);
    }

    return numBishops === visited.size;
};

const bishops = [
    [0, 4],
    [2, 6],
    [3, 1],
    [6, 2],
    [7, 5],
];

console.log(`Your answer: ${isGroupOfWarringBishops(bishops)}`);
console.log(`Correct answer: ${true}`);
console.log();

/*
option 1: an array of instances
option 2: a 2d array with a length of 2 array, rows and col

const bishops = [[0,4], [2,6]];


class Bishop {
    constructor(row, col){
        this.row = row;
        this.col = col;
    }
}

const bishopOne = new Bishop(0, 4);
const bishopTwo = new Bishop(2, 6);

const bishops = [bishopOne, bishopTwo];


*/
