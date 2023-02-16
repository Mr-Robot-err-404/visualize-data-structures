import { Button } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react'
import { codeSnippets } from '../codeSnippets';
import CodeBlock from '../components/CodeBlock';
import Tree from '../components/Tree'
import { Node } from '../binaryFunctions';
import { removeNodeProbability, initialZoom, delay } from '../binaryFunctions';
import { getSortedArray } from '../sexyFunctions';
import { ToggleSwitch } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlassPlus, faMagnifyingGlassMinus } from '@fortawesome/free-solid-svg-icons';


let root, reverseRoot, uniqueIntegers
function BinaryTrees({isTreeFull, layers, type}) {
  const [nodes, setNodes] = useState({})
  const [reverseNodes, setReverseNodes] = useState({})
  const [isTreeReversed, setIsTreeReversed] = useState(false)
  const [isTreeFinished, setIsTreeFinished] = useState(false)
  const [highlightedNode, setHighlightedNode] = useState(null)
  const [isTargetSelected, setIsTargetSelected] = useState(false)
  const [isSearchStarted, setIsSearchStarted] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [viewScale, setViewscale] = useState(initialZoom[layers])

  const isInitiatedRef = useRef(false)
  const target = useRef(null)

  const updateTarget = (newTarget) => {
    setIsTargetSelected(true)
    target.current = newTarget
  } 

  useEffect(() => {
    if(!isInitiatedRef.current){
      root = null 
      reverseRoot = null
      target.current = null
      uniqueIntegers = Array.from({length: layers < 7 ? 99 : Math.pow(2, layers)}, (_, i) => i + 1)
      isInitiatedRef.current = true
      initiate()
    }
  }, [])

  useEffect(() => {
    if(isTreeFinished && !reverseRoot) {
      reverseRoot = reverseTree(root)
      reverse_bfs_render(reverseRoot)
    }
  }, [isTreeFinished])

  const initiate = () => {
    if(type === 3) {
      let arr = getSortedArray(uniqueIntegers, Math.pow(2, layers) - 1)
      root = createBST(arr, 0, arr.length - 1)
    }
    else root = generateFullTree(layers)
    bfs_render(root, true)
  }

  async function dfs(root) {
    const stack = [root]
    while (stack.length > 0) {
      const node = stack.pop()
      if(node.value === 'A'){
        if(isTreeReversed){
          if (node.right) stack.push(node.right)
          if (node.left) stack.push(node.left)
        }
        else {
          if (node.left) stack.push(node.left)
          if (node.right) stack.push(node.right)
        }
        continue
      }
      setHighlightedNode(node.index)
      if(node.target) break
      if(isTreeReversed){
        if (node.right) stack.push(node.right)
        if (node.left) stack.push(node.left)
      }
      else {
        if (node.left) stack.push(node.left)
        if (node.right) stack.push(node.right)
      }
      node.isNodeVisited = true
      await new Promise((resolve) => setTimeout(resolve, delay[layers]))
    }
    setIsSearching(false)
  }

  async function bfs(root) {
    let index = 1
    const queue = [root]
    while(queue.length > 0){
      const node = queue.shift()
      if(index > 2){
        if(isTreeReversed){
          while(reverseNodes[index].value === 'A' || reverseNodes[index].ancestor.value === 'A') {
            if(index > Object.keys(reverseNodes).length) break
            index++ 
          }
        }
        else {
          while(nodes[index].value === 'A' || nodes[index].ancestor.value === 'A') {
            if(index > Object.keys(nodes).length) break
            index++ 
          }
        }
      }

      if(isTreeReversed){
        setHighlightedNode(reverseNodes[index].index)
        if(reverseNodes[index].target){
          break
        } 
        if (node.right !== null) queue.push(node.right)
        if (node.left !== null) queue.push(node.left)
        reverseNodes[index].isNodeVisited = true
      }
      else {
        setHighlightedNode(index)
        if(nodes[index].target) break
        if (node.left !== null) queue.push(node.left)
        if (node.right !== null) queue.push(node.right)
        nodes[index].isNodeVisited = true
      } 
      index++
      await new Promise((resolve) => setTimeout(resolve, delay[layers]))
    }
    setIsSearching(false)
  }

  async function searchBST(root, target) {
    while(root !== null){
      setHighlightedNode(root.index)
      root.isNodeVisited = true
      if(root.target) break
      if(root.value < target) root = root.left
      else if(root.value > target) root = root.right
      await new Promise((resolve) => setTimeout(resolve, 250))
    }
    setIsSearching(false)
  }

  function createBST(arr, start, end) {
    if (start > end) return null
    let mid = parseInt((end + start) / 2)
    let node = new Node(arr[mid])

    node.left = createBST(arr, start, mid - 1)
    node.right = createBST(arr, mid + 1, end)

    return node
  }
  
  function generateFullTree(layers) {
    if (layers === 0) {
      return null
    }
    let arr = uniqueIntegers
    let index = Math.floor(Math.random() * arr.length)
    const root = new Node(arr.splice(index, 1))
    root.left = generateFullTree(layers - 1)
    root.right = generateFullTree(layers - 1)
    return root
  }

  async function bfs_render(root, render) {
    let index = 1
    const queue = [root]
    while (queue.length > 0) {
      const node = queue.shift()
      node.index = index
      nodes[index] = node
      if(!isTreeFull){
        let len = Object.keys(nodes).length
        console.log(len)
        if(index > 2 && nodes[index].ancestor.value === 'A'){
          nodes[index].value = 'A'
        }
        if(len > 7 && Math.random() < removeNodeProbability[layers][0]){
        nodes[index].value = 'A'
        }
        else if(len > 15 && Math.random() < removeNodeProbability[layers][1]){
          nodes[index].value = 'A'
        }
        else if(len > 31 && Math.random() < removeNodeProbability[layers][2]){
          nodes[index].value = 'A'
        }
        else if(len > 63 && Math.random() < removeNodeProbability[layers][3]){
          nodes[index].value = 'A'
        }
        else if(len > 127 && Math.random() < removeNodeProbability[layers][4]){
          nodes[index].value = 'A'
        }   
      }      
      if (node.left !== null) {
        node.left.ancestor = node
        queue.push(node.left)
      }
      if (node.right !== null) {
        node.right.ancestor = node
        queue.push(node.right)
      }
      index++
      setNodes(nodes)
      if(nodes[index - 1].value === 'A' || nodes[index - 1].ancestor === 'A') continue
      await new Promise((resolve) => setTimeout(resolve, 100))
    }
    setIsTreeFinished(true)
  }

  function reverseTree(root) {
    if (!root) return
    let queue = [root]
    while (queue.length > 0) {
        let node = queue.shift()
        let temp = node.left
        node.left = node.right
        node.right = temp
        if (node.left) queue.push(node.left)
        if (node.right) queue.push(node.right)
    }
    return root
  }
  
  function reverse_bfs_render(root) {
    let index = 1
    const queue = [root]
    while(queue.length > 0){
      const reverseNode = queue.shift()
      reverseNodes[index] = reverseNode
      if (reverseNode.left !== null) {
        reverseNode.left.ancestor = reverseNode
        queue.push(reverseNode.left)
      }
      if (reverseNode.right !== null) {
        reverseNode.right.ancestor = reverseNode
        queue.push(reverseNode.right)
      }
      setReverseNodes(reverseNodes)
      index++
    } 
  }

  return (
    <div>
      {isTreeFinished && 
      <div className='fixed inset-0 top-20 flex justify-center '>
        <div className='flex flex-col gap-4'>
          <ToggleSwitch
          checked={isTreeReversed}
          disabled={isSearching}
          label="Invert Tree"
          onChange={() => {
            setIsTreeReversed(!isTreeReversed)
          }}/>
          {!isTargetSelected && 
          <h3>Select a Target Node...</h3>
        }
          {isTargetSelected && !isSearchStarted && <Button onClick={() => {
            if(type === 2){
              if(isTreeReversed) dfs(reverseNodes[1])
              else dfs(nodes[1])
            }
            if(type === 1){
              if(isTreeReversed) bfs(reverseNodes[1])
              else bfs(nodes[1])
            }
            if(type === 3){
              searchBST(nodes[1], target.current)
            }
            setIsSearchStarted(true)
            setIsSearching(true)
          }}>Start the Search</Button>}
          {isSearchStarted && <CodeBlock code={type === 1 ? codeSnippets['bfs'] : type === 2 ? codeSnippets['dfs'] : codeSnippets['bst']} title={type === 1 ? "Breadth-First Search" : type === 2 ? "Depth-First Search" : "Binary Search Tree"}/>}
        </div>
        {layers !== 5 &&
        <div className='flex flex-col mx-10'>
            <FontAwesomeIcon icon={faMagnifyingGlassPlus} onClick={() => {
              if(viewScale < 1) {
                setViewscale(viewScale + 0.05)
              } 
            }} className="my-1"/>
            <FontAwesomeIcon icon={faMagnifyingGlassMinus} onClick={() => {
              if(viewScale > 0.31) {
                if(layers === 6){
                  if(viewScale > 0.6) setViewscale(viewScale - 0.05)
                }
                else setViewscale(viewScale - 0.05)
              } 
            }} className="my-1"/>
        </div>}
      </div>}
      {!isTreeReversed && <Tree nodes={nodes} highlightedNode={highlightedNode} layers={layers} target={target} updateTarget={updateTarget} viewScale={viewScale} isTreeFinished={isTreeFinished} isSearchStarted={isSearchStarted}/>}
      {isTreeReversed && <Tree nodes={reverseNodes} highlightedNode={highlightedNode} layers={layers} target={target} updateTarget={updateTarget} viewScale={viewScale} isTreeFinished={isTreeFinished} isSearchStarted={isSearchStarted}/>}
    </div>
  )
}

export default BinaryTrees