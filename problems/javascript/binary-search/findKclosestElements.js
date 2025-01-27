/*
Question:
Given a sorted integer array arr, two integers k and x, 
return the k closest integers to x in the array. The result should also be sorted in ascending order.

An integer a is closer to x than an integer b if:

|a - x| < |b - x|, or
|a - x| == |b - x| and a < b
*/

// Target: c
// c f j
// 0 1 2

let arr = [1, 2, 3, 4, 5];
let k = 4;
let x = 3;

console.log(`Your answer: ${findClosestElements(arr, k, x)}`);
console.log(`Correct answer: ${[1, 2, 3, 4]}`);
console.log();

arr = [1, 2, 3, 4, 5];
k = 4;
x = -1;

console.log(`Your answer: ${findClosestElements(arr, k, x)}`);
console.log(`Correct answer: ${[1, 2, 3, 4]}`);
console.log();
