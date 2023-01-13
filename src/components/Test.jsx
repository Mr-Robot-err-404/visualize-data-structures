import React from 'react';
import p5 from 'p5';

class Test extends React.Component {
  canvasRef = React.createRef();
  myP5 = null;

  Sketch = p => {
    const { nodes } = this.props
    const { layers } = this.props
    let highlightedNode = null
    let canvasSize = {}
    let distance = {}
    let coords = {}
    const steps = [75, 95, 50]
    let xSize = 2600, ySize = 1200
    let xVal = 37.5, yVal = 50
    let diff = Math.pow(2, layers - 5) * 100

    for(var i = 6; i <= layers; i++){
      canvasSize[layers] = [xSize, ySize]
      xSize *= 2
      ySize *= 2
    }
    for(var i = layers; i >= 2; i--){
      distance[i] = xVal
      xVal *= 2
    }
    for(var i = 2, j = 0; i <= layers; i++){
      if(layers - i >= 3){
        yVal += diff
        coords[`y${i}`] = yVal
        diff /= 2
      }
      else {
        yVal += steps[j++]
        coords[`y${i}`] = yVal
      }
    }
    canvasSize[layers][5] = [window.innerWidth, window.innerHeight]
    let midpoint = canvasSize[layers][0] / 2;
    coords[`y1`] = 50
    coords['x1'] = midpoint
    p.updateHighlightedNode = newHighlightedNode => {
      highlightedNode = newHighlightedNode
    }
    p.setup = () => {
      p.createCanvas(canvasSize[layers][0],canvasSize[layers][1]);
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

  componentDidUpdate(prevProps) {
    if (this.props.highlightedNode !== prevProps.highlightedNode) {
      this.myP5.updateHighlightedNode(this.props.highlightedNode)
    }
  }

  componentWillUnmount() {
    this.myP5.remove();
  }

  

  render() {
    return <div ref={this.canvasRef} />;
  }
}

export default Test;