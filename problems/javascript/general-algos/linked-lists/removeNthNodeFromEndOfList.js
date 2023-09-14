/*
Question:
Given the head of a linked list, remove the nth node from the end of the list and return its head.
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
const removeNthFromEnd = (head, n) => {
    let dummy = new ListNode(-1);
    dummy.next = head;

    let left = dummy;
    let right = head;

    while (n > 0) {
        right = right.next;
        n--;
    }

    while (right !== null) {
        left = left.next;
        right = right.next;
    }

    left.next = left.next.next;
    return dummy.next;
};
