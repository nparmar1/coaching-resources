/*
Question:
The Fibonacci numbers, commonly denoted F(n) form a sequence, 
called the Fibonacci sequence, such that each number is the sum of the two preceding ones, 
starting from 0 and 1. That is,

F(0) = 0, F(1) = 1
F(n) = F(n - 1) + F(n - 2), for n > 1.
Given n, calculate F(n).
*/

const getFib = (n) => {
    // Base case
    if (n === 0) return 0;

    if (n === 1) return 1;

    // Recursive case
    return getFib(n - 1) + getFib(n - 2);
};

let n = 2;

console.log(`Your answer: ${getFib(n)}`);
console.log(`Correct answer: ${1}`);

n = 3;

console.log(`Your answer: ${getFib(n)}`);
console.log(`Correct answer: ${2}`);

n = 4;

console.log(`Your answer: ${getFib(n)}`);
console.log(`Correct answer: ${3}`);
