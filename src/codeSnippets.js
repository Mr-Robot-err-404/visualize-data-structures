export const codeSnippets = {
    reverse: `function reverseLinkedList(head) {
        let curr = head
        let prev = null
        while (curr) {
          const next = curr.next
          curr.next = prev
          prev = curr
          curr = next
        }
        return prev
      }`, 
    merge: `function mergeTwoLists(list1, list2) {
        let mergedList = new LinkedList()
        let curr1 = list1.head
        let curr2 = list2.head
        while (curr1 && curr2) {
          if (curr1.value < curr2.value) {
            mergedList.add(curr1.value)
            curr1 = curr1.next
          } else {
            mergedList.add(curr2.value)
            curr2 = curr2.next
          }
        }
        while (curr1) {
        mergedList.add(curr1.value)
        curr1 = curr1.next
        }
        while (curr2) {
          mergedList.add(curr2.value)
          curr2 = curr2.next
        }
        return mergedList
      }`, 
    palindrome: `function isPalindrome(head) {
        // Find the midpoint
        let slow = head, fast = head
        while (fast && fast.next) {
          slow = slow.next
          fast = fast.next.next
        }
        // Reverse the second half
        let previous = null, current = slow
        while (current) {
          let next = current.next
          current.next = previous
          previous = current
          current = next
        }
        // Compare first half with reversed half
        let left = head, right = previous
        while (right) {
          if (left.val !== right.val) return false
          left = left.next
          right = right.next
        }
        return true
      }`, 
    bubble: `function bubbleSort(head) {
        let sorted = false
        while (!sorted) {
          let curr = head
          let prev = null
          sorted = true
          while (curr && curr.next) {
            if (curr.value > curr.next.value) {
              sorted = false
              // Swap the elements
              let temp = curr.value
              curr.value = curr.next.value
              curr.next.value = temp
            }
            prev = curr
            curr = curr.next
          }
        }
        return head
      }`, 
    duplicates: `removeDuplicates(head) {
        const set = new Set()
        let current = head
        let previous = null
      
        while (current) {
          if (set.has(current.val)) {
            previous.next = current.next
          } else {
            set.add(current.val)
            previous = current
          }
          current = current.next
        }
        return head;
      }`, 
    bfs: `function bfs_search(root, target) {
      const queue = [root]
      while (queue.length > 0) {
        const node = queue.shift()
        if(node.value === target) return true
        if (node.left !== null) {
          queue.push(node.left)
        }
        if (node.right !== null) {
          queue.push(node.right)
        }
      }
      return false
    }`,
    dfs: `function dfs(root, target) {
      const stack = [root]
      while (stack.length > 0) {
        const node = stack.pop()
        if(node.value === target) return true
        if (node.right) stack.push(node.right)
        if (node.left) stack.push(node.left)
      }
      return false
    }`,
    bst: ` function createBST(arr, start, end) {
      //Note: start = 0, end = arr.length - 1 as initial values
      //Input array is sorted

      if (start > end) return null
      let mid = parseInt((end + start) / 2)
      let node = new Node(arr[mid])
      node.left = createBST(arr, start, mid - 1)
      node.right = createBST(arr, mid + 1, end)
      return node
    }
    
    function searchBST(root, target) {
      while(root !== null){
        if(root.target) return true
        if(root.value < target) root = root.left
        else if(root.value > target) root = root.right
      }
      return false
    }`
    
}