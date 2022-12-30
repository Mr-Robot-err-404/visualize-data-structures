class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
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