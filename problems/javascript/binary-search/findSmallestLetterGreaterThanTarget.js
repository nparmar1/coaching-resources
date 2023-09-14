/*
Question:
You are given an array of characters letters that is sorted in non-decreasing order, 
and a character target. There are at least two different characters in letters.

Return the smallest character in letters that is lexicographically greater than target. 
If such a character does not exist, return the first character in letters.
*/

// Target: c
// c f j
// 0 1 2

const getMidIdx = (leftIdx, rightIdx) => {
    const midIdx = leftIdx + Math.floor((rightIdx - leftIdx) / 2);

    return midIdx;
};

const findNextGreatestLetter = (letters, target) => {
    let leftIdx = 0;
    let rightIdx = letters.length - 1;

    let nextGreatestLetter = letters[0];
    while (leftIdx <= rightIdx) {
        const midIdx = getMidIdx(leftIdx, rightIdx);

        if (letters[midIdx] > target) {
            nextGreatestLetter = letters[midIdx];
            rightIdx = midIdx - 1;
        } else {
            leftIdx = midIdx + 1;
        }
    }

    return nextGreatestLetter;
};

let letters = ['c', 'f', 'j'];
let target = 'a';

console.log(`Your answer: ${findNextGreatestLetter(letters, target)}`);
console.log(`Correct answer: ${'c'}`);
console.log();

letters = ['c', 'f', 'j'];
target = 'c';

console.log(`Your answer: ${findNextGreatestLetter(letters, target)}`);
console.log(`Correct answer: ${'f'}`);
console.log();
