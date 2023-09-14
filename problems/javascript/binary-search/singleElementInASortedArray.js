/*
Question:
You are given a sorted array consisting of only integers where every element appears exactly twice, 
except for one element which appears exactly once.

Return the single element that appears only once.

Your solution must run in O(log n) time and O(1) space.
*/
const getMidIdx = (rightIdx, leftIdx) => {
    const midIdx = leftIdx + Math.floor((rightIdx - leftIdx) / 2);

    return midIdx;
};

const isOdd = (num) => num % 2 === 1;

const getSingleNonDuplicate = (nums) => {
    let leftIdx = 0;
    let rightIdx = nums.length - 1;

    while (leftIdx < rightIdx) {
        let midIdx = getMidIdx(rightIdx, leftIdx);

        if (isOdd(midIdx)) midIdx--;

        const firstNum = nums[midIdx];
        const secondNum = nums[midIdx + 1];

        if (firstNum === secondNum) leftIdx = midIdx + 2;
        else rightIdx = midIdx--;
    }

    return nums[leftIdx];
};

let nums = [1, 1, 2, 3, 3, 4, 4, 8, 8];

console.log(`Your answer: ${getSingleNonDuplicate(nums)}`);
console.log(`Correct answer: ${2}`);
console.log();

nums = [3, 3, 7, 7, 10, 11, 11];

console.log(`Your answer: ${getSingleNonDuplicate(nums)}`);
console.log(`Correct answer: ${10}`);
console.log();
