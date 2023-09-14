/*
Question:
Given a positive integer num, return true if num is a perfect square or false otherwise.

A perfect square is an integer that is the square of an integer. In other words, it is the product of some integer with itself.

You must not use any built-in library function, such as sqrt.
*/

const getMidNum = (leftNum, rightNum) => {
    const midNum = leftNum + Math.floor((rightNum - leftNum) / 2);

    return midNum;
};

const isPerfectSquare = (num) => {
    let leftNum = 0;
    let rightNum = num;

    while (leftNum <= rightNum) {
        const midNum = getMidNum(leftNum, rightNum);
        const midNumSquared = midNum * midNum;

        if (midNumSquared === num) return true;
        else if (midNumSquared > num) rightNum = midNum - 1;
        else leftNum = midNum + 1;
    }

    return false;
};

let num = 9;

console.log(`Your answer: ${isPerfectSquare(num)}`);
console.log(`Correct answer: ${true}`);
console.log();

// num = 14;

// console.log(`Your answer: ${isPerfectSquare(num)}`);
// console.log(`Correct answer: ${false}`);
// console.log();

// num = 2147483647;

// console.log(`Your answer: ${isPerfectSquare(num)}`);
// console.log(`Correct answer: ${false}`);
// console.log();
