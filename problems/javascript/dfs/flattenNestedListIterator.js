/*
You are given a nested list of integers nestedList. Each element is either an integer or a list whose elements may also be integers or other lists. 
Implement an iterator to flatten it.

Implement the NestedIterator class:

NestedIterator(List<NestedInteger> nestedList) Initializes the iterator with the nested list nestedList.
int next() Returns the next integer in the nested list.
boolean hasNext() Returns true if there are still some integers in the nested list and false otherwise.
Your code will be tested with the following pseudocode:

initialize iterator with nestedList
res = []
while iterator.hasNext()
    append iterator.next() to the end of res
return res

If res matches the expected flattened list, then your code will be judged as correct.
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
 *     Return the nested list that this NestedInteger holds, if it holds a nested list
 *     Return null if this NestedInteger holds a single integer
 *     @return {NestedInteger[]}
 *     this.getList = function() {
 *         ...
 *     };
 * };
 */

class NestedIterator {
    constructor(nestedList) {
        this.flattenedList = this.flattenList(nestedList);
        this.nextPosition = 0;
    }

    flattenList(nestedList) {
        const flattenedList = [];

        for (const nestedInteger of nestedList) {
            if (nestedInteger.isInteger()) {
                const integer = nestedInteger.getInteger();
                flattenedList.push(integer);
            } else {
                const nestedIntegerList = nestedInteger.getList();
                const flattenedNestedIntegerList = this.flattenList(nestedIntegerList);

                for (const integer of flattenedNestedIntegerList) {
                    flattenedList.push(integer);
                }
            }
        }
        return flattenedList;
    }

    hasNext() {
        return this.nextPosition < this.flattenedList.length;
    }

    next() {
        const integerToReturn = this.flattenedList[this.nextPosition];
        this.nextPosition++;

        return integerToReturn;
    }
}

const nestedList = [1, [4, [6]]];
