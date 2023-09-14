/* 
Multi-sourced BFS solution, passes on LeetCode 

Given an m x n binary matrix mat, return the distance of the nearest 0 for each cell.
The distance between two adjacent cells is 1.
*/

const { Queue } = require('../../../utils/queue');

const matrix = [
    [0, 0, 0],
    [0, 1, 0],
    [1, 1, 1],
];

console.log(`Your answer: ${getDistanceFromZero(matrix)}`);
console.log(
    `Correct answer: ${[
        [0, 0, 0],
        [0, 1, 0],
        [1, 2, 1],
    ]}`,
);
