/*
Question:
Implement the RandomizedSet class:

RandomizedSet() Initializes the RandomizedSet object.
bool insert(int val) Inserts an item val into the set if not present. 
Returns true if the item was not present, false otherwise.

bool remove(int val) Removes an item val from the set if present. 
Returns true if the item was present, false otherwise.

int getRandom() Returns a random element from the current set of elements 
(it's guaranteed that at least one element exists when this method is called). 
Each element must have the same probability of being returned.

You must implement the functions of the class such that each function works in average O(1) time complexity.
*/

class RandomizedSet {
    constructor() {
        this.valueToIdxMap = {};
        this.stack = [];
    }

    insert(newValue) {
        const hasNewValue = this.valueToIdxMap.hasOwnProperty(newValue);
        if (hasNewValue) return false;

        this.stack.push(newValue);

        const lastValueIdx = this.stack.length - 1;
        this.valueToIdxMap[newValue] = lastValueIdx;

        return true;
    }

    swapValues(i, j) {
        const iValue = this.stack[i];
        const jValue = this.stack[j];

        this.valueToIdxMap[iValue] = j;
        this.valueToIdxMap[jValue] = i;

        const temp = this.stack[i];
        this.stack[i] = this.stack[j];
        this.stack[j] = temp;
    }

    remove(valueToRemove) {
        const containsValueToRemove = this.valueToIdxMap.hasOwnProperty(valueToRemove);
        if (!containsValueToRemove) return false;

        const valueToRemoveIdx = this.valueToIdxMap[valueToRemove];
        const lastSwapValueIdx = this.stack.length - 1;

        this.swapValues(valueToRemoveIdx, lastSwapValueIdx);

        delete this.valueToIdxMap[valueToRemove];
        this.stack.pop();

        return true;
    }

    getRandom() {
        const range = this.stack.length - 0;
        const randomIdx = Math.floor(Math.random() * range);

        return this.stack[randomIdx];
    }
}
