export function bubbleSort(head) {
    let sorted = false;
    while (!sorted) {
      let current = head;
      let prev = null;
      sorted = true;
      while (current && current.next) {
        if (current.value > current.next.value) {
          sorted = false;
          // Swap the elements
          let temp = current.value;
          current.value = current.next.value;
          current.next.value = temp;
        }
        prev = current;
        current = current.next;
      }
    }
    return head;
  }