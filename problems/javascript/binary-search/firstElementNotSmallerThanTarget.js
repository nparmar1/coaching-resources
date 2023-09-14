/*
Question:
Given an array of integers sorted in increasing order and a target, find 
the index of the first element in the array that is larger than or equal 
to the target. Assume that it is guaranteed to find a satisfying number.
*/

const NOT_FOUND = -1;

const getMidIdx = (leftIdx, rightIdx) => {
    const midIdx = leftIdx + Math.floor((rightIdx - leftIdx) / 2);

    return midIdx;
};

const findFirstNotSmaller = (array, target) => {
    let leftIdx = 0;
    let rightIdx = array.length;

    let firstElementLargerOrEqualtoTarget = NOT_FOUND;

    while (leftIdx <= rightIdx) {
        const midIdx = getMidIdx(leftIdx, rightIdx);
        const midValue = array[midIdx];

        if (midValue >= target) {
            firstElementLargerOrEqualtoTarget = midIdx;
            rightIdx = rightIdx - 1;
        } else leftIdx = leftIdx + 1;
    }

    return firstElementLargerOrEqualtoTarget;
};

let array = [1, 3, 3, 5, 8, 8, 10];
let target = 2;

console.log(`Your answer: ${findFirstNotSmaller(array, target)}`);
console.log(`Correct answer: ${1}`);
console.log();

array = [2, 3, 5, 7, 11, 13, 17, 19];
target = 6;

console.log(`Your answer: ${findFirstNotSmaller(array, target)}`);
console.log(`Correct answer: ${3}`);
console.log();
