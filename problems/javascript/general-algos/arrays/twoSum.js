/*
Question:
Given an array of integers nums and an integer target, 
return indices of the two numbers such that they add up to target.
You may assume that each input would have exactly one solution, 
and you may not use the same element twice.

You can return the answer in any order.

Solution overview:
For each number, we want to check and see if we can pair the current number
with any previous number to form our target. More formally, for each number,
we compute its completed, and see if we have already seen its complement.
We need to also store the indices of each number as we see it so that
we can return indices in our output. We use the `numToIndexMap` to do this.
*/

const twoSum = (nums, target) => {
    const previousNums = {};

    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        const diff = target - num;

        if (diff in previousNums) {
            return [previousNums[diff], i];
        }

        previousNums[num] = i;
    }
};

const nums = [2, 7, 11, 15];
const target = 9;

console.log(`Your answer: ${twoSum(nums, target)}`);
console.log(`Correct answer: ${[0, 1]}`);
