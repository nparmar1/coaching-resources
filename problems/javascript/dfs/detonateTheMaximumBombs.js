/*
Question:
You are given a list of bombs. The range of a bomb is defined as the area where its effect can be felt. 
This area is in the shape of a circle with the center as the location of the bomb.

The bombs are represented by a 0-indexed 2D integer array bombs where bombs[i] = [xi, yi, ri]. xi and yi denote the X-coordinate 
and Y-coordinate of the location of the ith bomb, whereas ri denotes the radius of its range.

You may choose to detonate a single bomb. When a bomb is detonated, it will detonate all bombs that lie in its range. 
These bombs will further detonate the bombs that lie in their ranges.

Given the list of bombs, return the maximum number of bombs that can be detonated if you are allowed to detonate only one bomb.
*/

const getDistanceBetweenTwoBombs = (bombOnePoints, bombTwoPoints) => {
    const [xBombOnePoint, yBombOnePoint] = bombOnePoints;
    const [xBombTwoPoint, yBombTwoPoint] = bombTwoPoints;

    const distanceBetweenBothX = xBombOnePoint - xBombTwoPoint;
    const distanceBetweenBothY = yBombOnePoint - yBombTwoPoint;

    const distanceBetweenTwoBombs = Math.sqrt(
        Math.pow(distanceBetweenBothX, 2) + Math.pow(distanceBetweenBothY, 2),
    );

    return distanceBetweenTwoBombs;
};

const areConnected = (bombOne, bombTwo) => {
    const [xOnePoint, yOnePoint, radiusOne] = bombOne;
    const [xTwoPoint, yTwoPoint, radiusTwo] = bombTwo;

    const distanceBetweenTwoBombs = getDistanceBetweenTwoBombs(
        [xOnePoint, yOnePoint],
        [xTwoPoint, yTwoPoint],
    );

    return distanceBetweenTwoBombs <= radiusOne;
};

const getGraph = (bombs) => {
    const numBombs = bombs.length;
    const graph = {};

    for (let bombOneId = 0; bombOneId < numBombs; bombOneId++) {
        for (let bombTwoId = bombOneId + 1; bombTwoId < numBombs; bombTwoId++) {
            const bombOne = bombs[bombOneId];
            const bombTwo = bombs[bombTwoId];

            const containsBombOne = graph.hasOwnProperty(bombOneId);
            const containsBombTwo = graph.hasOwnProperty(bombTwoId);

            if (!containsBombOne) graph[bombOneId] = [];
            if (!containsBombTwo) graph[bombTwoId] = [];

            if (areConnected(bombOne, bombTwo)) graph[bombOneId].push(bombTwoId);
            if (areConnected(bombTwo, bombOne)) graph[bombTwoId].push(bombOneId);
        }
    }

    return graph;
};

const getComponentSize = (graph, visited, node) => {
    // Base case
    if (visited.has(node)) return 0;

    // Process node
    let potentialMaxComponentSize = 1;
    visited.add(node);

    // Recurse on children
    const containsNode = graph.hasOwnProperty(node);
    if (!containsNode) return potentialMaxComponentSize;

    const children = graph[node];
    for (const child of children) {
        potentialMaxComponentSize += getComponentSize(graph, visited, child);
    }

    return potentialMaxComponentSize;
};

const getMaximumDetonation = (bombs) => {
    const graph = getGraph(bombs);
    const numBombs = bombs.length;

    let maxBombsDetonated = 0;

    for (let bomb = 0; bomb < numBombs; bomb++) {
        const visited = new Set();
        let potentialMaxBombsDetonated = getComponentSize(graph, visited, bomb);

        maxBombsDetonated = Math.max(maxBombsDetonated, potentialMaxBombsDetonated);
    }

    return maxBombsDetonated;
};

let bombs = [
    [1, 2, 3],
    [2, 3, 1],
    [3, 4, 2],
    [4, 5, 3],
    [5, 6, 4],
];

console.log(`Your answer: ${getMaximumDetonation(bombs)}`);
console.log(`Correct answer: ${5}`);

// bombs = [
//     [2, 1, 3],
//     [6, 1, 4],
// ];

// console.log(`Your answer: ${getMaximumDetonation(bombs)}`);
// console.log(`Correct answer: ${2}`);

class Bomb {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }
}

const bomb1 = new Bomb(1, 2, 3);
const bomb2 = new Bomb(2, 3, 10);
const bomb3 = new Bomb(3, 4, 2);

const bombss = [bomb1, bomb2, bomb3];

const { x, y, r } = bomb1;
console.log(x, y, r, bomb1);
