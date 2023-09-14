/*
Question:
You are given an array prices where prices[i] is the price of a given stock on the ith day.
You want to maximize your profit by choosing a single day to buy one stock and choosing a 
different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. 
If you cannot achieve any profit, return 0.

For each stock price, we compute the max profit using that stock price. To do so, we need to know the minimum 
stock price that appears BEFORE the current stock price. Thus, we continuously track the minimum stock price so far. 
Then, at each stock, we compute the max profit using the current stock (which is cur stock price - min price so far) 
and keep a running variable for our max profit.
*/
const maxProfit = (prices) => {
    let left = 0;
    let right = 1;

    let maxProfit = 0;

    while (right < prices.length) {
        if (prices[left] < prices[right]) {
            const profit = prices[right] - prices[left];
            maxProfit = Math.max(maxProfit, profit);
        } else {
            left = right;
        }
        right++;
    }

    return maxProfit;
};

const prices = [7, 1, 5, 3, 6, 4];

console.log(`Your answer: ${maxProfit(prices)}`);
console.log(`Correct answer: ${5}`);
