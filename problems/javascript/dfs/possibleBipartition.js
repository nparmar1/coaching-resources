/*
Question:
We want to split a group of n people (labeled from 1 to n) into two groups of any size. Each person may dislike some other people, 
and they should not go into the same group.

Given the integer n and the array dislikes where dislikes[i] = [ai, bi] indicates that the person labeled ai does not like the person labeled bi, 
return true if it is possible to split everyone into two groups in this way.
*/

const UNVISITED = 0;
const GROUP_A = 1;
const GROUP_B = -1;

const buildGraph = (numNodes, nodes) => {
    const graph = {};

    for (let node = 1; node <= numNodes; node++) {
        graph[node] = [];
    }

    for (const [nodeOne, nodeTwo] of nodes) {
        graph[nodeOne].push(nodeTwo);
        graph[nodeTwo].push(nodeOne);
    }

    return graph;
};

const getOpposite = (prevGroup) => prevGroup * -1;

const checkIfComponentIsBipartition = (node, visited, graph, prevGroup) => {
    // Base case
    if (visited[node] !== UNVISITED) return visited[node] === getOpposite(prevGroup);

    // Process node
    visited[node] = getOpposite(prevGroup);

    // Resurce on neighbors
    const neighbors = graph[node];
    for (const neighbor of neighbors) {
        if (!checkIfComponentIsBipartition(neighbor, visited, graph, visited[node])) return false;
    }

    return true;
};

const isPossibleBipartition = (numNodes, dislikes) => {
    const graph = buildGraph(numPeople, dislikes);
    const visited = new Array(numNodes + 1).fill(UNVISITED);

    for (let node = 1; node <= numNodes; node++) {
        if (visited[node] !== UNVISITED) continue;

        if (!checkIfComponentIsBipartition(node, visited, graph, GROUP_B)) return false;
    }

    return true;
};

// const n = 4;
// const dislikes = [
//     [1, 2],
//     [1, 3],
//     [2, 4],
// ];

// console.log(`Your answer: ${isPossibleBipartition(n, dislikes)}`);
// console.log(`Correct answer: ${true}`);

const n = 3;
const dislikes = [
    [1, 2],
    [1, 3],
    [2, 3],
];

console.log(`Your answer: ${isPossibleBipartition(n, dislikes)}`);
console.log(`Correct answer: ${false}`);
