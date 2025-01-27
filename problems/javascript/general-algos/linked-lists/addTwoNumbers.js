/*
Question:
You are given two non-empty linked lists representing two non-negative integers. 
The digits are stored in reverse order, and each of their nodes contains a single digit. 
Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */

var addTwoNumbers = (l1, l2) => {
    let carryOn = 0;
    let previousNode = new ListNode();
    let dummyNode = previousNode;

    while (l1 || l2 || carryOn) {
        let value1 = 0;
        let value2 = 0;

        if (l1) {
            value1 = l1.val;
            l1 = l1.next;
        }

        if (l2) {
            value2 = l2.val;
            l2 = l2.next;
        }

        const sum = value1 + value2 + carryOn;
        carryOn = Math.floor(sum / 10);
        const digitLeftOver = sum % 10;
        const currentNode = new ListNode(digitLeftOver);

        previousNode.next = currentNode;
        previousNode = currentNode;
    }

    return dummyNode.next;
};
