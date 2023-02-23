import React from 'react';
import { useState, useEffect, useRef, WheelEvent } from 'react';
import { RGBColor } from 'react-color';
import './canvas.css';

import Layer from '../pixit/Layer';
import { draw } from '../pixit/utils';
import { ToolFn } from '../pixit/types';

interface LayerCanvasProps {
  layers: Layer[];
  activeLayerIdx: number;
  color: RGBColor;
  toolFn: (canvas: HTMLCanvasElement, scale: number) => {
    handleMouseDown: (evt: MouseEvent) => void;
    handleMouseLeave?: (evt: MouseEvent) => void;
    handleMouseEnter?: (evt: MouseEvent) => void;
    removeEventListeners: () => void;
  };
};

const DEFAULT_SCALE = 6;
const MIN_SCALE = DEFAULT_SCALE / 2;
const MAX_SCALE = DEFAULT_SCALE * 2;

function LayerCanvas({ layers, activeLayerIdx, toolFn }: LayerCanvasProps) {
  const [scale, setScale] = useState(DEFAULT_SCALE);
  const canvasRef = useRef(null);
  const paintCanvas = () => {
    draw(canvasRef.current, layers.slice(activeLayerIdx), scale);
  };
  const bindTool = () => {
    if (layers[activeLayerIdx].locked || layers[activeLayerIdx].hidden) return;
    if (canvasRef.current == null) return;
    const canvasElement = canvasRef.current as HTMLCanvasElement;
    const tool = toolFn(canvasElement, scale);
    canvasElement.addEventListener('mousedown', tool.handleMouseDown);
    if (tool.handleMouseLeave) canvasElement.addEventListener('mouseleave', tool.handleMouseLeave);
    if (tool.handleMouseEnter) canvasElement.addEventListener('mouseenter', tool.handleMouseEnter);
    return tool.removeEventListeners;
  };
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
  useEffect(paintCanvas, [layers[activeLayerIdx], layers[activeLayerIdx].id, scale]);
  useEffect(bindTool);
  // TODO!: Need to find a better way to handle adding/removing event listeners
  // For now panning the canvas will be taken care of with this
  const onMouseDown = (evt: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    evt.stopPropagation();
    if (canvasRef.current == null) return;
    const canvasElement = canvasRef.current as HTMLCanvasElement;
    if (evt.button == 1) {
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
      className={`viewport__canvas ${layers[activeLayerIdx].locked ? 'viewport__canvas-disabled' : ''}`}
      onWheel={onZoom} 
      onMouseDown={onMouseDown} >
    </canvas>
  );
}

export default LayerCanvas;