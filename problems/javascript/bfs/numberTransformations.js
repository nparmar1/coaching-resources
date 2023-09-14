/*
You'll be given two numbers and two arrays: a startNum, a targetNum, an array additiveNums, and an array multiplicativeNums. 
You'll start at the startNum, and you want to figure out the fewest number of operations required to reach the targetNum.

An operation can be one of two things:
-You can take your current number and add any number from additiveNums to it.
-You can take your current number and multiply it by any number from multiplicativeNums.
*/

const { Queue } = require('../../../utils/queue');

const NO_PATH_FOUND = -1;

const getNeighbors = (num, additiveNums, multiplicativeNums) => {
    const neighbors = [];

    for (const additiveNum of additiveNums) {
        const addedNum = num + additiveNum;

        neighbors.push(addedNum);
    }

    for (const multiplicativeNum of multiplicativeNums) {
        const multipliedNum = num * multiplicativeNum;

        neighbors.push(multipliedNum);
    }

    return neighbors;
};

const findShortestTransformationLength = (
    startNum,
    targetNum,
    additiveNums,
    multiplicativeNums,
) => {
    const visitedNum = new Set();
    const queue = new Queue();

    visitedNum.add(startNum);
    queue.enqueue({ num: startNum, pathSoFar: 0 });

    while (queue.size() > 0) {
        // Remove node
        const { num, pathSoFar } = queue.dequeue();

        // Process node
        if (num === targetNum) return pathSoFar;

        // Get neighbors
        const neighbors = getNeighbors(num, additiveNums, multiplicativeNums);
        for (const neighbor of neighbors) {
            if (visitedNum.has(neighbor)) continue;

            visitedNum.add(neighbor);
            queue.enqueue({ num: neighbor, pathSoFar: pathSoFar + 1 });
        }
    }

    return NO_PATH_FOUND;
};

const startNum = 3;
const targetNum = 80;
const additiveNums = [1, 2];
const multiplicativeNums = [9, 6, 3];

console.log(
    `Your answer: ${findShortestTransformationLength(
        startNum,
        targetNum,
        additiveNums,
        multiplicativeNums,
    )}`,
);
console.log(`Correct answer: ${5}`);
console.log();
