/*
We have a series of squares in a 2D plane, and each has a side length of 1. We want to find the size of the largest group of adjacent squares. 
Adjacent squares are squares that have at least some portion of their sides touching (but they should NOT be overlapping).

Each square will be represented as an x-y pair which denotes the center of the circle (e.g. [0,0] would be a circle that is centered at 0 and 
has a side length of 1). As an input, you'll be given an array of such squares (e.g. [[0,0], [1,1]]). 
You should return the size of the largest group of adjacent squares.
*/

const { Queue } = require('../../../utils/queue');

const SIDE_LENGTH = 1;

const areAdjacentSqaures = (squareOne, squareTwo) => {
    const [squareOneXpoint, squareOneYpoint] = squareOne;
    const [squareTwoXpoint, squareTwoYpoint] = squareTwo;

    const xPointDifference = Math.abs(squareTwoXpoint - squareOneXpoint);
    const YPointDifference = Math.abs(squareTwoYpoint - squareOneYpoint);

    const isXpointsAdjacent = xPointDifference === SIDE_LENGTH && YPointDifference < SIDE_LENGTH;
    const isYpointsAdjacent = YPointDifference === SIDE_LENGTH && xPointDifference < SIDE_LENGTH;

    return isXpointsAdjacent || isYpointsAdjacent;
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

            if (!areAdjacentSqaures(nodeOne, nodeTwo)) continue;

            if (!containsNodeOne) graph[i] = [];
            if (!containsNodeTwo) graph[j] = [];

            graph[i].push(j);
            graph[j].push(i);
        }
    }
    return graph;
};

const getComponentSize = (startNode, graph, visited) => {
    const queue = new Queue();

    visited.add(startNode);
    queue.enqueue(startNode);

    let componentNum = 0;
    while (queue.size() > 0) {
        // Remove node
        const node = queue.dequeue();

        // Process node
        componentNum++;

        // Get neighbors
        const neighbors = graph[node];
        for (const neighbor of neighbors) {
            if (visited.has(neighbor)) continue;

            visited.add(neighbor);
            queue.enqueue(neighbor);
        }
    }

    return componentNum;
};

const getLargestAdjacentSquareGroupSize = (squares) => {
    const graph = buildGraph(squares);
    const visited = new Set();
    const numSquares = squares.length;
    let maxNumAdjacentSquares = 0;

    for (let square = 0; square < numSquares; square++) {
        if (visited.has(square)) continue;

        const currNumAdjacentSquares = getComponentSize(square, graph, visited);
        maxNumAdjacentSquares = Math.max(maxNumAdjacentSquares, currNumAdjacentSquares);
    }

    return maxNumAdjacentSquares;
};

const squares = [
    [0.5, 0.5],
    [1.5, 0.5],
    [2, 0.5],
    [2.5, -0.5],
    [2.5, -1.5],
    [1.5, -1.5],
];

console.log(`Your answer: ${getLargestAdjacentSquareGroupSize(squares)}`);
console.log(`Correct answer: ${4}`);
console.log();
