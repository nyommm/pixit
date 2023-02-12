import React from 'react';
import { useState, useEffect, useRef, WheelEvent } from 'react';
import './canvas.css';

import Layer from '../pixit/Layer';
import { draw, pointerPosition } from '../pixit/utils';
import { PixelPosition } from '../pixit/types';

interface LayerCanvasProps {
  layers: Layer[];
  activeLayer: string;
  toolFn: (pos: PixelPosition) => (pos: PixelPosition) => void;
};

const DEFAULT_SCALE = 6;
const MIN_SCALE = DEFAULT_SCALE / 2;
const MAX_SCALE = DEFAULT_SCALE * 2;

function LayerCanvas({ layers, activeLayer, toolFn }: LayerCanvasProps) {
  const [scale, setScale] = useState(DEFAULT_SCALE);
  const canvasRef = useRef(null);
  const idx = layers.findIndex((layer) => layer.id === activeLayer);
  const paintCanvas = () => {
    draw(canvasRef.current, layers.slice(0, idx + 1), scale);
  };
  useEffect(paintCanvas, [layers, layers[idx], activeLayer, scale]);
  const onZoom = (evt: WheelEvent<HTMLCanvasElement>) => {
    evt.stopPropagation();
    // the change in scale will be either 1 or -1
    // this is done to prevent appearance of gridlines
    // when the scale is not an integer.
    // The problem with this is that the zoom won't be smooth
    const zoomAmount = evt.deltaY / (Math.abs(evt.deltaY));
    if (zoomAmount == -1) setScale(Math.max(scale + zoomAmount, MIN_SCALE));
    else setScale(Math.min(scale + zoomAmount, MAX_SCALE));
  };
  // TODO!: Need to find a better way to handle adding/removing event listeners
  // The main problem is that the toolFn (as the layer(s) will be updated) will always cause a 
  // re-render of the LayerCanvas and therefor if we use a ref to the onMove callback it 
  // can be added everytime the ref changes using useEffect. But the pan callback (button 1) 
  // there is no need to re-render the canvas again as the layers/scale etc won't change 
  const onMouseDown = (evt: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    evt.stopPropagation();
    if (canvasRef.current == null) return;
    const canvasElement = canvasRef.current as HTMLCanvasElement;
    if (evt.button == 0) {
      let pos = pointerPosition(canvasRef.current, evt, scale);
      if (!pos) return;
      const toolMoveFn = toolFn(pos);
      const onMoveCallback = (moveEvent: any) => {
        if (moveEvent.buttons != 1) {
          canvasElement.removeEventListener('mousemove', onMoveCallback);
        } else {
          const newPos = pointerPosition(canvasRef.current, moveEvent, scale);
          if (!newPos || !pos) return;
          if (pos.x == newPos.x && pos.y == newPos.y) return;
          toolMoveFn(newPos);
          pos = newPos;
        }
      }
      canvasElement.addEventListener('mousemove', onMoveCallback);
    } else if (evt.button == 1) {
      let x = evt.clientX, y = evt.clientY;
      let offsetX = 0, offsetY = 0;
      const onMoveCallback = (moveEvent: any) => {
        if (moveEvent.buttons != 4) {
          canvasElement.removeEventListener('mousemove', onMoveCallback);
        } else {
          offsetX = x - moveEvent.clientX;
          offsetY = y - moveEvent.clientY;
          canvasElement.style.left = `${canvasElement.offsetLeft - offsetX}px`;
          canvasElement.style.top = `${canvasElement.offsetTop - offsetY}px`;
          x = moveEvent.clientX;
          y = moveEvent.clientY;
        }
      }
      canvasElement.addEventListener('mousemove', onMoveCallback);
    }
  };
  return (
    <canvas 
      ref={canvasRef} 
      className="viewport__canvas" 
      onWheel={onZoom} 
      onMouseDown={onMouseDown} >
    </canvas>
  );
}

export default LayerCanvas;