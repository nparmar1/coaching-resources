/*
Question:
You are given an integer array coins representing coins of different denominations 
and an integer amount representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. 
If that amount of money cannot be made up by any combination of the coins, return -1.

You may assume that you have an infinite number of each kind of coin.
*/

const CANNOT_PRODUCE_SPECIFIED_AMOUNT = -1;

const coinChange = (coins, targetAmount) => {
    const cache = {};

    cache[0] = 0;

    for (let currAmount = 1; currAmount <= targetAmount; currAmount++) {
        let fewestCoinsToMakeCurAmount = Infinity;

        coins.forEach((coin) => {
            const remainingAmount = currAmount - coin;

            if (remainingAmount < 0) return;

            const containsAmountInCache = cache.hasOwnProperty(remainingAmount);
            const minCoinsToMakeRemainingAmount = containsAmountInCache
                ? cache[remainingAmount]
                : Infinity;

            fewestCoinsToMakeCurAmount = Math.min(
                fewestCoinsToMakeCurAmount,
                minCoinsToMakeRemainingAmount + 1,
            );
        });

        cache[currAmount] = fewestCoinsToMakeCurAmount;
    }

    const result = cache[targetAmount];

    if (result === Infinity) return CANNOT_PRODUCE_SPECIFIED_AMOUNT;

    return result;
};

// let coins = [1, 2, 5];
// amount = 4;

// console.log(`Your answer: ${coinChange(coins, amount)}`);
// console.log(`Correct answer: ${2}`);

coins = [474, 83, 404, 3];
amount = 264;

console.log(`Your answer: ${coinChange(coins, amount)}`);
console.log(`Correct answer: ${8}`);
