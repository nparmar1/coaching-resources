/*
Question:
The median is the middle value in an ordered integer list. 
If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.

For example, for arr = [2,3,4], the median is 3.
For example, for arr = [2,3], the median is (2 + 3) / 2 = 2.5.
Implement the MedianFinder class:

MedianFinder() initializes the MedianFinder object.
void addNum(int num) adds the integer num from the data stream to the data structure.
double findMedian() returns the median of all elements so far. 
Answers within 10-5 of the actual answer will be accepted.
/*

When passing a comparisonFunction, your comparisonFunction should take in
two elements a, b and return a positive number if a is greater than b,
a negative number if a is less than b, and 0 if a is equal to b.

For example, (a, b) => a - b works if we are just dealing with two numbers.
*/

class MinHeap {
    constructor(elements = [], comparisonFunction = null) {
        this.elements = elements;

        this.comparisonFunction =
            comparisonFunction !== null ? comparisonFunction : (a, b) => a - b;

        this.FIRST_IDX = 0;

        for (let i = this.FIRST_IDX; i < this.elements.length; i += 1) {
            this.siftDown(i);
        }
    }

    push(value) {
        this.elements.push(value);

        const lastIdx = this.size() - 1;
        this.siftUp(lastIdx);
    }

    peek() {
        if (this.size() === 0) return null;
        return this.elements[this.FIRST_IDX];
    }

    swapElements(i, j) {
        const temp = this.elements[i];
        this.elements[i] = this.elements[j];
        this.elements[j] = temp;
    }

    pop() {
        if (this.size() === 0) return null;

        const lastIdx = this.size() - 1;
        this.swapElements(this.FIRST_IDX, lastIdx);

        const elementToReturn = this.elements.pop();
        this.siftDown(this.FIRST_IDX);

        return elementToReturn;
    }

    size() {
        return this.elements.length;
    }

    getParentIdx(curIdx) {
        return Math.floor((curIdx - 1) / 2);
    }

    getLeftChildIdx(parentIdx) {
        // TODO: change?
        return parentIdx * 2 + 1;
    }

    getRightChildIdx(parentIdx) {
        return parentIdx * 2 + 2;
    }

    siftUp(curIdx) {
        while (curIdx > this.FIRST_IDX) {
            const parentIdx = this.getParentIdx(curIdx);

            const curElement = this.elements[curIdx];
            const parentElement = this.elements[parentIdx];

            if (this.comparisonFunction(parentElement, curElement) > 0) {
                this.swapElements(curIdx, parentIdx);
                curIdx = parentIdx;
            } else break;
            // if (this.comparisonFunction(curElement, parentElement) < 0) {
            //     this.swapElements(curIdx, parentIdx);
            //     curIdx = parentIdx;
            // } else break;
        }
    }

    getMinChildIdx(curIdx) {
        // We assume that at least one child exists

        const leftChildIdx = this.getLeftChildIdx(curIdx);
        const rightChildIdx = this.getRightChildIdx(curIdx);

        if (rightChildIdx >= this.size()) return leftChildIdx;

        const leftChild = this.elements[leftChildIdx];
        const rightChild = this.elements[rightChildIdx];

        if (this.comparisonFunction(rightChild, leftChild) > 0) return leftChildIdx;
        // if (this.comparisonFunction(leftChild, rightChild) < 0) return leftChildIdx;
        return rightChildIdx;
    }

    siftDown(curIdx) {
        while (this.getLeftChildIdx(curIdx) < this.size()) {
            const minChildIdx = this.getMinChildIdx(curIdx);

            const curElement = this.elements[curIdx];
            const minChildElement = this.elements[minChildIdx];

            if (this.comparisonFunction(curElement, minChildElement) > 0)
                this.swapElements(curIdx, minChildIdx);
            // if (this.comparisonFunction(minChildElement, curElement) < 0)
            //     this.swapElements(curIdx, minChildIdx);
            else break;

            curIdx = minChildIdx;
        }
    }

    // Use this for debugging purposes
    getElements() {
        return this.elements;
    }
}

