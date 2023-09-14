/*
Question:
Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, 
return the k closest points to the origin (0, 0).

The distance between two points on the X-Y plane is the Euclidean distance (i.e., √(x1 - x2)2 + (y1 - y2)2).
You may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in).
*/

/*
When passing a comparisonFunction, your comparisonFunction should take in
two elements a, b and return a positive number if a is greater than b,
a negative number if a is less than b, and 0 if a is equal to b.

For example, (a, b) => a - b works if we are just dealing with two numbers.
*/

const { MaxHeap } = require('../../../utils/maxHeap');

const getDistance = (xOne, yOne, xTwo, yTwo) => {
    const deltaX = xOne - xTwo;
    const deltaY = yOne - yTwo;

    const distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));

    return distance;
};

const comparsionFunction = (pointOne, pointTwo) => {
    const [xPointOne, yPointOne] = pointOne;
    const [xPointTwo, yPointTwo] = pointTwo;

    const distanceToOriginPointOne = getDistance(xPointOne, yPointOne, 0, 0);
    const distanceToOriginPointTwo = getDistance(xPointTwo, yPointTwo, 0, 0);

    return distanceToOriginPointOne - distanceToOriginPointTwo;
};

const kClosest = (points, k) => {
    const kClosestPoints = new MaxHeap([], comparsionFunction);

    for (const point of points) {
        kClosestPoints.push(point);

        if (kClosestPoints.size() > k) kClosestPoints.pop();
    }

    return kClosestPoints.getElements();
};

let points = [
    [1, 3],
    [-2, 2],
];
let k = 1;

console.log(`Your answer: ${kClosest(points, k)}`);
console.log(`Correct answer: ${[[-2, 2]]}`);
console.log();

points = [
    [3, 3],
    [5, -1],
    [-2, 4],
];
k = 2;

console.log(`Your answer: ${kClosest(points, k)}`);
console.log(
    `Correct answer: ${[
        [-2, 4],
        [3, 3],
    ]}`,
);
console.log();
