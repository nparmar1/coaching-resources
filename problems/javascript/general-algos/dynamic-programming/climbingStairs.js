/*
Question:
You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
*/

const climbStairs = (numSteps) => {
    const numWaysToReachStep = new Array(numSteps + 1).fill(0);

    numWaysToReachStep[0] = 1;
    numWaysToReachStep[1] = 1;

    for (let i = 2; i <= numSteps; i++) {
        numWaysToReachStep[i] = numWaysToReachStep[i - 1] + numWaysToReachStep[i - 2];
    }

    return numWaysToReachStep[numSteps];
};

let n = 2;

console.log(`Your answer: ${climbStairs(n)}`);
console.log(`Correct answer: ${2}`);

n = 3;

console.log(`Your answer: ${climbStairs(n)}`);
console.log(`Correct answer: ${3}`);
