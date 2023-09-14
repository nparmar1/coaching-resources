/*
Question:
Given an array of meeting time intervals intervals where intervals[i] = [starti, endi], 
return the minimum number of conference rooms required.
*/

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

/*
-sort by start times (if start times match, sort by end time)

num conference rooms: 1
ongoing meetings: [0,30]


0                   30
                            35   20


for each interval (starting at i=1)
    if start time < earliest end time of ongoing meetings
        new conference room
    else
        delete the ongoing meeting that ends at the earliest time
        
    add cur interval to ongoing meetings
        
        

[[0,30],[5,10],[15,20]]
         ^

*/

const comparingMeetings = (meetingOne, meetingTwo) => {
    const [startTimeOne, endTimeOne] = meetingOne;
    const [startTimeTwo, endTimeTwo] = meetingTwo;

    if (startTimeOne !== startTimeTwo) return startTimeOne - startTimeTwo;

    return endTimeOne - endTimeTwo;
};

const minMeetingRooms = (meetings) => {
    meetings.sort(comparingMeetings);

    const earliestEndingMeetingTime = new MinHeap();
    let numOfMeetingRooms = 1;

    const firstMeetingEndingTime = meetings[0][1];
    earliestEndingMeetingTime.push(firstMeetingEndingTime);

    for (let i = 1; i < meetings.length; i++) {
        const [startTime, endTime] = meetings[i];

        // 0                      30
        //      5     10
        //                15   20

        if (startTime < earliestEndingMeetingTime.peek()) numOfMeetingRooms++;
        else earliestEndingMeetingTime.pop();

        earliestEndingMeetingTime.push(endTime);
    }

    return numOfMeetingRooms;
};

let intervals = [
    [0, 30],
    [5, 10],
    [15, 20],
];

console.log(`Your answer: ${minMeetingRooms(intervals)}`);
console.log(`Correct answer: ${2}`);
console.log();

intervals = [
    [7, 10],
    [2, 4],
];

console.log(`Your answer: ${minMeetingRooms(intervals)}`);
console.log(`Correct answer: ${1}`);
console.log();
