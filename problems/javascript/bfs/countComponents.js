/*
You have a graph of n nodes. You are given an integer n and an array edges where edges[i] = [ai, bi] indicates that there is an edge between ai and bi in the graph.

Return the number of connected components in the graph.
*/

const { Queue } = require('../../../utils/queue');

const buildGraph = (edges) => {
    const graph = {};

    for (const edge of edges) {
        const [nodeOne, nodeTwo] = edge;

        const hasNodeOne = graph.hasOwnProperty(nodeOne);
        const hasNodeTwo = graph.hasOwnProperty(nodeTwo);

        if (!hasNodeOne) graph[nodeOne] = [];
        if (!hasNodeTwo) graph[nodeTwo] = [];

        graph[nodeOne].push(nodeTwo);
        graph[nodeTwo].push(nodeOne);
    }
    console.log(graph);
    return graph;
};

const markNodeAsCompleted = (node, edges, visited) => {
    const queue = new Queue();
    queue.enqueue([node]);

    const graph = buildGraph(edges);
    while (queue.size() > 0) {
        const [node] = queue.dequeue();

        // Process node

        if (!graph.hasOwnProperty(node)) continue;
        const children = graph[node];
        for (const child of children) {
            if (visited.has(child)) continue;

            visited.add(child);
            queue.enqueue([child]);
        }
    }
};

const countComponents = (nodes, edges) => {
    let numberOfComponents = 0;
    const visited = new Set();

    for (let node = 0; node < nodes; node++) {
        if (visited.has(node)) continue;
        visited.add(node);

        numberOfComponents++;
        markNodeAsCompleted(node, edges, visited);
    }

    return numberOfComponents;
};

edges = [
    [0, 1],
    [1, 2],
    [3, 4],
];
const n = 5;

console.log(`Your answer: ${countComponents(n, edges)}`);
console.log(`Correct answer: ${2}`);