class MaxHeap {
    constructor(elements = [], comparisonFunction = null) {
        this.elements = elements;

        this.comparisonFunction =
            comparisonFunction !== null ? comparisonFunction : (a, b) => a - b;

        this.FIRST_IDX = 0;

        for (let i = this.FIRST_IDX; i <= this.elements.length; i += 1) {
            this.siftDown(i);
        }
    }

    push(value) {
        this.elements.push(value);

        const lastIdx = this.size() - 1;
        this.siftUp(lastIdx);
    }

    peek() {
        if (this.size() === 0) return null;
        return this.elements[this.FIRST_IDX];
    }

    swapElements(i, j) {
        const temp = this.elements[i];
        this.elements[i] = this.elements[j];
        this.elements[j] = temp;
    }

    pop() {
        if (this.size() === 0) return null;

        const lastIdx = this.size() - 1;
        this.swapElements(this.FIRST_IDX, lastIdx);

        const elementToReturn = this.elements.pop();
        this.siftDown(this.FIRST_IDX);

        return elementToReturn;
    }

    size() {
        return this.elements.length;
    }

    getParentIdx(curIdx) {
        return Math.floor((curIdx - 1) / 2);
    }

    getLeftChildIdx(parentIdx) {
        return parentIdx * 2 + 1;
    }

    getRightChildIdx(parentIdx) {
        return parentIdx * 2 + 2;
    }

    siftUp(curIdx) {
        while (curIdx > this.FIRST_IDX) {
            const parentIdx = this.getParentIdx(curIdx);

            const curElement = this.elements[curIdx];
            const parentElement = this.elements[parentIdx];

            if (this.comparisonFunction(curElement, parentElement) > 0) {
                this.swapElements(curIdx, parentIdx);
                curIdx = parentIdx;
            } else break;
        }
    }

    getMaxChildIdx(curIdx) {
        // We assume that at least one child exists

        const leftChildIdx = this.getLeftChildIdx(curIdx);
        const rightChildIdx = this.getRightChildIdx(curIdx);

        if (rightChildIdx >= this.size()) return leftChildIdx;

        const leftChild = this.elements[leftChildIdx];
        const rightChild = this.elements[rightChildIdx];

        if (this.comparisonFunction(leftChild, rightChild) > 0) return leftChildIdx;
        return rightChildIdx;
    }

    siftDown(curIdx) {
        while (this.getLeftChildIdx(curIdx) < this.size()) {
            // console.log(curIdx);
            const maxChildIdx = this.getMaxChildIdx(curIdx);

            const curElement = this.elements[curIdx];
            const maxChildElement = this.elements[maxChildIdx];

            if (this.comparisonFunction(maxChildElement, curElement) > 0)
                this.swapElements(curIdx, maxChildIdx);
            else break;

            curIdx = maxChildIdx;
        }
    }

    // Use this for debugging purposes
    getElements() {
        return this.elements;
    }
}

class MedianFinder {
    constructor() {
        this.lowerHalf = new MaxHeap();
        this.higherHalf = new MinHeap();
    }

    balanceHalves(halfOne, halfTwo) {
        halfOne.push(halfTwo.pop()); // Pushing max root into min heap
    }

    addNum(number) {
        this.lowerHalf.push(number); // Pushing into max heap

        this.balanceHalves(this.higherHalf, this.lowerHalf);

        const higherHalfHasMedian = this.lowerHalf.size() < this.higherHalf.size();
        if (!higherHalfHasMedian) return;

        this.balanceHalves(this.lowerHalf, this.higherHalf);
    }

    findMedian() {
        const lowerMiddleValue = this.lowerHalf.peek();
        const higherMiddleValue = this.higherHalf.peek();

        const lowerHalfHasMedian = this.lowerHalf.size() > this.higherHalf.size();
        if (lowerHalfHasMedian) return lowerMiddleValue;

        return (lowerMiddleValue + higherMiddleValue) / 2;
    }
}

const medianFinder = new MedianFinder();
console.log(medianFinder);
medianFinder.addNum(1); // arr = [1]
medianFinder.addNum(2); // arr = [1, 2]
console.log(medianFinder.findMedian()); // return 1.5 (i.e., (1 + 2) / 2)
medianFinder.addNum(3); // arr[1, 2, 3]
console.log(medianFinder.findMedian()); // return 2.0
