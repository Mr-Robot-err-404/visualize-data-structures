export const ListSnippets = {
    reverse: `function reverseLinkedList(head) {
        let curr = head;
        let prev = null;
        while (curr) {
          const next = curr.next;
          curr.next = prev;
          prev = curr;
          curr = next;
        }
        return prev;
      };`, 
    merge: `function mergeTwoLists(list1, list2) {
        let mergedList = new LinkedList();
        let curr1 = list1.head;
        let curr2 = list2.head;
        while (curr1 !== null && curr2 !== null) {
          if (curr1.value < curr2.value) {
            mergedList.add(curr1.value);
            curr1 = curr1.next;
          } else {
            mergedList.add(curr2.value);
            curr2 = curr2.next;
          }
        }
        while (curr1 !== null) {
        mergedList.add(curr1.value);
        curr1 = curr1.next;
        }
        while (curr2 !== null) {
          mergedList.add(curr2.value);
          curr2 = curr2.next;
        }
        return mergedList;
      }`, 
    palindrome: `function isPalindrome(head) {
        if (!head || !head.next) return true;
      
        // Find the midpoint
        let slow = head;
        let fast = head;
        while (fast && fast.next) {
          slow = slow.next;
          fast = fast.next.next;
        }
      
        // Reverse the second half
        let previous = null;
        let current = slow;
        while (current) {
          let next = current.next;
          current.next = previous;
          previous = current;
          current = next;
        }
      
        // Compare first half with reversed half
        let left = head;
        let right = previous;
        while (right) {
          if (left.val !== right.val) return false;
          left = left.next;
          right = right.next;
        }
        return true;
      }`, 
    bubble: `function bubbleSort(head) {
        let sorted = false;
        while (!sorted) {
          let curr = head;
          let prev = null;
          sorted = true;
          while (curr && curr.next) {
            if (curr.value > curr.next.value) {
              sorted = false;
              // Swap the elements
              let temp = curr.value;
              curr.value = curr.next.value;
              curr.next.value = temp;
            }
            prev = curr;
            curr = curr.next;
          }
        }
        return head;
      }`, 
    duplicates: `removeDuplicates(head) {
        const elementSet = new Set();
        let current = head;
        let previous = null;
      
        while (current) {
          if (elementSet.has(current.val)) {
            previous.next = current.next;
          } else {
            elementSet.add(current.val);
            previous = current;
          }
          current = current.next;
        }
      
        return head;
      }`
    
}