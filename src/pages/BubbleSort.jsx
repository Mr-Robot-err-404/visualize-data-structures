import { Button } from 'flowbite-react'
import React, {useState} from 'react'
import { ListSnippets } from '../codeSnippets'
import CodeBlock from '../components/CodeBlock'
import NodeChain from '../components/NodeChain'
import { createLinkedList } from '../sexyFunctions'

function BubbleSort() {
  const [isListCreated, setIsListCreated] = useState(false)
  const [heads, setHeads] = useState({})
  const [bgColor, setBgcolor] = useState({})
  const [highlightedNodes1, setHighlightedNodes1] = useState({})
  const [highlightedNodes2, setHighlightedNodes2] = useState({})

  async function startLooping(heads) {
    for(var i = 0; i < 3; i++){
      let sorted = false;
      while (!sorted) {
        let curr = heads[i];
        let prev = null;
        let index1 = 0, index2 = 1
        sorted = true;
        while (curr && curr.next) {
          setHighlightedNodes1({...highlightedNodes1, [i] : index1++})
          setHighlightedNodes2({...highlightedNodes2, [i] : index2++})
          if (curr.value > curr.next.value) {
            sorted = false;
            let temp = curr.value;
            curr.value = curr.next.value;
            curr.next.value = temp;
          }
          await new Promise((resolve) => setTimeout(resolve, 100))
          prev = curr;
          curr = curr.next;
          setHeads(heads)
        }
      }
      setHighlightedNodes1({...highlightedNodes1, [i] : null})
      setHighlightedNodes2({...highlightedNodes2, [i] : null})
      bgColor[i] = "darkblue"
      setBgcolor(bgColor)
      setHeads(heads)
    }
  }

  const initiate = () => {
    for(var i = 0; i < 3; i++){
        heads[i] = createLinkedList(null, 1, 70, true)
        bgColor[i] = "lightblue"
        setHeads(heads)
        setBgcolor(bgColor)
    }
    setIsListCreated(true)
  }

  return (
    <div>
        {!isListCreated && 
        <div className='mx-auto flex justify-center'>
          <Button onClick={() => initiate()}>Generate Random Linked Lists</Button>
        </div>}
        {isListCreated && 
        <div className="flex items-center flex-col">
          <div className='justify-center'>
            <Button color="success" onClick={() => startLooping(heads)}>Start the Algorithm</Button>
          </div>
          <NodeChain head={heads[0]}  bgColor={bgColor[0]} highlightedNode={highlightedNodes1[0]} fastNode={highlightedNodes2[0]}/>
          <NodeChain head={heads[1]}  bgColor={bgColor[1]} highlightedNode={highlightedNodes1[1]} fastNode={highlightedNodes2[1]}/>
          <NodeChain head={heads[2]}  bgColor={bgColor[2]} highlightedNode={highlightedNodes1[2]} fastNode={highlightedNodes2[2]}/>
          <br></br>
          <CodeBlock code={ListSnippets['bubble']}/>
        </div>}
    </div>
  )
}

export default BubbleSort