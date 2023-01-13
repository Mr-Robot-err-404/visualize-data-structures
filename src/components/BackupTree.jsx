import React from 'react';
import p5 from 'p5';
class Tree extends React.Component {
  canvasRef = React.createRef();
  myP5 = null;

  Sketch = p => {
    const { nodes } = this.props;
    const { highlightedNode } = this.props
    let distance = { 
      2: 300,
      3: 150, 
      4: 80,
      5: 30
    }
    let midpoint = window.innerWidth / 2;
    let coords = {
      y1: 50,
      y2: 150, 
      y3: 225,
      y4: 320,
      y5: 370,
      x1: midpoint,
    };
    p.setup = () => {
      p.createCanvas(window.innerWidth, window.innerHeight);
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(20);
    };

    p.draw = () => {
      function renderTree (type) {
        let currLayer = 2
        let anchor = 1
        let x
        highlightedNode === 1 ? p.fill("red") : p.fill("blue")
        p.ellipse(coords['x1'], coords['y1'], 35, 35);
        p.fill("white")
        p.text(nodes[1].value, coords['x1'], coords['y1'])
        for(var i = 2; i <= Object.keys(nodes).length; i++){
          if(Math.pow(2, currLayer) === i){
            currLayer++
          }
          if(i % 2 !== 0) {
            coords[`x${i}`] = coords[`x${anchor}`] + distance[currLayer]
            x = coords[`x${i}`]
            type === "lines" && p.line(coords[`x${anchor}`], coords[`y${currLayer - 1}`], x, coords[`y${currLayer}`])
            anchor++
          } 
          else {
            coords[`x${i}`] = coords[`x${anchor}`] - distance[currLayer]
            x = coords[`x${i}`]
            type === "lines" && p.line(coords[`x${anchor}`], coords[`y${currLayer - 1}`], x, coords[`y${currLayer}`])
          }
          if(type === "nodes"){
            if (i === highlightedNode) {
              p.fill("red")
              p.ellipse(x, coords[`y${currLayer}`], 35, 35)
            } else {
              p.fill("blue")
              p.ellipse(x, coords[`y${currLayer}`], 35, 35)
            }
            p.fill("white")
            p.text(nodes[i].value, x, coords[`y${currLayer}`]);
          }
        }
      }
      renderTree("lines")
      renderTree("nodes")
    };
    p.windowResized = () => {
      p.resizeCanvas(window.innerWidth, window.innerHeight);  
    };
  };

  componentDidMount() {
    this.myP5 = new p5(this.Sketch, this.canvasRef.current);
  }

  componentDidUpdate() {
    this.myP5.redraw()
}

  componentWillUnmount() {
    this.myP5.remove();
  }

  

  render() {
    return <div ref={this.canvasRef} />;
  }
}

export default Tree;
