/*
Question:
Suppose an array of length n sorted in ascending order is rotated between 1 and n times. 
For example, the array nums = [0,1,2,4,5,6,7] might become:

[4,5,6,7,0,1,2] if it was rotated 4 times.
[0,1,2,4,5,6,7] if it was rotated 7 times.
Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].

Given the sorted rotated array nums of unique elements, 
return the minimum element of this array.

You must write an algorithm that runs in O(log n) time.
*/

const NOT_FOUND = -1;

const getMidIdx = (leftIdx, rightIdx) => {
    const midIdx = leftIdx + Math.floor((rightIdx - leftIdx) / 2);

    return midIdx;
};

const findMinimum = (nums) => {
    let leftIdx = 0;
    let rightIdx = nums.length - 1;
    const lastValue = nums[nums.length - 1];

    let minElement = NOT_FOUND;

    while (leftIdx <= rightIdx) {
        const midIdx = getMidIdx(leftIdx, rightIdx);
        const midValue = nums[midIdx];

        if (midValue <= lastValue) {
            minElement = midValue;
            rightIdx = rightIdx - 1;
        } else leftIdx = leftIdx + 1;
    }

    return minElement;
};

let nums = [3, 4, 5, 1, 2];

console.log(`Your answer: ${findMinimum(nums)}`);
console.log(`Correct answer: ${1}`);
console.log();

nums = [4, 5, 6, 7, 0, 1, 2];

console.log(`Your answer: ${findMinimum(nums)}`);
console.log(`Correct answer: ${0}`);
console.log();

nums = [11, 13, 15, 17];

console.log(`Your answer: ${findMinimum(nums)}`);
console.log(`Correct answer: ${11}`);
console.log();
