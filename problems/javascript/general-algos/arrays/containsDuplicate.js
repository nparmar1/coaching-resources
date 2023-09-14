/*
Question:
Given an integer array nums, return true if any value appears at least twice in the array, 
and return false if every element is distinct.

Solution overview:
Track numbers we've seen so far. If we hit an element that we've already seen, return
true.
*/
const containsDuplicate = (nums) => {
    const seenNums = new Set();

    for (const num of nums) {
        if (seenNums.has(num)) return true;
        seenNums.add(num);
    }

    return false;
};

const nums = [1, 2, 3, 1];

console.log(`Your answer: ${containsDuplicate(nums)}`);
console.log(`Correct answer: ${true}`);
