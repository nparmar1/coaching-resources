/*
Given 3 inputs: a start city, an end city, and a list of roads, return the shortest path (as an array) from the start city to the end city.
*/

const { Queue } = require('../../../utils/queue');

const getGraph = (edges) => {
    const graph = {};

    for (const edge of edges) {
        const [nodeOne, nodeTwo] = edge;

        const containsNodeOne = graph.hasOwnProperty(nodeOne);
        const containsNodeTwo = graph.hasOwnProperty(nodeTwo);

        if (!containsNodeOne) graph[nodeOne] = [];
        if (!containsNodeTwo) graph[nodeTwo] = [];

        graph[nodeOne].push(nodeTwo);
        graph[nodeTwo].push(nodeOne);
    }

    return graph;
};

const createShortestPath = (prevNodeMap, startNode, endNode) => {
    const paths = [];
    let currNode = endNode;

    while (currNode !== null) {
        paths.push(currNode);
        currNode = prevNodeMap[currNode];
    }

    return paths.reverse();
};

const getShortestPath = (startNode, endNode, edges) => {
    const graph = getGraph(edges);
    const queue = [];
    const visited = new Set();

    visited.add(startNode);
    queue.push({ node: startNode, prevNode: null });

    const prevNodeMap = {};
    while (queue.length > 0) {
        // Remove nodes
        const { node, prevNode } = queue.shift();

        // Process nodes
        prevNodeMap[node] = prevNode;

        // Get neighbors
        const neighbors = graph[node];
        for (const neighbor of neighbors) {
            if (visited.has(neighbor)) continue;

            visited.add(neighbor);
            queue.push({ node: neighbor, prevNode: node });
        }
    }

    const shorestPath = createShortestPath(prevNodeMap, startNode, endNode);
    return shorestPath;
};

const startCity = 5;
const endCity = 10;
const roads = [
    [5, 7],
    [5, 3],
    [7, 6],
    [7, 4],
    [3, 9],
    [6, 4],
    [4, 10],
    [4, 9],
];

console.log(`Your answer: ${getShortestPath(startCity, endCity, roads)}`);
console.log(`Correct answer: ${[5, 7, 4, 10]}`);
console.log();
