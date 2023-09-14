/*
Imagine that we have some special sharks, and these sharks tend to travel in pods. However, these sharks are competitive. 
Two sharks will only be willing to hunt together if they deem each other to be worthy. 
The sharks will deem each other worthy if the difference between their tooth size is less than or equal to 1 (inches) 
OR the difference between their fin size is less than or equal to 4 (inches).

Additionally, these sharks are highly respectful creatures. So, if shark 1 believes shark 2 is worthy, and shark 2 believes shark 3 is worth, 
then shark 1 and shark 3 will deem each other to be worthy (because they respect shark 2's opinion).

Given a list of smaller arrays representing sharks (e.g. [[2,4]] means we have one shark with a tooth size of 2 and a fin size of 4), 
return the number of pods that these sharks will form.
*/

const { Queue } = require('../../../utils/queue');

const MAX_TOOTH_SIZE = 1;
const MAX_FIN_SIZE = 4;

const areSharksWorthy = (sharkOne, sharkTwo) => {
    const [sharkOneToothSize, sharkOneFinSize] = sharkOne;
    const [sharkTwoToothSize, sharkTwoFinSize] = sharkTwo;

    const differenceInToothSize = Math.abs(sharkTwoToothSize - sharkOneToothSize);
    const differenceInFinSize = Math.abs(sharkTwoFinSize - sharkOneFinSize);

    return differenceInToothSize <= MAX_TOOTH_SIZE || differenceInFinSize <= MAX_FIN_SIZE;
};

const buildGraph = (nodes) => {
    const numNodes = nodes.length;
    const graph = {};

    for (let i = 0; i < numNodes; i++) {
        for (let j = i + 1; j < numNodes; j++) {
            const nodeOne = nodes[i];
            const nodeTwo = nodes[j];

            const containsNodeOne = graph.hasOwnProperty(i);
            const containsNodeTwo = graph.hasOwnProperty(j);

            if (!areSharksWorthy(nodeOne, nodeTwo)) continue;

            if (!containsNodeOne) graph[i] = [];
            if (!containsNodeTwo) graph[j] = [];

            graph[i].push(j);
            graph[j].push(i);
        }
    }
    return graph;
};

const getComponentSize = (startNode, visited, graph) => {
    const queue = new Queue();

    visited.add(startNode);
    queue.enqueue(startNode);

    while (queue.size() > 0) {
        // Remove node
        const node = queue.dequeue();

        // Process node

        // Get neighbors
        const neighbors = graph[node];
        for (const neighbor of neighbors) {
            if (visited.has(neighbor)) continue;

            visited.add(neighbor);
            queue.enqueue(neighbor);
        }
    }
};

const countSharkPods = (sharks) => {
    const visited = new Set();
    const numShark = sharks.length;
    const graph = buildGraph(sharks);
    let componentSize = 0;

    for (let shark = 0; shark < numShark; shark++) {
        if (visited.has(shark)) continue;

        componentSize++;
        getComponentSize(shark, visited, graph);
    }

    return componentSize;
};

const sharks = [
    [2, 4],
    [10, 20],
    [1.5, 9],
    [10, 22],
    [0.1, 1],
    [19, 18],
    [7, 13],
    [12, 26],
];

console.log(`Your answer: ${countSharkPods(sharks)}`);
console.log(`Correct answer: ${2}`);
console.log();

/*
Option 1: 2D array with length arrays - [[1, 2], [2, 4], ...]
Option 2: an array of new instance
*/

// class Shark {
//     constructor(toothSize, finSize) {
//         this.toothSize = toothSize;
//         this.finSize = finSize;
//     }
// }

// const sharkOne = new Shark(1, 2);
// const sharkTwo = new Shark(3, 4);

// const sharks2 = [sharkOne, sharkTwo];

// console.log(sharks2);
