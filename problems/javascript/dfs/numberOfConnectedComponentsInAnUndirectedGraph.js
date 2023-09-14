/*
Question:
You have a graph of n nodes. 
You are given an integer n and an array edges where edges[i] = [ai, bi] 
indicates that there is an edge between ai and bi in the graph.

Return the number of connected components in the graph.
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
    console.log(graph);
    return graph;
};

const markComponentAsVisited = (node, graph, visited) => {
    // Base case
    if (visited.has(node)) return;

    // Process node
    visited.add(node);

    // Recursive case
    const containsNodeInGraph = graph.hasOwnProperty(node);
    if (!containsNodeInGraph) return;

    const neighbors = graph[node];
    for (const neighbor of neighbors) {
        markComponentAsVisited(neighbor, graph, visited);
    }
};

const countComponents = (nodes, edges) => {
    const graph = getGraph(edges);
    const visited = new Set();
    let numComponents = 0;

    for (let node = 0; node < nodes; node++) {
        if (visited.has(node)) continue;

        numComponents++;
        markComponentAsVisited(node, graph, visited);
    }

    return numComponents;
};

const n = 5;
const edges = [
    [0, 1],
    [1, 2],
    [3, 4],
];

console.log(`Your answer: ${countComponents(n, edges)}`);
console.log(`Correct answer: ${2}`);
