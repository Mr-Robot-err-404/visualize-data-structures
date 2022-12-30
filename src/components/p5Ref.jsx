import React from 'react'
import p5 from 'p5';

function p5Ref() {
    const canvasRef = useRef(null);
    const [tree, setTree] = useState({});
  
    function Node(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  
    function createTree() {
      const root = new Node(1);
      root.left = new Node(2);
      root.right = new Node(3);
      root.left.left = new Node(4);
      root.left.right = new Node(5);
      root.right.left = new Node(6);
      root.right.right = new Node(7);
  
      setTree(root);
    }
  
    new p5((p) => {
      p.setup = () => {
        // set up the canvas
        const canvas = p.createCanvas(500, 500);
        canvas.parent(canvasRef.current);
      };
  
      p.draw = () => {
        // clear the canvas
        p.clear();
  
        // draw the tree
        drawTree(tree, p.width / 2, 50, p);
      };
    }, canvasRef.current);
  
    function drawTree(node, x, y, p) {
      if (!node) return;
  
      // draw the node
      p.ellipse(x, y, 50, 50);
      p.text(node.value, x, y);
  
      // calculate the positions for the left and right child nodes
      const leftX = x - 100;
      const leftY = y + 100;
      const rightX = x + 100;
      const rightY = y + 100;
  
      // draw the left and right child nodes
      drawTree(node.left, leftX, leftY, p);
      drawTree(node.right, rightX, rightY, p);
  
      // draw the lines connecting the nodes
      p.line(x, y, leftX, leftY);
      p.line(x, y, rightX, rightY);
    }
  
    return (
      <div>
        <button onClick={createTree}>Create Tree</button>
        <div ref={canvasRef} />
      </div>
    );
  }
  

export default p5Ref