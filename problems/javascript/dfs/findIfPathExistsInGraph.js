/*
Question:
There is a bi-directional graph with n vertices, where each vertex is labeled from 0 to n - 1 (inclusive). 
The edges in the graph are represented as a 2D integer array edges, where each edges[i] = [ui, vi] 
denotes a bi-directional edge between vertex ui and vertex vi. 
Every vertex pair is connected by at most one edge, and no vertex has an edge to itself.

You want to determine if there is a valid path that exists from vertex source to vertex destination.

Given edges and the integers n, source, and destination, return true if there is a valid path from source to destination, or false otherwise.
*/

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

const findValidPath = (graph, node, target, visited) => {
    // Base case
    if (node === target) return true;
    if (visited.has(node)) return false;

    // Process node
    visited.add(node);

    // Recursive case
    const neighbors = graph[node];
    for (const neighbor of neighbors) {
        if (findValidPath(graph, neighbor, target, visited)) return true;
    }

    return false;
};

const getValidPath = (numNodes, edges, source, target) => {
    const visited = new Set();
    const graph = getGraph(edges);

    return findValidPath(graph, source, target, visited);
};

const n = 3;
const edges = [
    [0, 1],
    [1, 2],
    [2, 0],
];
const source = 0;
const destination = 2;

console.log(`Your answer: ${getValidPath(n, edges, source, destination)}`);
console.log(`Correct answer: ${true}`);
