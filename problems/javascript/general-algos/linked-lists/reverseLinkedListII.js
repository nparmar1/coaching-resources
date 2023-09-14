/*
Question:
Given the head of a singly linked list and two integers left and right where left <= right, 
ßreverse the nodes of the list from position left to position right, and return the reversed list.
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

const reverseBetween = (head, left, right) => {
    let dummy = new ListNode(0);
    dummy.next = head;

    let leftPrev = dummy;
    let current = head;

    let counterToLeftNode = left - 1;
    while (counterToLeftNode > 0) {
        leftPrev = current;
        current = current.next;
        counterToLeftNode--;
    }

    let previous = null;
    let counterToRightNode = right - left + 1;
    while (counterToRightNode > 0) {
        let nextNode = current.next;
        current.next = previous;
        previous = current;
        current = nextNode;
        counterToRightNode--;
    }

    leftPrev.next.next = current;
    leftPrev.next = previous;

    return dummy.next;
};
