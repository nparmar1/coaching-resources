/*
Question:
Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and 
return an array of the non-overlapping intervals that cover all the intervals in the input.
*/

// [[8, 10], [2, 6], [15, 18], [1, 3],]
// [[1, 3], [2, 6], [8, 10], [15, 18]]

const START_IDX = 0;
const END_IDX = 1;

const merge = (intervals) => {
    const mergedIntervals = [];

    const sortedIntervals = intervals.sort(
        (intervalOne, intervalTwo) => intervalOne[START_IDX] - intervalTwo[START_IDX],
    );

    for (const interval of sortedIntervals) {
        const [firstIntervalTime, secondIntervalTime] = interval;

        if (mergedIntervals.length === 0) {
            mergedIntervals.push(interval);
            continue;
        }

        const lastIntervalIdx = mergedIntervals.length - 1;
        const lastInterval = mergedIntervals[lastIntervalIdx];
        const lastIntervalEndTime = lastInterval[END_IDX];

        if (firstIntervalTime <= lastIntervalEndTime) {
            lastInterval[END_IDX] = Math.max(secondIntervalTime, lastIntervalEndTime);
        } else {
            mergedIntervals.push(interval);
        }
    }

    return mergedIntervals;
};

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
