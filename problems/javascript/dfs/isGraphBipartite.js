/*
Question:
There is an undirected graph with n nodes, where each node is numbered between 0 and n - 1. 
You are given a 2D array graph, where graph[u] is an array of nodes that node u is adjacent to. More formally, for each v in graph[u], 
there is an undirected edge between node u and node v. The graph has the following properties:

There are no self-edges (graph[u] does not contain u).
There are no parallel edges (graph[u] does not contain duplicate values).
If v is in graph[u], then u is in graph[v] (the graph is undirected).
The graph may not be connected, meaning there may be two nodes u and v such that there is no path between them.
A graph is bipartite if the nodes can be partitioned into two independent sets A and B such that every edge 
in the graph connects a node in set A and a node in set B.

Return true if and only if it is bipartite.
*/

// 0 2
// 1 2 3

// 0 2
// 1 3

const UNVISITED = 0;
const SET_A = 1;
const SET_B = -1;

const getOppositeSet = (prevSet) => prevSet * -1;

const checkIfComponentIsBiPartite = (node, graph, visited, prevSet) => {
    // Base case
    if (visited[node] !== UNVISITED) return visited[node] === getOppositeSet(prevSet);

    // Process node
    visited[node] = getOppositeSet(prevSet);

    // Recurise on neighbors
    const neighbors = graph[node];
    for (const neighbor of neighbors) {
        if (!checkIfComponentIsBiPartite(neighbor, graph, visited, visited[node])) return false;
    }

    return true;
};

const isBipartite = (graph) => {
    const numNodes = graph.length;
    const visited = new Array(numNodes).fill(UNVISITED);

    for (let node = 0; node < numNodes; node++) {
        if (visited[node] !== UNVISITED) continue;

        if (!checkIfComponentIsBiPartite(node, graph, visited, SET_B)) return false;
    }

    return true;
};

let graph = [
    [1, 2, 3],
    [0, 2],
    [0, 1, 3],
    [0, 2],
];

console.log(`Your answer: ${isBipartite(graph)}`);
console.log(`Correct answer: ${false}`);

// graph = [
//     [4, 1],
//     [0, 2],
//     [1, 3],
//     [2, 4],
//     [3, 0],
// ];

// console.log(`Your answer: ${isBipartite(graph)}`);
// console.log(`Correct answer: ${false}`);
