import React from 'react';
import p5 from 'p5';
import { translate } from '../binaryFunctions';

class Tree extends React.Component {
  canvasRef = React.createRef()
  myP5 = null 

  Sketch = p => {
    const { nodes } = this.props
    const { layers } = this.props
    const { updateTarget } = this.props
    let { viewScale } = this.props
    let { target } = this.props
    let { isTreeFinished } = this.props
    let { isSearchStarted } = this.props
    let currentTarget = null
    let highlightedNode = null
    let canvasSize = {}
    let distance = {}
    let coords = {}

    let steps = [75, 95, 50]
    let xSize = 2600, ySize = 1200
    let xVal = 37.5, yVal = 50
    let diff = Math.pow(2, layers - 5) * 100
    
    for(var i = 6; i <= layers; i++){
      canvasSize[layers] = [xSize, ySize]
      xSize *= 2
      ySize *= 2
    }
    canvasSize[5] = [window.screen.width, window.screen.height]
    let midpoint = canvasSize[layers][0] / 2;
    coords[`y1`] = 50
    coords['x1'] = midpoint

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
    
    p.updateHighlightedNode = (newHighlightedNode) => {
      highlightedNode = newHighlightedNode
    }
    p.updateViewscale = (newViewscale) => {
      viewScale = newViewscale
    }
    p.updateIsTreeFinshed = (newValue) => {
      isTreeFinished = newValue
    }
    p.updateIsSearchStarted = (newValue) => {
      isSearchStarted = newValue
    }
    p.updateCurrentTarget = (newTarget) => {
      currentTarget = newTarget
    }
    p.setup = () => { 
      p.createCanvas(canvasSize[layers][0],canvasSize[layers][1])
      p.textAlign(p.CENTER, p.CENTER)
      p.textSize(20)
    };

    p.draw = () => {
      p.translate(translate[layers][0], translate[layers][1])
      p.scale(viewScale)
      function renderTree (type) {
        let currLayer = 2
        let anchor = 1
        let x
        if (nodes[1].index === highlightedNode) nodes[1].target ? p.fill("green") : p.fill("red") 
        else nodes[1].target ? p.fill("purple") : nodes[1].isNodeVisited ? p.fill("yellow") : p.fill("blue")
        p.ellipse(coords['x1'], coords['y1'], 35, 35)
        if(nodes[1].isNodeVisited) nodes[1].index === highlightedNode || nodes[1].target ? p.fill("white") : p.fill("black")
        else p.fill("white")
        p.text(nodes[1].value, coords['x1'], coords['y1'])
        for(var i = 2; i <= Object.keys(nodes).length; i++){
          if(Math.pow(2, currLayer) === i){
            currLayer++
          }
          if(i % 2 !== 0) {
            coords[`x${i}`] = coords[`x${anchor}`] + distance[currLayer]
            x = coords[`x${i}`]
            if(type === "lines" && nodes[i].value !== 'A' && nodes[i].ancestor.value !== 'A'){
              p.line(coords[`x${anchor}`], coords[`y${currLayer - 1}`], x, coords[`y${currLayer}`])
            }
            anchor++
          } 
          else {
            coords[`x${i}`] = coords[`x${anchor}`] - distance[currLayer]
            x = coords[`x${i}`]
            if(type === "lines" && nodes[i].value !== 'A' && nodes[i].ancestor.value !== 'A'){
              p.line(coords[`x${anchor}`], coords[`y${currLayer - 1}`], x, coords[`y${currLayer}`])
            }          
          }
          if(type === "nodes" && nodes[i].value !== 'A' && nodes[i].ancestor.value !== 'A'){
            if (nodes[i].index === highlightedNode) nodes[i].target ? p.fill("green") : p.fill("red") 
            else nodes[i].target ? p.fill("purple") : nodes[i].isNodeVisited ? p.fill("yellow") : p.fill("blue")
            p.ellipse(x, coords[`y${currLayer}`], 35, 35)
            if(nodes[i].isNodeVisited) nodes[i].index === highlightedNode || nodes[i].target ? p.fill("white") : p.fill("black")
            else p.fill("white")
            p.text(nodes[i].value, x, coords[`y${currLayer}`])
          }
        }
      }
      renderTree("lines")
      renderTree("nodes")
    }
    p.mouseClicked = function() {
      if(!isSearchStarted && isTreeFinished){
        let xPos = (p.mouseX - translate[layers][0]) / viewScale
        let yPos = (p.mouseY - translate[layers][1]) / viewScale
        let distance = p.dist( coords[`x${1}`],  coords[`y${1}`], xPos, yPos)
        if (distance < 35 / 2) {
          if(currentTarget) nodes[currentTarget].target = false
          nodes[1].target = true
          updateTarget(nodes[1].value)
          currentTarget = 1
        }
        let currLayer = 2
        for(let i = 2; i < Object.keys(nodes).length; i++){
          if(Math.pow(2, currLayer) === i){
            currLayer++
          }
          let d = p.dist( coords[`x${i}`],  coords[`y${currLayer}`], xPos, yPos)
          if (d < 35 / 2) {
            if(nodes[i].value !== 'A' && nodes[i].ancestor.value !== 'A'){
              if(currentTarget) nodes[currentTarget].target = false
              nodes[i].target = true
              updateTarget(nodes[i].value)
              currentTarget = i
            }
          }
        }
      }
    }
  }

  componentDidMount() {
    this.myP5 = new p5(this.Sketch, this.canvasRef.current);
  }

  componentDidUpdate(prevProps) {
    if (this.props.highlightedNode !== prevProps.highlightedNode) {
      this.myP5.updateHighlightedNode(this.props.highlightedNode)
    }
    if(this.props.viewScale !== prevProps.viewScale){
      this.myP5.remove();
      this.myP5 = new p5(this.Sketch, this.canvasRef.current);
      this.myP5.updateViewscale(this.props.viewScale)
    }
    if(this.props.isTreeFinished !== prevProps.isTreeFinished){
      this.myP5.updateIsTreeFinshed(this.props.isTreeFinished)
    }
    if(this.props.isSearchStarted !== prevProps.isSearchStarted){
      this.myP5.updateIsSearchStarted(this.props.isSearchStarted)
    }
    if(this.props.currentTarget !== prevProps.currentTarget){
      this.myP5.updateCurrentTarget(this.props.currentTarget)
    }
  }

  componentWillUnmount() {
    this.myP5.remove();
  }

  render() {
    return <div ref={this.canvasRef} />;
  }
}

export default Tree;