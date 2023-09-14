/*
Question:
Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and 
return an array of the non-overlapping intervals that cover all the intervals in the input.
*/



const intervals = [
    [8, 10],
    [2, 6],
    [15, 18],
    [1, 3],
];

console.log(`Your answer: ${merge(intervals)}`);
console.log(
    `Correct answer: ${[
        [1, 6],
        [8, 10],
        [15, 18],
    ]}`,
);
