/*
Given an array of edges of an undirected graph and two nodes, return the length of the shortest path between these two nodes. 
If no such path exists, return -1. Note that the length of a path is the number of edges in the path, not the number of nodes.
*/

const { Queue } = require('../../../utils/queue');
const NO_PATH_FOUND = 1;

const buildGraph = (edges) => {
    const graph = {};

    for (const edge of edges) {
        const [nodeOne, nodeTwo] = edge;

        const isNodeOnePropety = graph.hasOwnProperty(nodeOne);
        const isNodeTwoPropety = graph.hasOwnProperty(nodeTwo);

        if (!isNodeOnePropety) graph[nodeOne] = [];
        if (!isNodeTwoPropety) graph[nodeTwo] = [];

        graph[nodeOne].push(nodeTwo);
        graph[nodeTwo].push(nodeOne);
    }
    console.log(graph);
    return graph;
};

const getShortestPathLength = (edges, startNode, targetNode) => {
    const queue = new Queue();
    const visited = new Set();

    visited.add(startNode);
    queue.enqueue({ node: startNode, pathFromStart: 0 });

    const graph = buildGraph(edges);
    while (queue.size() > 0) {
        const { node, pathFromStart } = queue.dequeue();

        // Process node
        if (node === targetNode) return pathFromStart;

        const children = graph[node];
        for (const child of children) {
            if (visited.has(child)) continue;

            visited.add(child);
            queue.enqueue({ node: child, pathFromStart: pathFromStart + 1 });
        }
    }

    return NO_PATH_FOUND;
};

const edges = [
    ['w', 'x'],
    ['x', 'y'],
    ['z', 'y'],
    ['z', 'v'],
    ['w', 'v'],
];
const startNode = 'w';
const targetNode = 'z';

console.log(`Your answer: ${getShortestPathLength(edges, startNode, targetNode)}`);
console.log(`Correct answer: ${2}`);
console.log();
