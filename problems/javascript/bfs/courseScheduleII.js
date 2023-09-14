const { Queue } = require('../../../utils/queue');
/*
There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. 
You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
Return the ordering of courses you should take to finish all courses. If there are many valid answers, return any of them. 
If it is impossible to finish all courses, return an empty array.
*/

const getGraph = (numNodes, preReqs) => {
    const graph = {};

    for (let node = 0; node < numNodes; node++) {
        graph[node] = [];
    }

    for (const preReq of preReqs) {
        const [node, preRequisites] = preReq;

        graph[preRequisites].push(node);
    }

    return graph;
};

const getIndegreeMap = (numNodes, preReqs) => {
    const inDegreeMap = {};

    for (let node = 0; node < numNodes; node++) {
        inDegreeMap[node] = 0;
    }

    for (const preReq of preReqs) {
        const [node, preRequisites] = preReq;

        inDegreeMap[node]++;
    }

    return inDegreeMap;
};

const getZeroIndegrees = (inDegreeMap, numNodes) => {
    const zeroIndegrees = [];

    for (let node = 0; node < numNodes; node++) {
        if (inDegreeMap[node] === 0) zeroIndegrees.push(node);
    }

    return zeroIndegrees;
};

const getValidOrdering = (graph, inDegreeMap, numNodes) => {
    const zeroIndegrees = getZeroIndegrees(inDegreeMap, numNodes);

    const validOrdering = [];
    while (zeroIndegrees.length > 0) {
        // Remove node
        const node = zeroIndegrees.shift();

        // Process node
        validOrdering.push(node);

        // Get neighbors
        const neighbors = graph[node];
        for (const neighbor of neighbors) {
            inDegreeMap[neighbor]--;

            if (inDegreeMap[neighbor] === 0) zeroIndegrees.push(neighbor);
        }
    }

    return validOrdering;
};

const getOrder = (numNodes, preReqs) => {
    const graph = getGraph(numNodes, preReqs);
    const inDegreeMap = getIndegreeMap(numNodes, preReqs);

    const validOrdering = getValidOrdering(graph, inDegreeMap, numNodes);

    if (validOrdering.length < numNodes) return [];
    return validOrdering;
};

const numCourses = 4;
const prerequisites = [
    [1, 0],
    [2, 0],
    [3, 1],
    [3, 2],
];

console.log(`Your answer: ${getOrder(numCourses, prerequisites)}`);
console.log(`Correct answer: ${[0, 1, 2, 3]}`);
console.log();
