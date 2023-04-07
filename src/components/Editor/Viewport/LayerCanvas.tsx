import React from 'react';
import { useEffect, useRef, WheelEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RGBColor } from 'react-color';
import './canvas.css';

import Layer from '../../../pixit/Layer';
import { draw, pointerPosition } from '../../../pixit/utils';
import { changePointerPosition, changeScale, getFileName, getHeight, getScale, getWidth } from '../../../store/editorSlice';

interface LayerCanvasProps {
  layers: Layer[];
  activeLayerIdx: number;
  color: RGBColor;
  exportImage: boolean;
  toolFn: (canvas: HTMLCanvasElement, scale: number) => {
    handleMouseDown: (evt: MouseEvent) => void;
    handleMouseLeave?: (evt: MouseEvent) => void;
    handleMouseEnter?: (evt: MouseEvent) => void;
    removeEventListeners: () => void;
  };
};

const MIN_SCALE = 1;
const MAX_SCALE = 50;

function generateCheckboardBackground(width: number, height: number) {
  return Layer.checkboard('ckbg', width, height);
}

function LayerCanvas({ layers, activeLayerIdx, exportImage, toolFn }: LayerCanvasProps) {
  const dispatch = useDispatch();
  const scale = useSelector(getScale);
  const width = useSelector(getWidth);
  const height = useSelector(getHeight);
  const fileName = useSelector(getFileName);
  const scaleDispatch = (newScale: number) => dispatch(changeScale(newScale));
  const canvasRef = useRef(null);
  const paintCanvas = () =>
    draw(canvasRef.current, [...layers, generateCheckboardBackground(width, height)], scale);
  const exportToPNG = () => {
    if (canvasRef.current == null || !exportImage) return;
    const canvasElement = canvasRef.current as HTMLCanvasElement;
    const imgURL = canvasElement.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.download = `${fileName}.png`;
    downloadLink.href = imgURL;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
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
    if (zoomAmount == -1) scaleDispatch(Math.max(scale + zoomAmount, MIN_SCALE));
    else scaleDispatch(Math.min(scale + zoomAmount, MAX_SCALE));
  };
  useEffect(paintCanvas, [layers, activeLayerIdx, layers[activeLayerIdx].id, scale]);
  // TODO!: understand when this effect should trigger
  useEffect(bindTool);
  useEffect(exportToPNG)
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
  const onMouseMove = (evt: any) => {
    if (canvasRef.current == null) return;
    const canvasElement = canvasRef.current as HTMLCanvasElement;
    dispatch(changePointerPosition(
      pointerPosition(canvasElement, evt as MouseEvent, scale)
    ));
  };
  const canvasLockClass = layers[activeLayerIdx].locked || layers[activeLayerIdx].hidden 
    ? 'viewport__canvas-disabled' : '';
  return (
    <canvas 
      ref={canvasRef} 
      className={`viewport__canvas ${canvasLockClass}`} 
      onMouseMove={onMouseMove} 
      onWheel={onZoom} 
      onMouseDown={onMouseDown} >
    </canvas>
  );
}

export default LayerCanvas;