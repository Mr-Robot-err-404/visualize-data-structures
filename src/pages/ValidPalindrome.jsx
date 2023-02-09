import { useState } from "react"
import { Button } from "flowbite-react"
import { createLinkedList,  copyLinkedList } from "../sexyFunctions"
import { codeSnippets } from "../codeSnippets"
import CodeBlock from "../components/CodeBlock"
import NodeChain from "../components/NodeChain"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom'

function ValidPalindrome() {
  const palindromes = [
    "REDIVIDER", 
    "HANNAH",
    "RACECAR",
    "TENET",
    "ROTAVATOR",
    "ABBCECBBA",
    "XYYXZXYYX",
    "NOLEMONNOMELON",
    "DOGEESESEEGOD",
  ]

  const falsePalindromes = [
    "12334321",
    "XXYZXX",
    "DARTHVADER",
    "LEODICAPRIO",
    "MASTERYODA"
  ]

  const [isListCreated, setIsListCreated] = useState(false)
  const [isStarted, setIsStarted] = useState(false)
  const [highlightedNodes1, setHighlightedNodes1] = useState({})
  const [highlightedNodes2, setHighlightedNodes2] = useState({})
  const [highlightedSplitNode, setHighlightedSplitNode] = useState({})
  const [bgColor, setBgcolor] = useState({})
  const [reverse, setReverse] = useState(false)
  const [heads, setHeads] = useState({})
  const [splitHeads, setSplitHeads] = useState({})

  async function palindromeFiesta(heads) {
    for(var i = 0; i < 3; i++){
      let prev = null
      let slow = heads[i];
      let fast = heads[i];
      let index1 = 0, index2 = 0
      while (fast && fast.next) {
        setHighlightedNodes1({...highlightedNodes1, [i] : index1++})
        setHighlightedNodes2({...highlightedNodes2, [i] : index2})
        index2 += 2
        prev = slow
        slow = slow.next;
        fast = fast.next.next;
        await new Promise((resolve) => setTimeout(resolve, 500))
      }
      setHighlightedNodes1({...highlightedNodes1, [i] : index1})
      setHighlightedNodes2({...highlightedNodes2, [i] : index2})
      await new Promise((resolve) => setTimeout(resolve, 500))
      splitHeads[i] = slow
      setSplitHeads(splitHeads)
      setBgcolor({...bgColor, [i + 5]: "darkblue"})
      prev.next = null
      setHeads({...heads, [i] : heads[i]})
      let curr = copyLinkedList(slow)
      let previous = null, index = 0
      setReverse(true)
      while(curr){
        setHighlightedSplitNode({...highlightedSplitNode, [i] : index++})
        const next = curr.next
        curr.next = previous
        previous = curr
        curr = next
        await new Promise((resolve) => setTimeout(resolve, 500))
      }
      setReverse(false)
      splitHeads[i] = previous
      setSplitHeads(splitHeads)
      setHighlightedSplitNode({...highlightedSplitNode, [i] : null})
      await new Promise((resolve) => setTimeout(resolve, 500))
      await(compareTwoHalves(heads[i], previous, i))
    }
  }

  async function compareTwoHalves(head, previous, i) {
    let left = head;
    let right = previous;
    let index1 = 0, index2 = 0
    while (left) {
      setHighlightedNodes1({...highlightedNodes1, [i] : index1++})
      setHighlightedSplitNode({...highlightedSplitNode, [i] : index2++})
      if (left.value !== right.value){
        bgColor[i] = "red" 
        bgColor[i + 5] = "red"
        setBgcolor(bgColor)
        setHighlightedNodes1({})
        setHighlightedSplitNode({})
        return 
      }
      left = left.next;
      right = right.next;
      await new Promise((resolve) => setTimeout(resolve, 500))
    }
    bgColor[i] = "green" 
    bgColor[i + 5] = "green"
    setBgcolor(bgColor)
    setHighlightedNodes1({...highlightedNodes1, [i] : null})
    setHighlightedSplitNode({...highlightedSplitNode, [i]: null})
  }

  const initiate = () => {
    let truePals = palindromes, falsePals = falsePalindromes
    for(var i = 0; i < 3; i++) {
        let randVal = Math.random(), index, arr
        if(i === 2) {
          index = Math.floor(Math.random() * truePals.length)
          arr = truePals.splice(index, 1)
        }
        else {
          if(randVal < 0.7 ){
            index = Math.floor(Math.random() * truePals.length)
            arr = truePals.splice(index, 1)
        }
        else {
            index = Math.floor(Math.random() * falsePals.length)
            arr = falsePals.splice(index, 1)
          }
        }
      heads[i] = createLinkedList(arr[0])
      bgColor[i] = "lightblue"
      setHeads(heads)
      setBgcolor(bgColor)
    }
    setIsListCreated(true)
  }

  return (
    <div className="relative">
    <div className='absolute left-20 my-3'>
      <Link to={'/linked-lists'}>  
              <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
      </Link>
    </div>
    {!isListCreated && 
        <div className='mx-auto flex justify-center'>
        <Button onClick={() => initiate()}>Generate 3 Linked Lists</Button>
        </div>}
        {isListCreated &&
        <div className="flex items-center flex-col">
            <div className='justify-center'>
            {!isStarted && <Button color="success" onClick={() => {
                palindromeFiesta(heads)
                setIsStarted(true)
              }}>Start the Algorithm</Button>}
            {isStarted && <CodeBlock code={codeSnippets['palindrome']} title={'Valid Palindrome'}/>}
            </div>
            <NodeChain head={heads[0]} bgColor={bgColor[0]} highlightedNode={highlightedNodes1[0]} fastNode={highlightedNodes2[0]}/>
            {splitHeads[0] && <NodeChain head={splitHeads[0]} bgColor={bgColor[5]} highlightedNode={highlightedSplitNode[0]} reverse={reverse}/>}
            <NodeChain head={heads[1]} bgColor={bgColor[1]} highlightedNode={highlightedNodes1[1]} fastNode={highlightedNodes2[1]}/>
            {splitHeads[1] && <NodeChain head={splitHeads[1]} bgColor={bgColor[6]} highlightedNode={highlightedSplitNode[1]} reverse={reverse}/>}
            <NodeChain head={heads[2]} bgColor={bgColor[2]} highlightedNode={highlightedNodes1[2]} fastNode={highlightedNodes2[2]}/>
            {splitHeads[2] && <NodeChain head={splitHeads[2]} bgColor={bgColor[7]} highlightedNode={highlightedSplitNode[2]} reverse={reverse}/>}
            <NodeChain head={heads[3]} bgColor={bgColor[3]} highlightedNode={highlightedNodes1[3]} fastNode={highlightedNodes2[3]}/>
            {splitHeads[3] && <NodeChain head={splitHeads[3]} bgColor={bgColor[8]} highlightedNode={highlightedSplitNode[3]} reverse={reverse}/>}
            <NodeChain head={heads[4]} bgColor={bgColor[4]} highlightedNode={highlightedNodes1[4]} fastNode={highlightedNodes2[4]}/>
            {splitHeads[4] && <NodeChain head={splitHeads[4]} bgColor={bgColor[9]} highlightedNode={highlightedSplitNode[4]} reverse={reverse}/>}
            <br></br>
        </div>}
    </div>
  )
}

export default ValidPalindrome