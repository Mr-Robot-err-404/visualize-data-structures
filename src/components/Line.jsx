export const Line = ({ index, highlightedNode}) => {
    const startX = index * 60 + 20; // 20 is half the width of the node
    const startY = 20;
    const endX = startX + 60;
    const style = {
      position: 'absolute',
      left: startX,
      top: startY,
      width: endX - startX,
      height: 1,
      backgroundColor: index < highlightedNode ? 'red' : 'green'
    };
    return <div style={style} />;
  };