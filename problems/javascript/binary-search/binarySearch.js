/*
Question:
Given an array of integers nums which is sorted in ascending order, and an integer target, 
write a function to search target in nums. 
If target exists, then return its index. Otherwise, return -1.

You must write an algorithm with O(log n) runtime complexity.
*/
const TARGET_NOT_FOUND = -1;

const getMidIdx = (leftIdx, rightIdx) => {
    const midIdx = leftIdx + Math.floor((rightIdx - leftIdx) / 2);

    return midIdx;
};

const getTargetIndex = (nums, target) => {
    let leftIdx = 0;
    let rightIdx = nums.length - 1;

    while (leftIdx < rightIdx) {
        const midIdx = getMidIdx(leftIdx, rightIdx);
        const midValue = nums[midIdx];

        if (midValue === target) return midIdx;
        else if (midValue < target) leftIdx = leftIdx + 1;
        else if (midValue > target) rightIdx = rightIdx - 1;
    }

    return TARGET_NOT_FOUND;
};

let nums = [-1, 0, 3, 5, 9, 12];
let target = 9;

console.log(`Your answer: ${getTargetIndex(nums, target)}`);
console.log(`Correct answer: ${4}`);

// nums = [-1, 0, 3, 5, 9, 12];
// target = 2;

// console.log(`Your answer: ${getTargetIndex(nums, target)}`);
// console.log(`Correct answer: ${-1}`);

// nums = [5];
// target = 5;

// console.log(`Your answer: ${getTargetIndex(nums, target)}`);
// console.log(`Correct answer: ${0}`);
