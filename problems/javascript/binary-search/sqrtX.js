/*
Question:
Given a non-negative integer x, return the square root of x rounded down to the nearest integer.
The returned integer should be non-negative as well.

You must not use any built-in exponent function or operator.
For example, do not use pow(x, 0.5) in c++ or x ** 0.5 in python.
*/

// midNum * midNum >= n
// 1 2 3 4 5 6 7 8
// F F T T T T T T

// midNum * midNum <= n
// 1 2 3 4 5 6 7 8
// T T F F F F F F

const NOT_FOUND = -1;

const getMidNum = (leftNum, rightNum) => {
    const midNum = leftNum + Math.floor((rightNum - leftNum) / 2);

    return midNum;
};

const getMySqrt = (num) => {
    let leftNum = 0;
    let rightNum = num;

    let roundedDownSquareRoot = NOT_FOUND;

    while (leftNum <= rightNum) {
        const midNum = getMidNum(leftNum, rightNum);
        const midNumSquare = midNum * midNum;

        if (midNumSquare <= num) {
            roundedDownSquareRoot = midNum;
            leftNum = midNum + 1;
        } else rightNum = midNum - 1;
    }

    return roundedDownSquareRoot;
};

const x = 4;

console.log(`Your answer: ${getMySqrt(x)}`);
console.log(`Correct answer: ${2}`);

// x = 8;

// console.log(`Your answer: ${getMySqrt(x)}`);
// console.log(`Correct answer: ${2}`);
