import { Button } from 'flowbite-react';
import React, { useState } from 'react'
import Tree from '../components/Tree'

let root = null, index = 1
function DepthFirstSearch() {
  const [nodes, setNodes] = useState({})
  const [isTreeCreated, setIsTreeCreated] = useState(false)
  const [isTreeFinished, setIsTreeFinished] = useState(false)
  const [highlightedNode, setHighlightedNode] = useState(null)
  
  class Node {
    constructor(value, index) {
      this.value = value;
      this.left = null;
      this.right = null;
      this.index = index
    }
  }

  async function dfs(root) {
    const stack = [root];
    while (stack.length > 0) {
      const node = stack.pop();
      setHighlightedNode(node.index)
      if (node.right) stack.push(node.right);
      if (node.left) stack.push(node.left);
      await new Promise((resolve) => setTimeout(resolve, 300))
    }
  }
  
  function generateFullTree(layers) {
    if (layers === 0) {
      return null;
    }
    const root = new Node(parseInt(Math.random() * 10), index++);
    root.left = generateFullTree(layers - 1);
    root.right = generateFullTree(layers - 1);
    return root;
  }

   async function bfs_render(root, render) {
    let index = 1
    const queue = [root];
    let nodesInCurrentLayer = 1;
    while (queue.length > 0) {
      const node = queue.shift();
      node.index = index
      nodes[index++] = node
      setNodes(nodes)
      nodesInCurrentLayer--
      if (node.left !== null) {
        queue.push(node.left)
      }
      if (node.right !== null) {
        queue.push(node.right)
      }
      if (nodesInCurrentLayer === 0) {
        nodesInCurrentLayer = queue.length
      }
      await new Promise((resolve) => setTimeout(resolve, 300))
    }
    setIsTreeFinished(true)
  }
  
  const initiate = () => {
    setIsTreeCreated(true)
    root = generateFullTree(5)
    bfs_render(root, true)
  }

  return (
    <div>
      <div className='mx-auto flex justify-center'>
        {!isTreeCreated && <Button onClick={initiate}>Generate Binary Tree</Button>}
      </div>
      <div className='mx-auto flex justify-center'>
      {isTreeFinished && <Button onClick={() => dfs(root)}>Start the Search</Button>}
      </div>
      {isTreeCreated && <Tree nodes={nodes} highlightedNode={highlightedNode} layers={5}/>}
    </div>
  )
}

export default DepthFirstSearch