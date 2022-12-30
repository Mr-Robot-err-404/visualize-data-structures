import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

const Tree = ({root}) => {
  const wrapper = useRef(null);
  const distance = { 
    3: 130, 
    4: 60,
    5: 30
  }
  useEffect(() => {
    const canvas = new p5(p => {
      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
      };

      p.draw = () => {
        const midpoint = window.innerWidth / 2;
        const coords = {
          y1: 50,
          y2: 150, 
          y3: 225,
          y4: 320,
          y5: 370,
          x1: midpoint,
          x2: midpoint - 300,
          x3: midpoint + 300
        };
        p.background(document.body.style.backgroundColor);
        let currLayer = 3 
        let anchor = 2
        let x
        for(var i = 4; i < 32; i++){
          if(Math.pow(2, currLayer) === i){
            currLayer++
          }
          if(i % 2 !== 0) {
            coords[`x${i}`] = coords[`x${anchor}`] + distance[currLayer]
            x = coords[`x${i}`]
            p.line(coords[`x${anchor}`], coords[`y${currLayer - 1}`], x, coords[`y${currLayer}`])
            anchor++
          } 
          else {
            coords[`x${i}`] = coords[`x${anchor}`] - distance[currLayer]
            x = coords[`x${i}`]
            p.line(coords[`x${anchor}`], coords[`y${currLayer - 1}`], x, coords[`y${currLayer}`])
          }
          p.ellipse(coords[`x${i}`], coords[`y${currLayer}`], 35, 35)
        }
        p.ellipse(coords['x1'], coords['y1'], 35, 35);
        p.ellipse(coords['x2'], coords['y2'], 35, 35);
        p.ellipse(coords['x3'], coords['y2'], 35, 35);
        p.line(coords['x1'], coords['y1'], coords['x2'], coords['y2']);
        p.line(coords['x1'], coords['y1'], coords['x3'], coords['y2']);
      };
    }, wrapper.current);

    window.addEventListener('resize', () => {
      canvas.resizeCanvas(window.innerWidth, window.innerHeight);
    });

    return () => {
      window.removeEventListener('resize', () => {});
      canvas.remove();
    };
  });

  return <div ref={wrapper} />;
};

export default Tree