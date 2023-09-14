/*
Question:
You are given a network of n nodes, labeled from 1 to n. You are also given times, 
a list of travel times as directed edges times[i] = (ui, vi, wi), where ui is the source node, 
vi is the target node, and wi is the time it takes for a signal to travel from source to target.

We will send a signal from a given node k. Return the minimum time it takes for all the n nodes to receive the signal. 
If it is impossible for all the n nodes to receive the signal, return -1.
*/

const IMPOSSIBLE_TO_REACH_ALL_NODES = -1;

const getGraph = (times) => {
    const graph = {};

    for (const time of times) {
        const [startNode, endNode, timeToReachEndNode] = time;

        const containsNode = graph.hasOwnProperty(startNode);
        if (!containsNode) graph[startNode] = {};

        graph[startNode][endNode] = timeToReachEndNode;
    }

    return graph;
};

const getMinTimeForAllNodesToBeReached = (timesToRecieveSignal, graph, node, timeSoFar) => {
    // Base case
    if (timesToRecieveSignal[node] <= timeSoFar) return;

    // Process node
    timesToRecieveSignal[node] = timeSoFar;

    // Recursive case
    const containsNode = graph.hasOwnProperty(node);
    if (!containsNode) return;

    const children = Object.keys(graph[node]);
    for (let child of children) {
        const childTime = graph[node][child];

        getMinTimeForAllNodesToBeReached(timesToRecieveSignal, graph, child, timeSoFar + childTime);
    }
};

const getNetworkDelayTime = (times, numNodes, startNode) => {
    const graph = getGraph(times);

    const timesToRecieveSignal = new Array(numNodes + 1).fill(Infinity);
    timesToRecieveSignal[0] = -Infinity;

    getMinTimeForAllNodesToBeReached(timesToRecieveSignal, graph, startNode, 0);

    const minTimeToForAllNodesToBeReached = Math.max(...timesToRecieveSignal);
    if (minTimeToForAllNodesToBeReached === Infinity) return IMPOSSIBLE_TO_REACH_ALL_NODES;

    return minTimeToForAllNodesToBeReached;
};

const times = [
        [2, 1, 1],
        [2, 3, 1],
        [3, 4, 1],
    ],
    n = 4,
    k = 2;

console.log(`Your answer: ${getNetworkDelayTime(times, n, k)}`);
console.log(`Correct answer: ${2}`);
