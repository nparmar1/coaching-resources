/*
Question:
Given head, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. 
Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.

Return true if there is a cycle in the linked list. Otherwise, return false.
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

const hasCycle = (head) => {
    let slowPointer = head;
    let fastPointer = head;

    while (fastPointer) {
        slowPointer = slowPointer.next;
        fastPointer = fastPointer.next?.next;

        if (slowPointer === fastPointer) return true;
    }

    return false;
};
