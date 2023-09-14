/*
Question:
You are given a nested list of integers nestedList. 
Each element is either an integer or a list whose elements may also be integers or other lists.

The depth of an integer is the number of lists that it is inside of. 
For example, the nested list [1,[2,2],[[3],2],1] has each integer's value set to its depth.

Return the sum of each integer in nestedList multiplied by its depth.
*/

/**
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation
 * function NestedInteger() {
 *
 *     Return true if this NestedInteger holds a single integer, rather than a nested list.
 *     @return {boolean}
 *     this.isInteger = function() {
 *         ...
 *     };
 *
 *     Return the single integer that this NestedInteger holds, if it holds a single integer
 *     Return null if this NestedInteger holds a nested list
 *     @return {integer}
 *     this.getInteger = function() {
 *         ...
 *     };
 *
 *     Set this NestedInteger to hold a single integer equal to value.
 *     @return {void}
 *     this.setInteger = function(value) {
 *         ...
 *     };
 *
 *     Set this NestedInteger to hold a nested list and adds a nested integer elem to it.
 *     @return {void}
 *     this.add = function(elem) {
 *         ...
 *     };
 *
 *     Return the nested list that this NestedInteger holds, if it holds a nested list
 *     Return null if this NestedInteger holds a single integer
 *     @return {NestedInteger[]}
 *     this.getList = function() {
 *         ...
 *     };
 * };
 */

const computeDepthSum = (nestedList, curDepth) => {
    let curDepthSum = 0;

    for (const nestedInteger of nestedList) {
        if (nestedInteger.isInteger()) {
            const integer = nestedInteger.getInteger();
            curDepthSum += integer * curDepth;
        } else {
            const innerList = nestedInteger.getList();
            curDepthSum += computeDepthSum(innerList, curDepth + 1);
        }
    }
    return curDepthSum;
};

const depthSum = (nestedList) => {
    const initialDepth = 1;
    return computeDepthSum(nestedList, initialDepth);
};
