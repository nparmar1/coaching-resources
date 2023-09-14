/*
Question:
An array of boolean values is divided into two sections; the left section 
consists of all false and the right section consists of all true. Find the 
First True in a Sorted Boolean Array of the right section, i.e. the index 
of the first true element. If there is no true element, return -1.
*/

// TODO: write your code here
const NOT_TRUE_ELEMENT_FOUND = -1;

const getMidIdx = (leftIdx, rightIdx) => {
    const midIdx = leftIdx + Math.floor((rightIdx - leftIdx) / 2);

    return midIdx;
};

const findBoundary = (booleans) => {
    let leftIdx = 0;
    let rightIdx = booleans.length - 1;

    let firstTrueIdx = NOT_TRUE_ELEMENT_FOUND;

    while (leftIdx <= rightIdx) {
        const midIdx = getMidIdx(leftIdx, rightIdx);
        const midValue = booleans[midIdx];

        if (midValue) {
            firstTrueIdx = midIdx;
            rightIdx = rightIdx - 1;
        } else leftIdx = leftIdx + 1;
    }

    return firstTrueIdx;
};

const booleans = [false, false, true, true, true];

console.log(`Your answer: ${findBoundary(booleans)}`);
console.log(`Correct answer: ${2}`);
console.log();
