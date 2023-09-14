/*
Initial question:
You have 100 USD and you’re traveling to Japan. You need to convert your USD to JPY, but there is no direct way to do so, you must convert to other currencies first. Each conversion costs 0.10 USD. Find the minimum cost to convert your USD to JPY.

Input:
[['USD', 'EUR', 0.8], ['EUR', 'GBP', 1.1], ['GBP', 'INR', 1.5], ['INR', 'JPY', 0.3], ['USD', 'MXN', 1.5], ['MXN', 'BRL', 0.9], ['BRL', 'EGP', 1.2], ['BRL', 'ZAR', 0.7], ['EGP', 'RMB', 0.2], ['ZAR', 'RMB', 1.4], ['RMB', 'JPY', 0.3]]

Output: 0.40
USD => EUR => GBP => INR => JPY
*/

// const CONVERSION_FEE = 0.1;
// const CONVERSION_NOT_POSSIBLE = -1;

// const buildGraph = (edges) => {
//   const graph = {};

//   for (const edge of edges) {
//     const startCurrency = edge[0];
//     const endCurrency = edge[1];

//     const startCurrencyInGraph = graph.hasOwnProperty(startCurrency);
//     const endCurrencyInGraph = graph.hasOwnProperty(endCurrency);

//     if (!startCurrencyInGraph) graph[startCurrency] = [];
//     if (!endCurrencyInGraph) graph[endCurrency] = [];

//     graph[startCurrency].push(endCurrency);
//     graph[endCurrency].push(startCurrency);
//   }

//   return graph;
// }

// const calculateMinConversionFee = (startCurrency, targetCurrency, currencyConversions) => {
//   const graph = buildGraph(currencyConversions);

//   // I'm using an array for the queue so that I can test it, but in a real interview, I'd use `const queue = new Queue();`
//   const queue = [];
//   const visited = new Set();

//   queue.push({
//     currency: startCurrency,
//     numConversionsSoFar: 0
//   });
//   visited.add(startCurrency);

//   while (queue.length > 0) {
//     // Remove node
//     const { currency, numConversionsSoFar } = queue.shift();

//     // Process node
//     if (currency === targetCurrency) {
//       const minConversionFee = numConversionsSoFar * CONVERSION_FEE;
//       return minConversionFee;
//     }

//     // Add neighbors
//     const neighbors = graph[currency];
//     for (const neighbor of neighbors) {
//       if (visited.has(neighbor)) continue;
//       visited.add(neighbor);

//       queue.push({
//         currency: neighbor,
//         numConversionsSoFar: numConversionsSoFar + 1
//       });
//     }
//   }

//   return CONVERSION_NOT_POSSIBLE;
// }

// const getMinConversionFeeFromUsdToJpy = (currencyConversions) => {
//   const startCurrency = 'USD';
//   const targetCurrency = 'JPY';

//   return calculateMinConversionFee(startCurrency, targetCurrency, currencyConversions);
// }

// const currencyConversions = [['USD', 'EUR', 0.8], ['EUR', 'GBP', 1.1], ['GBP', 'INR', 1.5], ['INR', 'JPY', 0.3], ['USD', 'MXN', 1.5], ['MXN', 'BRL', 0.9], ['BRL', 'EGP', 1.2], ['BRL', 'ZAR', 0.7], ['EGP', 'RMB', 0.2], ['ZAR', 'RMB', 1.4], ['RMB', 'JPY', 0.3]];

// console.log(getMinConversionFeeFromUsdToJpy(currencyConversions));

/*
Follow-up #1
Determine the value of our 100 USD in JPY if we use this shortest path.

Input:
[['USD', 'EUR', 0.8], ['EUR', 'GBP', 1.1], ['GBP', 'INR', 1.5], ['INR', 'JPY', 0.3], ['USD', 'MXN', 1.5], ['MXN', 'BRL', 0.9], ['BRL', 'EGP', 1.2], ['BRL', 'ZAR', 0.7], ['EGP', 'RMB', 0.2], ['ZAR', 'RMB', 1.4], ['RMB', 'JPY', 0.3]]

Output: 39.6
USD => EUR => GBP => INR => JPY
    0.8    1.1    1.5    0.3

100 * 0.8 * 1.1 * 1.5 * 0.3 = 39.6
*/

const CONVERSION_NOT_POSSIBLE = -1;
const CONVERSION_FEE = 0.1;
const START_CURRENCY_AMOUNT = 100;

class CurrencyNode {
    constructor(currency, numConversionsSoFar, currencyAmount) {
        this.currency = currency;
        this.numConversionsSoFar = numConversionsSoFar;
        this.currencyAmount = currencyAmount; // This tells us the numerical value we have of the current currency (e.g. if we had 100 USD then did USD => EUR, we'd have 80 EUR, so the currencyAmount would be 80)
    }
}

class ConversionOutput {
    constructor(minConversionFee, targetCurrencyAmount) {
        this.minConversionFee = minConversionFee;
        this.targetCurrencyAmount = targetCurrencyAmount;
    }
}

const buildGraph = (edges) => {
    const graph = {};

    for (const edge of edges) {
        const [startCurrency, endCurrency, conversionRate] = edge;

        const startCurrencyInGraph = graph.hasOwnProperty(startCurrency);
        const endCurrencyInGraph = graph.hasOwnProperty(endCurrency);

        if (!startCurrencyInGraph) graph[startCurrency] = [];
        if (!endCurrencyInGraph) graph[endCurrency] = [];

        graph[startCurrency].push({
            currency: endCurrency,
            conversionRate,
        });
        graph[endCurrency].push({
            currency: startCurrency,
            conversionRate: 1 / conversionRate,
        });
    }

    return graph;
};

const findCheapestConversion = (startCurrency, targetCurrency, currencyConversions) => {
    const graph = buildGraph(currencyConversions);

    // I'm using an array for the queue so that I can test it, but in a real interview, I'd use `const queue = new Queue();`
    const queue = [];
    const visited = new Set();

    const startNode = new CurrencyNode(startCurrency, 0, START_CURRENCY_AMOUNT);
    queue.push(startNode);
    visited.add(startNode.currency);

    while (queue.length > 0) {
        // Remove node
        const { currency, numConversionsSoFar, currencyAmount } = queue.shift();

        // Process node
        if (currency === targetCurrency) {
            const minConversionFee = numConversionsSoFar * CONVERSION_FEE;

            return new ConversionOutput(minConversionFee, currencyAmount);
        }

        // Add neighbors
        const neighbors = graph[currency];
        for (const neighbor of neighbors) {
            const { currency: neighboringCurrency, conversionRate } = neighbor;

            if (visited.has(neighboringCurrency)) continue;
            visited.add(neighboringCurrency);

            queue.push({
                currency: neighboringCurrency,
                numConversionsSoFar: numConversionsSoFar + 1,
                currencyAmount: currencyAmount * conversionRate,
            });
        }
    }

    return new ConversionOutput(CONVERSION_NOT_POSSIBLE, CONVERSION_NOT_POSSIBLE);
};

const findCheapestConversionFromUsdToJpy = (currencyConversions) => {
    const startCurrency = 'USD';
    const targetCurrency = 'JPY';

    return findCheapestConversion(startCurrency, targetCurrency, currencyConversions);
};

const currencyConversions = [
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

console.log(findCheapestConversionFromUsdToJpy(currencyConversions));
