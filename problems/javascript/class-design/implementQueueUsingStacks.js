/*
Question:
Implement a first in first out (FIFO) queue using only two stacks. 
The implemented queue should support all the functions of a normal queue (push, peek, pop, and empty).

Implement the MyQueue class:

void push(int x) Pushes element x to the back of the queue.
int pop() Removes the element from the front of the queue and returns it.
int peek() Returns the element at the front of the queue.
boolean empty() Returns true if the queue is empty, false otherwise.
Notes:

You must use only standard operations of a stack, which means only push to top, peek/pop from top, size, and is empty operations are valid.
Depending on your language, the stack may not be supported natively. 
You may simulate a stack using a list or deque (double-ended queue) as long as you use only a stack's standard operations.
*/

const peek = (stack) => {
    if (stack.length === 0) throw new Error('Cannot not peek. Stack is empty.');

    return stack[stack.length - 1];
};

class MyQueue {
    constructor() {
        this.size = 0;
        this.stack1 = [];
        this.stack2 = [];
    }

    push(newElement) {
        this.stack1.push(newElement);
        this.size++;
    }

    moveStack1toStack2() {
        while (this.stack1.length > 0) {
            const stack1Element = this.stack1.pop();
            this.stack2.push(stack1Element);
        }
    }

    pop() {
        if (this.empty()) throw new Error('Cannot not pop. Stack is empty.');
        if (this.stack2.length === 0) this.moveStack1toStack2();
        const elementInStack2 = this.stack2.pop();
        this.size--;
        return elementInStack2;
    }

    peek() {
        if (this.empty()) throw new Error('Cannot not peek. Stack is empty.');
        if (this.stack2.length === 0) this.moveStack1toStack2();

        return peek(this.stack2);
    }

    empty() {
        return this.size === 0;
    }
}
