/*
Question:
Given the head of a linked list and an integer val, 
remove all the nodes of the linked list that has Node.val == val, and return the new head.
*/

/*
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

const removeElements = (head, val) => {
    if (head === null) {
        return null;
    }

    // c - > h
    // ^
    // h

    let currentNode = new ListNode(-1);
    currentNode.next = head;
    head = currentNode;

    while (currentNode.next !== null) {
        if (currentNode.next.val === val) currentNode.next = currentNode.next.next;
        else currentNode = currentNode.next;
    }

    return head.next;
};
