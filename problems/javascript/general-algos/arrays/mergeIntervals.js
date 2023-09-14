/*
Question:
Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and 
return an array of the non-overlapping intervals that cover all the intervals in the input.
*/

const START_IDX = 0;
const END_IDX = 1;

const merge = (intervals) => {
    const sortedIntervals = intervals.sort(
        (intervalOne, intervalTwo) => intervalOne[START_IDX] - intervalTwo[START_IDX],
    );

    const mergedIntervals = [];

    for (const newInterval of sortedIntervals) {
        const [newIntervalStartTime, newIntervalEndTime] = newInterval;

        if (mergedIntervals.length === 0) {
            mergedIntervals.push(newInterval);
            continue;
        }

        const lastIdx = mergedIntervals.length - 1;
        const lastInterval = mergedIntervals[lastIdx];
        const lastIntervalEndTime = lastInterval[END_IDX];

        if (newIntervalStartTime <= lastIntervalEndTime) {
            lastInterval[END_IDX] = Math.max(newIntervalEndTime, lastIntervalEndTime);
        } else {
            mergedIntervals.push(newInterval);
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
