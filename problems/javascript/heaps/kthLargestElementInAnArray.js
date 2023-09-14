/*
Question:
Given an integer array nums and an integer k, 
return the kth largest element in the array.

Note that it is the kth largest element in the sorted order, 
not the kth distinct element.

You must solve it in O(n) time complexity.
*/

/*
When passing a comparisonFunction, your comparisonFunction should take in
two elements a, b and return a positive number if a is greater than b,
a negative number if a is less than b, and 0 if a is equal to b.

For example, (a, b) => a - b works if we are just dealing with two numbers.
*/

const { MinHeap } = require('../../../utils/minHeap');

const findKthLargest = (nums, threshold) => {
    const kthLargestElements = new MinHeap();

    for (const num of nums) {
        kthLargestElements.push(num);

        if (kthLargestElements.size() > threshold) kthLargestElements.pop();
    }

    return kthLargestElements.pop();
};

// [6 4]

let nums = [3, 2, 1, 5, 6, 4];
let k = 2;

console.log(`Your answer: ${findKthLargest(nums, k)}`);
console.log(`Correct answer: ${5}`);
console.log();

nums = [3, 2, 3, 1, 2, 4, 5, 5, 6];
k = 4;

console.log(`Your answer: ${findKthLargest(nums, k)}`);
console.log(`Correct answer: ${4}`);
console.log();
