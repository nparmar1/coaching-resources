/*
Question:
An array arr a mountain if the following properties hold:

arr.length >= 3
There exists some i with 0 < i < arr.length - 1 such that:
arr[0] < arr[1] < ... < arr[i - 1] < arr[i] 
arr[i] > arr[i + 1] > ... > arr[arr.length - 1]
Given a mountain array arr, return the index i such that arr[0] < arr[1] < ... < arr[i - 1] < arr[i] > arr[i + 1] > ... > arr[arr.length - 1].

You must solve it in O(log(arr.length)) time complexity.
*/

const NOT_FOUND = -1;

const getMidIdx = (leftIdx, rightIdx) => {
    const midIdx = leftIdx + Math.floor((rightIdx - leftIdx) / 2);

    return midIdx;
};

const getPeakOfMountainArray = (array) => {
    let leftIdx = 0;
    let rightIdx = array.length - 1;

    let peakIdx = NOT_FOUND;
    while (leftIdx <= rightIdx) {
        const midIdx = getMidIdx(leftIdx, rightIdx);
        const midValue = array[midIdx];

        const isDescending = midValue > array[midIdx + 1];
        if (isDescending) {
            peakIdx = midIdx;
            rightIdx = midIdx - 1;
        } else leftIdx = midIdx + 1;
    }

    return peakIdx;
};

let arr = [0, 1, 0];

console.log(`Your answer: ${getPeakOfMountainArray(arr)}`);
console.log(`Correct answer: ${1}`);
console.log();

arr = [0, 2, 1, 0];

console.log(`Your answer: ${getPeakOfMountainArray(arr)}`);
console.log(`Correct answer: ${1}`);
console.log();

arr = [0, 10, 5, 2];

console.log(`Your answer: ${getPeakOfMountainArray(arr)}`);
console.log(`Correct answer: ${1}`);
console.log();
