/*
Question:
Given a sorted array of integers and a target integer, find the first 
occurrence of the target and return its index. Return -1 if the target is 
not in the array.
*/

const NOT_FOUND = -1;

const getMidIdx = (leftIdx, rightIdx) => {
    const midIdx = leftIdx + Math.floor((rightIdx - leftIdx) / 2);

    return midIdx;
};

const findFirstOccurrence = (array, target) => {
    let leftIdx = 0;
    let rightIdx = array.length - 1;

    let firstOccurrenceOfTargetIndex = NOT_FOUND;

    while (leftIdx <= rightIdx) {
        const midIdx = getMidIdx(leftIdx, rightIdx);
        const midValue = array[midIdx];

        if (midValue === target) firstOccurrenceOfTargetIndex = midIdx;
        if (midValue < target) leftIdx = leftIdx + 1;
        else rightIdx = rightIdx - 1;
    }

    return firstOccurrenceOfTargetIndex;
};

let arr = [1, 3, 3, 3, 3, 6, 10, 10, 10, 100];
let target = 10;

console.log(`Your answer: ${findFirstOccurrence(arr, target)}`);
console.log(`Correct answer: ${6}`);
console.log();

arr = [2, 3, 5, 7, 11, 13, 17, 19];
target = 6;

console.log(`Your answer: ${findFirstOccurrence(arr, target)}`);
console.log(`Correct answer: ${-1}`);
console.log();
