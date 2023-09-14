/*
Question:
Given an integer array nums, return an array answer such that answer[i] 
is equal to the product of all the elements of nums except nums[i].

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
You must write an algorithm that runs in O(n) time and without using the division operation.

First find products from beginning to index. Then find products from end to index. Multiply these together to get products except self.
*/

const productExceptSelf = (nums) => {
    const results = [];

    let productSoFar = 1;
    //Prefix array
    for (let i = 0; i < nums.length; i++) {
        results[i] = productSoFar;
        productSoFar *= nums[i];
    }

    productSoFar = 1;
    //Postfix array
    for (let i = nums.length - 1; i >= 0; i--) {
        results[i] *= productSoFar;
        productSoFar *= nums[i];
    }

    return results;
};

const nums = [1, 2, 3, 4];

console.log(`Your answer: ${productExceptSelf(nums)}`);
console.log(`Correct answer: ${[24, 12, 8, 6]}`);
