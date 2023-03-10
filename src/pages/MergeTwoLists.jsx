import { useState } from "react"
import NodeChain from '../components/NodeChain'
import {createLinkedList, createNewList, getListLength} from '../sexyFunctions'
import { Button } from "flowbite-react"
import CodeBlock from "../components/CodeBlock"
import { codeSnippets } from "../codeSnippets"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom'

let head = null, head2 = null
function MergeTwoLists() {
  const [isListCreated, setIsListCreated] = useState(false)
  const [isStarted, setIsStarted] = useState(false)
  const [highlightedNode1, setHighlightedNode1] = useState(null)
  const [highlightedNode2, setHighlightedNode2] = useState(null)
  const [newList, setNewList] = useState(null)

  async function startLooping(head1, head2) {
    let stack = []
    let index1 = 0, index2 = 0
    let mergedList = null
    let curr1 = head1
    let curr2 = head2
    while (curr1 || curr2) {
      if (!curr2 || (curr1 && curr1.value < curr2.value)) {
        mergedList = curr1
        stack.push(mergedList)
        setNewList(createNewList(stack))
        setHighlightedNode1(index1++)
        setHighlightedNode2(index2)
        curr1 = curr1.next
      } else {
        mergedList = curr2
        stack.push(mergedList)
        setHighlightedNode1(index1)
        setHighlightedNode2(index2++)
        setNewList(createNewList(stack))
        curr2 = curr2.next;
      }
      await new Promise((resolve) => setTimeout(resolve, 400));
    }
    setHighlightedNode1(null)
    setHighlightedNode2(null)
  }

  const initiate = () => {
    head = createLinkedList(null, 1, 70)
    let length = getListLength(head)
    head2 = createLinkedList(null, 1, 60, false, false, length)
    setIsListCreated(true)
  }
  return (
    <div className="relative">
        {!isListCreated && 
        <div className='mx-auto flex justify-center'>
          <Button onClick={() => initiate()}>Generate Two Randomly Sorted Lists</Button>
        </div>}
        <div className='absolute left-20 my-3'>
        <Link to={'/linked-lists'}>  
                <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
        </Link>
        </div>
        {isListCreated && 
        <div className="flex items-center flex-col">
          <div className='justify-center'>
            {!isStarted && <Button color="success" onClick={() => {
              setIsStarted(true)
              startLooping(head, head2)
            }}>Start the Algorithm</Button>}
            {isStarted && <CodeBlock code={codeSnippets['merge']} title={'Merge two sorted linked lists'}/>}
          </div>
          <NodeChain head={head} highlightedNode={highlightedNode1} bgColor={"lightblue"}/>
          <NodeChain head={head2} highlightedNode={highlightedNode2} bgColor={"lightblue"}/>
          <NodeChain head={newList} bgColor={"darkblue"}/>
          <br></br>
        </div>}
    </div>
  )
} 

export default MergeTwoLists