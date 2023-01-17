class Node {
  constructor(value, index) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.index = index
  }
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

function bfs_search(root) {
  const queue = [root];
  let currentLayer = 1;
  let nodesInCurrentLayer = 1;
  while (queue.length > 0) {
    const node = queue.shift();
    nodesInCurrentLayer--;
    if (node.left !== null) {
      queue.push(node.left);
    }
    if (node.right !== null) {
      queue.push(node.right);
    }
    if (nodesInCurrentLayer === 0) {
      currentLayer++;
      nodesInCurrentLayer = queue.length;
    }
  }
}

function depthFirstSearch(root) {
  if (!root) return
  depthFirstSearch(root.left) // visit the left sub-tree
  depthFirstSearch(root.right) // visit the right sub-tree
}

function dfs(root) {
  if (!root) return;
  const stack = [root];
  while (stack.length > 0) {
    const node = stack.pop();
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
}

function randomTree(layers) {
  if (layers === 0) {
    return null;
  }
  if (layers === 1) {
    return new Node();
  }
  const root = new Node();
  root.left = randomTree(layers - 1);
  if (layers === 3) {
    // Set probability for third layer
    if (Math.random() < 0.5) {
      root.right = randomTree(layers - 1);
    }
  } else if (layers === 4) {
    // Set probability for fourth layer
    if (Math.random() < 0.75) {
      root.right = randomTree(layers - 1);
    }
  } else {
    root.right = randomTree(layers - 1);
  }
  return root;
}