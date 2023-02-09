import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { googlecode } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { Button, Modal } from 'flowbite-react'
import { useState } from 'react'

function CodeBlock({code, title}) {
    const [toggleCode, setToggleCode] = useState(false)
    return (
        <div>
          <Button onClick={() => setToggleCode(true)}>Show Code</Button>     
          <React.Fragment>
          <Modal
            show={toggleCode}
            onClose={() => setToggleCode(false)}
          >
            <Modal.Header>
              {title}
            </Modal.Header>
            <Modal.Body>
              <div className="space-y-6">
              <SyntaxHighlighter language="javascript" style={googlecode}>
              {code}
              </SyntaxHighlighter>
              </div>
            </Modal.Body>
          </Modal>
        </React.Fragment>
        </div>
      );
}

export default CodeBlock