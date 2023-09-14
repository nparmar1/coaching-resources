/*
There are many religious fishermen at sea. Two fishermen will work together in a squad if either they have the same religion or the same fishing rod. 
Also, if fisherman Alex is willing to work with fisherman Bob, and fisherman Bob is willing to work with fisherman Caleb, 
then fisherman Alex and fisherman Caleb will be willing to work together (because they trust fisherman Bob).

You'll be given an array where each element represents a fisherman (e.g. [['christianity', 'Johnny Morris']] means 
we have 1 fisherman whose religion is 'christianity' and whose fishing rod is 'Johnny Morris'). 
You must return the size of the largest squad of fishermen.
*/

const { Queue } = require('../../../utils/queue');

const areWorkingTogether = (fishermanOne, fishermanTwo) => {
    const [fishermanOneReligion, fishermanOneRod] = fishermanOne;
    const [fishermanTwoReligion, fishermanTwoRod] = fishermanTwo;

    return fishermanOneReligion === fishermanTwoReligion || fishermanOneRod === fishermanTwoRod;
};

const getGraph = (nodes) => {
    const graph = {};
    const numNodes = nodes.length;

    for (let i = 0; i < numNodes; i++) {
        for (let j = i + 1; j < numNodes; j++) {
            const nodeOne = i;
            const nodeTwo = j;

            if (!areWorkingTogether(nodes[nodeOne], nodes[nodeTwo])) continue;

            const containsNodeOne = graph.hasOwnProperty(nodeOne);
            const containsNodeTwo = graph.hasOwnProperty(nodeTwo);

            if (!containsNodeOne) graph[nodeOne] = [];
            if (!containsNodeTwo) graph[nodeTwo] = [];

            graph[nodeOne].push(nodeTwo);
            graph[nodeTwo].push(nodeOne);
        }
    }

    return graph;
};

const getComponentNum = (startNode, visited, graph) => {
    const queue = new Queue();

    visited.add(startNode);
    queue.enqueue(startNode);

    let numSquad = 0;
    while (queue.size() > 0) {
        // Remove node
        const node = queue.dequeue();

        // Process node
        numSquad++;

        // Get neighbors
        const constainsNode = graph.hasOwnProperty(node);
        if (!constainsNode) continue;

        const neighbors = graph[node];
        for (const neighbor of neighbors) {
            if (visited.has(neighbor)) continue;

            visited.add(neighbor);
            queue.enqueue(neighbor);
        }
    }

    return numSquad;
};

const findLargestSquadSize = (fishermen) => {
    const visitedFisherman = new Set();
    const graph = getGraph(fishermen);
    const numFishermen = fishermen.length;
    let maxFishermenSquad = 0;

    for (let i = 0; i < numFishermen; i++) {
        const fisherman = i;
        if (visitedFisherman.has(fisherman)) continue;

        const currComponentNum = getComponentNum(fisherman, visitedFisherman, graph);
        maxFishermenSquad = Math.max(maxFishermenSquad, currComponentNum);
    }

    return maxFishermenSquad;
};

const fishermen = [
    ['Sikhism', 'Orvis'],
    ['Christianity', 'Johnny Morris'],
    ['Buddhism', 'Winn Grip'],
    ['Islam', 'Shimano'],
    ['Christianity', 'Fuji'],
    ['Buddhism', 'Shimano'],
    ['Christianity', 'Fuji'],
    ['Judaism', 'Fuji'],
    ['Christianity', 'Johnny Morris'],
    ['Hinduism', 'Orvis'],
];

console.log(`Your answer: ${findLargestSquadSize(fishermen)}`);
console.log(`Correct answer: ${5}`);
console.log();
