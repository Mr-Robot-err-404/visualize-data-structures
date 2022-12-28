import React, {useState, useEffect} from 'react'
import NodeChain from '../components/NodeChain'
import { createLinkedList, copyLinkedList, reverseLinkedList } from '../sexyFunctions'
import { Button } from 'flowbite-react'

let head = null, copy ,reverseList

function ReverseLinkedList() {
  const [isListCreated, setIsListCreated] = useState(false)
  const [reset, setReset] = useState(false)
  const [showMenu, setShowMenu] = useState(true)
  const [highlightedNode, setHighlightedNode] = useState(null)
  const [intervalId, setIntervalId] = useState(null)
  const startLooping = () => {
      setShowMenu(false)
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
      }, 500); 
      setIntervalId(id);
  };

  useEffect(() => {
  return () => clearInterval(intervalId);
  }, [intervalId]);

  const initiate = () => {
    head = createLinkedList(null, 1, 70)
    copy = copyLinkedList(head)
    reverseList = reverseLinkedList(copy)
    setIsListCreated(true)
  }
    
  return (
    <div>
     {!isListCreated && 
     <div className='mx-auto flex justify-center'>
      <Button onClick={() => initiate()}>Generate Random Linked List</Button>
     </div>}
      {isListCreated && 
      <>
        <div className='flex items-center flex-col'>
        {showMenu && !reset &&
          <div className='justify-center'>
            <Button color="success" onClick={startLooping}>Start the Algorithm</Button>
          </div>}
          <NodeChain head={head} highlightedNode={highlightedNode} reverse={true} bgColor={"lightblue"}/>
          {reset && <NodeChain head={reverseList} bgColor={"darkblue"}/>}
        </div>
      </>}
    </div>
  )
}

export default ReverseLinkedList