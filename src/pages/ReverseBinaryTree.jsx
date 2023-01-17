import { Button } from 'flowbite-react';
import React, { useState } from 'react'
import Tree from '../components/Tree'

let root = null
function ReverseBinaryTree() {
  const [nodes, setNodes] = useState({})
  const [isTreeCreated, setIsTreeCreated] = useState(false)
  const [isTreeFinished, setIsTreeFinished] = useState(false)
  const [highlightedNode, setHighlightedNode] = useState(null)
  const [isRendering, setIsRendering] = useState(true)
  const [layers, setLayers] = useState(6)

  class Node {
    constructor(value, index) {
      this.value = value;
      this.left = null;
      this.right = null;
      this.index = index
    }
  }

  function generateFullTree(layers) {
    if (layers === 0) return null
    const root = new Node(parseInt(Math.random() * 10), null);
    root.left = generateFullTree(layers - 1);
    root.right = generateFullTree(layers - 1);
    return root;
  }

   async function bfs_search(root) {
    let index = 1
    const queue = [root];
    let nodesInCurrentLayer = 1;
    while (queue.length > 0) {
      const node = queue.shift();
      if(isRendering){
          node.index = index
          nodes[index++] = node
          setNodes(nodes)
      }
      else {
          setHighlightedNode(index++)
      }
      nodesInCurrentLayer--;
      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }
      if (nodesInCurrentLayer === 0) {
        nodesInCurrentLayer = queue.length;
      }
      await new Promise((resolve) => setTimeout(resolve, 300))
    }
    setHighlightedNode(null)
    setIsTreeFinished(true)
    setIsRendering(false)
  }
  
  const initiate = () => {
    setIsTreeCreated(true)
    root = generateFullTree(layers)
    bfs_search(root, true)
  }

  return (
    <div>
      <div className='mx-auto flex justify-center'>
        {!isTreeCreated && <Button onClick={initiate}>Generate Binary Tree</Button>}
      </div>
      <div className='mx-auto flex justify-center'>
      {isTreeFinished && <Button onClick={() => bfs_search(root)}>Start the Search</Button>}
      </div>
      {isTreeCreated && <Tree nodes={nodes} highlightedNode={highlightedNode} layers={layers}/>}
    </div>
  )
}

export default ReverseBinaryTree