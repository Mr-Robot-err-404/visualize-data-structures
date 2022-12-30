import { Button } from 'flowbite-react';
import React, { useState } from 'react'
import Tree from '../components/Tree'

let root 
function BinarySearchTree() {
  const [toggle, setToggle] = useState(false)

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
  
  const initiate = () => {
    setToggle(!toggle)
    root = generateFullTree(3)
  }

  return (
    <div>
      <Button onClick={initiate}>Toggle Tree</Button>
      {toggle && <Tree root={root}/>}
    </div>
  )
}

export default BinarySearchTree