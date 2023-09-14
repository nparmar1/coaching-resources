/*
Question:
Given an array of integers nums sorted in non-decreasing order, 
find the starting and ending position of a given target value.

If target is not found in the array, return [-1, -1].

You must write an algorithm with O(log n) runtime complexity.
*/
const NOT_FOUND = -1;

const getMidIdx = (leftIdx, rightIdx) => {
    const midIdx = leftIdx + Math.floor((rightIdx - leftIdx) / 2);

    return midIdx;
};

const getEndingPosition = (nums, target) => {
    let leftIdx = 0;
    let rightIdx = nums.length - 1;

    let endingPosition = NOT_FOUND;

    while (leftIdx <= rightIdx) {
        const midIdx = getMidIdx(leftIdx, rightIdx);
        const midValue = nums[midIdx];

        if (midValue === target) endingPosition = midIdx;
        if (midValue <= target) leftIdx = midIdx + 1;
        else rightIdx = midIdx - 1;
    }

    return endingPosition;
};

const getStartingPosition = (nums, target) => {
    let leftIdx = 0;
    let rightIdx = nums.length - 1;

    let startingPositionIdx = NOT_FOUND;

    while (leftIdx <= rightIdx) {
        const midIdx = getMidIdx(leftIdx, rightIdx);
        const midValue = nums[midIdx];

        if (midValue === target) startingPositionIdx = midIdx;
        if (midValue >= target) rightIdx = midIdx - 1;
        else leftIdx = midIdx + 1;
    }

    return startingPositionIdx;
};

const searchRange = (nums, target) => {
    const startingPosition = getStartingPosition(nums, target);
    const endingPosition = getEndingPosition(nums, target);

    return [startingPosition, endingPosition];
};

let nums = [5, 7, 7, 8, 8, 10];
let target = 8;

console.log(`Your answer: ${searchRange(nums, target)}`);
console.log(`Correct answer: ${[3, 4]}`);
console.log();

// nums = [5, 7, 7, 8, 8, 10];
// target = 6;

// console.log(`Your answer: ${searchRange(nums, target)}`);
// console.log(`Correct answer: ${[-1, -1]}`);
// console.log();

// nums = [];
// target = 0;

// console.log(`Your answer: ${searchRange(nums, target)}`);
// console.log(`Correct answer: ${[-1, -1]}`);
// console.log();
