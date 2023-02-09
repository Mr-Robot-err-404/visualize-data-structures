import React, {useState, useEffect} from 'react'
import NodeChain from '../components/NodeChain'
import { createLinkedList, copyLinkedList, reverseLinkedList } from '../sexyFunctions'
import { Button } from 'flowbite-react'
import { codeSnippets } from '../codeSnippets'
import CodeBlock from '../components/CodeBlock'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom'

let head = null, copy ,reverseList

function ReverseLinkedList() {
  const [isListCreated, setIsListCreated] = useState(false)
  const [reset, setReset] = useState(false)
  const [highlightedNode, setHighlightedNode] = useState(null)
  const [intervalId, setIntervalId] = useState(null)
  const [isStarted, setIsStarted] = useState(false)

  const startLooping = () => {
      let node = head;
      let index = 0;
      const id = setInterval(() => {
        if (node === null) {
          setReset(true)
          clearInterval(id);
        }
        setHighlightedNode(index);
        node = node.next;
        index++;
      }, 200); 
      setIntervalId(id);
  };

  useEffect(() => {
  return () => clearInterval(intervalId);
  }, [intervalId]);

  const initiate = () => {
    head = createLinkedList(null, 1, 70, false, true)
    copy = copyLinkedList(head)
    reverseList = reverseLinkedList(copy)
    setIsListCreated(true)
  }
    
  return (
    <div>
     <div className='mx-auto flex justify-center'>
      {!isListCreated && <Button onClick={() => initiate()}>Generate Random Linked List</Button>}
      {!isStarted && isListCreated && <Button color="success" onClick={() => {
              setIsStarted(true)
              startLooping()
      }}>Start the Algorithm</Button>}
      {isStarted && <CodeBlock code={codeSnippets['reverse']} title={'Reverse Linked List'}/>}
      <div className='absolute left-20 my-3'>
        <Link to={'/linked-lists'}>  
                <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
        </Link>
      </div>
     </div>
     {isListCreated &&
     <div>
     <NodeChain head={head} highlightedNode={highlightedNode} reverse={true} bgColor={"lightblue"}/>
      {reset && <NodeChain head={reverseList} bgColor={"darkblue"}/>}
     </div>}
    </div>
  )
}

export default ReverseLinkedList