/*
Question:
Given an integer n, return the least number of perfect square numbers that sum to n.

A perfect square is an integer that is the square of an integer; 
in other words, it is the product of some integer with itself. 
For example, 1, 4, 9, and 16 are perfect squares while 3 and 11 are not.
*/

const numSquares = (n) => {
    const cache = new Array(n + 1).fill(Infinity);
    cache[0] = 0;

    for (let num = 1; num <= n; num++) {
        let integer = 1;
        let perfectSquare = 1;

        while (perfectSquare <= num) {
            const currRemaningAmount = num - perfectSquare;
            cache[num] = Math.min(cache[num], cache[currRemaningAmount] + 1);
            integer++;
            perfectSquare = integer * integer;
        }
    }

    return cache[n];
};

let n = 12;

console.log(`Your answer: ${numSquares(n)}`);
console.log(`Correct answer: ${3}`);
