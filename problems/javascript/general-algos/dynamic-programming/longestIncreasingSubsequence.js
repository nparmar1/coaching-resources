/*
Question:
Given an integer array nums, return the length of the longest strictly increasing 
subsequence.
*/

const lengthOfLIS = (nums) => {
    if (!nums.length) return 0;

    let cache = new Array(nums.length).fill(1);

    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) cache[i] = Math.max(cache[i], cache[j] + 1);
        }
    }

    return Math.max(...cache);
};

nums = [10, 9, 2, 5, 3, 7, 101, 18];

console.log(`Your answer: ${lengthOfLIS(nums)}`);
console.log(`Correct answer: ${4}`);
