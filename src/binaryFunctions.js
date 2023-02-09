export class Node {
  constructor(value, index, ancestor) {
    this.value = value
    this.left = null
    this.right = null
    this.index = index
    this.target = false
    this.ancestor = ancestor
  }
}

export const removeNodeProbability = {
  5: [0.3, 0.5],
  6: [0.2, 0.35, 0.55],
  7: [0.15, 0.25, 0.3, 0.6],
  8: [0.12, 0.2, 0.26, 0.3, 0.65]
}

export const initialZoom = {
  5: 1, 
  6: 0.6,
  7: 0.31
}

export const translate = {
  5: [-5, 60],
  6: [-10, 70], 
  7: [-55, 90]
}

export const delay = {
  5: 200, 
  6: 175, 
  7: 175
}

function generateFullTree(layers) {
  if (layers === 0) {
    return null;
  }
  const root = new Node(parseInt(Math.random() * 10));
  root.left = generateFullTree(layers - 1);
  root.right = generateFullTree(layers - 1);
  return root;
}

function bfs_search(root, target) {
  const queue = [root]
  while (queue.length > 0) {
    const node = queue.shift()
    if(node.value === target) return node
    if (node.left !== null) {
      queue.push(node.left)
    }
    if (node.right !== null) {
      queue.push(node.right)
    }
  }
  return false
}

function depthFirstSearch(root) {
  if (!root) return
  depthFirstSearch(root.left) // visit the left sub-tree
  depthFirstSearch(root.right) // visit the right sub-tree
}

function dfs(root) {
  if (!root) return
  const stack = [root]
  while (stack.length > 0) {
    const node = stack.pop()
    if (node.right) stack.push(node.right)
    if (node.left) stack.push(node.left)
  }
}

function reverseTree(root) {
  if (!root) return;
  let queue = [root];
  while (queue.length > 0) {
      let node = queue.shift();
      [node.left, node.right] = [node.right, node.left];
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
  }
}