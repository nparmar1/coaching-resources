/*
Question:
Design a logger system that receives a stream of messages along with their timestamps.
Each unique message should only be printed at most every 10 seconds 
(i.e. a message printed at timestamp t will prevent other identical messages from being printed until timestamp t + 10).

All messages will come in chronological order. Several messages may arrive at the same timestamp.

Implement the Logger class:

Logger() Initializes the logger object.
bool shouldPrintMessage(int timestamp, string message) 
Returns true if the message should be printed in the given timestamp, otherwise returns false.
*/

const getLastElement = (stack) => {
    const lastIdx = stack.length - 1;
    return stack[lastIdx];
};

class MinStack {
    constructor() {
        this.stack = [];
        this.minStack = [];
    }

    push(newElement) {
        this.stack.push(newElement);

        if (this.minStack.length === 0 || newElement <= getLastElement(this.minStack)) {
            this.minStack.push(newElement);
        }
    }

    pop() {
        if (getLastElement(this.stack) === getLastElement(this.minStack)) {
            this.minStack.pop();
        }
        this.stack.pop();
    }

    top() {
        if (this.stack.length === 0) throw Error('Min stack is empty');
        return getLastElement(this.stack);
    }

    getMin() {
        if (this.minStack.length === 0) throw Error('Min stack is empty');
        return getLastElement(this.minStack);
    }
}
