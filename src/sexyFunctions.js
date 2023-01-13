class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

export class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  add(value) {
    let node = new Node(value);
    if (this.length === 0) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
  }
}

export const createLinkedList = (arr, min, max, bubble) => {
  let len = null
  if(!arr){
    len = getRandomInt(5, 20)
    arr = generateRandomArray(len, min, max)
    !bubble && arr.sort((a, b) => a - b)
  }
  else {
    len = arr.length
  }
  let head = null;
  let tail = null;
  for (let i = 0; i < len; i++) {
    const node = new Node(arr[i]);
    if (head === null) {
      head = node;
      tail = node;
    } else {
      tail.next = node;
      tail = node;
    }
  }
  return head;
};

export const createNewList = (arr) => {
  let head = null;
  let tail = null;
  for (let i = 0; i < arr.length; i++) {
    const node = new Node(arr[i].value);
    if (head === null) {
      head = node;
      tail = node;
    } else {
      tail.next = node;
      tail = node;
    }
  }
  return head;
}

export const copyLinkedList = head => {
  let current = head;
  let copy = new Node(current.value);
  let copyHead = copy;
  current = current.next;
  while (current) {
    copy.next = new Node(current.value);
    copy = copy.next;
    current = current.next;
  }
  return copyHead;
};

export function reverseLinkedList(head) {
  let curr = head;
  let prev = null;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
};

export function mergeTwoSortedLinkedLists(list1, list2) {
  let mergedList = new LinkedList();
  let current1 = list1.head;
  let current2 = list2.head;
  while (current1 !== null && current2 !== null) {
    if (current1.value < current2.value) {
      mergedList.add(current1.value);
      current1 = current1.next;
    } else {
      mergedList.add(current2.value);
      current2 = current2.next;
    }
  }
    while (current1 !== null) {
    mergedList.add(current1.value);
    current1 = current1.next;
  }
  while (current2 !== null) {
    mergedList.add(current2.value);
    current2 = current2.next;
  }
  return mergedList;
}

export function isPalindrome(head) {
  // Edge case: empty or single-node linked list
  if (!head || !head.next) return true;

  // Find the middle of the linked list
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // Reverse the second half of the linked list
  let previous = null;
  let current = slow;
  while (current) {
    let next = current.next;
    current.next = previous;
    previous = current;
    current = next;
  }

  // Compare the first half of the linked list to the reversed second half
  let left = head;
  let right = previous;
  while (right) {
    if (left.val !== right.val) return false;
    left = left.next;
    right = right.next;
  }
  return true;
}

function removeDuplicates(head) {
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
}

export const splitList = (head, splitNode) => {
  let curr = head;
  let prev = null;
  while (curr !== splitNode) {
    prev = curr;
    curr = curr.next;
  } 
  prev.next = null; //This severes the link between the two lists
  return
}

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

export const generateRandomArray = (length, min, max) => {
  let arr = []
  for(var i = 0; i < length; i++){
    let val = getRandomInt(min, max)
    arr.push(val)
  }
  return arr
}

export const palindromes = [
  "REDIVIDER", 
  "HANNAH",
  "RACECAR",
  "TENET",
  "ROTAVATOR",
  "135531",
  "7449447",
  "ABBCECBBA",
  "XYYXZXYYX",
  "NOLEMONNOMELON",
  "DOGEESESEEGOD",
]

export const falsePalindromes = [
  "12334321",
  "XXYZXX",
  "AABBCCCDD",
  "DARTHVADER",
  "7654467",
  "LEODICAPRIO",
  "MASTERYODA"
]



