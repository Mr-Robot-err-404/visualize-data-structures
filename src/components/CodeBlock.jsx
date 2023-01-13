import SyntaxHighlighter from 'react-syntax-highlighter';
import { googlecode } from 'react-syntax-highlighter/dist/esm/styles/hljs';

function CodeBlock({code}) {
    return (
        <SyntaxHighlighter language="javascript" style={googlecode}>
          {code}
        </SyntaxHighlighter>
      );
}

export default CodeBlock