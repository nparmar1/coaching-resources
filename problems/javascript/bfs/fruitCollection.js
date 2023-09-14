/*
There is a monkey who loves collecting and eating fruits. This monkey jumps from tree to tree using the vines that are attached to the tree. 
He would like to find the collection of trees that allows him to maximize the total amount of fruit that he can eat. 
Note that some trees contain more fruit than others.

You'll be given a list of trees, where each tree contains an x-coordinate, a y-coordinate, a number of fruits, and a vine length. 
For example, [2,4,5,10] indicates that we have a tree at the position (2,4) in a 2D grid, this tree has 5 fruits, and the monkey can jump to any tree 
within a 10 unit radius of this tree. Note that the monkey will never jump to another tree if its not possible to jump from the other tree to his 
current tree (since he doesn't want to get stranded).

You should return the maximum amount of fruit that the monkey can obtain while staying within one group of trees (i.e. one set of trees that he can jump between).
*/

const { Queue } = require('../../../utils/queue');

const getDistanceBetweenNodes = (nodeOneCoordinates, nodeTwoCoordinates) => {
    const [nodeOneXcoordinate, nodeOneYCoordinate] = nodeOneCoordinates;
    const [nodeTwoXcoordinate, nodeTwoYCoordinate] = nodeTwoCoordinates;

    const distance = Math.sqrt(
        Math.pow(nodeTwoXcoordinate - nodeOneXcoordinate, 2) +
            Math.pow(nodeTwoYCoordinate - nodeOneYCoordinate, 2),
    );

    return distance;
};

const areConnected = (nodeOne, nodeTwo) => {
    const [nodeOneXcoordinate, nodeOneYCoordinate, nodeOneFruitNum, nodeOneLengthDistance] =
        nodeOne;
    const [nodeTwoXcoordinate, nodeTwoYCoordinate, nodeTwoFruitNum, nodeTwoLengthDistance] =
        nodeTwo;

    const distanceBetweenNodes = getDistanceBetweenNodes(
        [nodeOneXcoordinate, nodeOneYCoordinate],
        [nodeTwoXcoordinate, nodeTwoYCoordinate],
    );

    const smallestDistanceBetweenTwoNodes = Math.min(nodeOneLengthDistance, nodeTwoLengthDistance);
    return distanceBetweenNodes <= smallestDistanceBetweenTwoNodes;
};

const buildGraph = (nodes) => {
    const graph = {};
    const numNodes = nodes.length;

    for (let nodeOne = 0; nodeOne < numNodes; nodeOne++) {
        for (let nodeTwo = nodeOne + 1; nodeTwo < numNodes; nodeTwo++) {
            if (!areConnected(nodes[nodeOne], nodes[nodeTwo])) continue;

            const containsNodeOne = graph.hasOwnProperty(nodeOne);
            const containsNodeTwo = graph.hasOwnProperty(nodeTwo);

            if (!containsNodeOne) graph[nodeOne] = [];
            if (!containsNodeTwo) graph[nodeTwo] = [];

            graph[nodeOne].push(nodeTwo);
            graph[nodeTwo].push(nodeOne);
        }
    }
    console.log(graph);
    return graph;
};

const getComponent = (startNode, graph, visited, nodes) => {
    const queue = new Queue();

    visited.add(startNode);
    queue.enqueue(startNode);

    let componentSize = 0;
    while (queue.size() > 0) {
        //  Remove node
        const node = queue.dequeue();

        // Process node
        componentSize += nodes[node][2];

        // Get neighbors
        const containsNode = graph.hasOwnProperty(node);
        if (!containsNode) continue;

        const neighbors = graph[node];
        for (const neighbor of neighbors) {
            if (visited.has(neighbor)) continue;

            visited.add(neighbor);
            queue.enqueue(neighbor);
        }
    }

    return componentSize;
};

const getMaxReachableFruit = (trees) => {
    const graph = buildGraph(trees);
    const treeVisited = new Set();
    const numTress = trees.length;
    let maxFruit = 0;

    for (let tree = 0; tree < numTress; tree++) {
        if (treeVisited.has(tree)) continue;

        const currMaxfruit = getComponent(tree, graph, treeVisited, trees);
        maxFruit = Math.max(maxFruit, currMaxfruit);
    }

    return maxFruit;
};

const trees = [
    [2, 4, 2, 6],
    [10, 4, 5, 5],
    [3, 8, 3, 6],
    [12, 8, 6, 5],
    [1, 6, 2, 6],
];

console.log(`Your answer: ${getMaxReachableFruit(trees)}`);
console.log(`Correct answer: ${11}`);
console.log();
