/*
Question:
You are given an array prices where prices[i] is the price of a given stock on the ith day.
You want to maximize your profit by choosing a single day to buy one stock and choosing a 
different day in the future to sell that stock.
*/

const isPalindrome = (string) => {
    string = string.replace(/[^a-z0-9]/gi, '').toLowerCase();

    let leftIdx = 0;
    let rightIdx = string.length - 1;

    while (leftIdx < rightIdx) {
        if (string[leftIdx] !== string[rightIdx]) return false;

        leftIdx++;
        rightIdx--;
    }

    return true;
};

const s = 'A man, a plan, a canal: Panama';

console.log(`Your answer: ${isPalindrome(s)}`);
console.log(`Correct answer: ${true}`);
