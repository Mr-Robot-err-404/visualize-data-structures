import { Node } from './Node';
import { Line } from './Line';

const NodeChain = ({ head, highlightedNode, reverse, bgColor, fastNode }) => {
  let node = head;
  const nodes = [];
  const lines = [];
  let index = 0;
  while (node) {
    const value = node.value;
    nodes.push(<Node key={index} value={value} index={index} isHighlighted={index === highlightedNode} bgColor={bgColor} fastNode={index === fastNode}/>);
    if (node.next) {
      lines.push(<Line key={index} index={index} highlightedNode={reverse === true ? highlightedNode : null}/>);
    }
    node = node.next;
    index++;
  }
  return (
    <>
      <div className='self-start my-10 mx-8'>
        <div style={{ position: 'relative' }}>
          {nodes}
          {lines}
        </div>
      </div>
    </>
    );
};

export default NodeChain;