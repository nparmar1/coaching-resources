/*
Question:
Given an integer array nums and an integer k, 
return the k most frequent elements. You may return the answer in any order.
*/

/*
When passing a comparisonFunction, your comparisonFunction should take in
two elements a, b and return a positive number if a is greater than b,
a negative number if a is less than b, and 0 if a is equal to b.

For example, (a, b) => a - b works if we are just dealing with two numbers.
*/

const { MinHeap } = require('../../../utils/minHeap');

const getFrequencyMap = (array) => {
    const frequency = {};

    for (const element of array) {
        const containsElement = frequency.hasOwnProperty(element);

        if (!containsElement) frequency[element] = 0;

        frequency[element] += 1;
    }

    return frequency;
};

const topKFrequent = (nums, k) => {
    const numsFrequencyMap = getFrequencyMap(nums);

    const minHeap = new MinHeap(
        [],
        (comparisonFunction = (a, b) => numsFrequencyMap[a] - numsFrequencyMap[b]),
    );

    const uniqueNums = Object.keys(numsFrequencyMap);
    for (const uniqueNum of uniqueNums) {
        minHeap.push(uniqueNum);

        if (minHeap.size() > k) minHeap.pop();
    }

    return minHeap.getElements();
};

let nums = [1, 1, 1, 2, 2, 3];
let k = 2;

console.log(`Your answer: ${topKFrequent(nums, k)}`);
console.log(`Correct answer: ${[1, 2]}`);
console.log();

nums = [1];
k = 1;

console.log(`Your answer: ${topKFrequent(nums, k)}`);
console.log(`Correct answer: ${[1]}`);
console.log();
