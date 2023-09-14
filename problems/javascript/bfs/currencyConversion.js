/*
Initial question:
You have 100 USD and you’re traveling to Japan. You need to convert your USD to JPY, but there is no direct way to do so, you must convert to other currencies first. 
Each conversion costs 0.10 USD. Find the minimum cost to convert your USD to JPY.

Input:
[['USD', 'EUR', 0.8], ['EUR', 'GBP', 1.1], ['GBP', 'INR', 1.5], ['INR', 'JPY', 0.3], ['USD', 'MXN', 1.5], ['MXN', 'BRL', 0.9], ['BRL', 'EGP', 1.2], ['BRL', 'ZAR', 0.7], ['EGP', 'RMB', 0.2], ['ZAR', 'RMB', 1.4], ['RMB', 'JPY', 0.3]]

Output: 0.40
USD => EUR => GBP => INR => JPY
*/

const { Queue } = require('../../../utils/queue');

const input = [
    ['USD', 'EUR', 0.8],
    ['EUR', 'GBP', 1.1],
    ['GBP', 'INR', 1.5],
    ['INR', 'JPY', 0.3],
    ['USD', 'MXN', 1.5],
    ['MXN', 'BRL', 0.9],
    ['BRL', 'EGP', 1.2],
    ['BRL', 'ZAR', 0.7],
    ['EGP', 'RMB', 0.2],
    ['ZAR', 'RMB', 1.4],
    ['RMB', 'JPY', 0.3],
];

const buildGraph = (edges) => {
    const graph = {};

    for (const edge of edges) {
        const [nodeOne, nodeTwo] = edge;

        const isNodeOneProperty = graph.hasOwnProperty(nodeOne);
        const isNodeTwoProperty = graph.hasOwnProperty(nodeTwo);

        if (!isNodeOneProperty) graph[nodeOne] = [];
        if (!isNodeTwoProperty) graph[nodeTwo] = [];

        graph[nodeOne].push(nodeTwo);
        graph[nodeTwo].push(nodeOne);
    }

    return graph;
};

const currencyConversation = (edges) => {
    const queue = new Queue();
    const visited = new Set();

    visited.add('USD');

    queue.enqueue({ country: 'USD', pathSoFar: 0 });

    const graph = buildGraph(edges);
    while (queue.size() > 0) {
        const { country, pathSoFar } = queue.dequeue();

        console.log;
        // Process Node
        if (country === 'JPY') return pathSoFar * 0.1;

        const children = graph[country];
        for (const child of children) {
            if (visited.has(child)) continue;

            visited.add(child);
            queue.enqueue({ country: child, pathSoFar: pathSoFar + 1 });
        }
    }
};

console.log(`${currencyConversation(input)}`);
