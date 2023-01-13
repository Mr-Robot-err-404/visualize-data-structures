import { Button } from 'flowbite-react'
import React, { useState } from 'react'
import { ListSnippets } from '../codeSnippets'
import CodeBlock from '../components/CodeBlock'
import NodeChain from '../components/NodeChain'
import { createLinkedList } from '../sexyFunctions'

function RemoveDuplicates() {
    const [isListCreated, setIsListCreated] = useState(false)
    const [heads, setHeads] = useState({})
    const [bgColor, setBgColor] = useState({})
    const [removedHeads, setRemovedHeads] = useState({})
    const [highlightedNode, setHighlightedNode] = useState({})

    async function removeDuplicates() {
        for(var i = 0; i < 3; i++){
            const elementSet = new Set();
            let curr = heads[i];
            let prev = null;
            let index = 0
            let stack = []
            while (curr) {
            if (elementSet.has(curr.value)) {
                prev.next = curr.next;
                setHighlightedNode({...highlightedNode, [i] : index})
                stack.push(curr.value)
                removedHeads[i] = createLinkedList(stack)
                setRemovedHeads(removedHeads)
            } else {
                setHighlightedNode({...highlightedNode, [i] : index++})
                elementSet.add(curr.value);
                prev = curr;
            }
            curr = curr.next;
            setHeads(heads)
            await new Promise((resolve) => setTimeout(resolve, 500))
            }
            setHighlightedNode({})
            bgColor[i] = "darkblue"
            setBgColor(bgColor)
        }
    }
        
      

    const initiate = () => {
        for(var i = 0; i < 3; i++){
            heads[i] = createLinkedList(null, 1, 10)
            bgColor[i] = "lightblue"
            bgColor[i + 3] = "red"
            setHeads(heads)
            setBgColor(bgColor)
        }
        setIsListCreated(true)
    }
  return (
    <div>
        {!isListCreated && 
        <div className='mx-auto flex justify-center'>
          <Button onClick={() => initiate()}>Generate 3 random linked lists</Button>
        </div>}
        {isListCreated && 
        <div className="flex items-center flex-col">
          <div className='justify-center'>
            <Button color="success" onClick={removeDuplicates}>Start the Algorithm</Button>
          </div>
          <NodeChain head={heads[0]} bgColor={bgColor[0]} highlightedNode={highlightedNode[0]}/>
          {removedHeads[0] && <NodeChain head={removedHeads[0]} bgColor={bgColor[3]}/>}
          <NodeChain head={heads[1]} bgColor={bgColor[1]} highlightedNode={highlightedNode[1]}/>
          {removedHeads[1] && <NodeChain head={removedHeads[1]} bgColor={bgColor[4]}/>}
          <NodeChain head={heads[2]} bgColor={bgColor[2]} highlightedNode={highlightedNode[2]}/>
          {removedHeads[2] && <NodeChain head={removedHeads[2]} bgColor={bgColor[5]}/>}
          <br></br>
          <CodeBlock code={ListSnippets['duplicates']}/>
        </div>}
    </div>
  )
}

export default RemoveDuplicates