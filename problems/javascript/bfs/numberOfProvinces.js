/*
Question:
There are n cities. Some of them are connected, while some are not. If city a is connected directly with city b, 
and city b is connected directly with city c, then city a is connected indirectly with city c.

A province is a group of directly or indirectly connected cities and no other cities outside of the group.

You are given an n x n matrix isConnected where isConnected[i][j] = 1 if the ith city and 
the jth city are directly connected, and isConnected[i][j] = 0 otherwise.

Return the total number of provinces.
*/

//    0  1  2
// 0 [1, 1, 0],
// 1 [1, 1, 0],
// 2 [0, 0, 1],

const { Queue } = require('../../../utils/queue');
const CONNECTED = 1;

const getChildren = (node, matrix) => {
    const row = matrix[node].length;
    const children = [];

    for (let childNode = 0; childNode < row; childNode++) {
        const isSelf = childNode === node;
        const isChildren = matrix[node][childNode] !== CONNECTED;

        if (isSelf) continue;
        if (isChildren) continue;

        children.push([childNode]);
    }

    return children;
};

const markAsVisited = (city, matrix, visited) => {
    const queue = new Queue();

    queue.enqueue([city]);

    while (queue.size() > 0) {
        const [city] = queue.dequeue();

        // Process node

        const children = getChildren(city, matrix);
        for (const child of children) {
            const [city] = child;

            if (visited.has(city)) continue;

            visited.add(city);
            queue.enqueue([city]);
        }
    }
};

const numberOfProvinces = (matrix) => {
    const visited = new Set();
    let numberOfProvinces = 0;
    const cities = matrix.length;

    for (let city = 0; city < cities; city++) {
        if (visited.has(city)) continue;

        numberOfProvinces++;
        visited.add(city);

        markAsVisited(city, matrix, visited);
    }

    return numberOfProvinces;
};

const isConnected = [
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 1],
];
console.log(`Your answer: ${numberOfProvinces(isConnected)}`);
console.log(`Correct answer: ${2}`);
