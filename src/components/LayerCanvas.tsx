import React from 'react';
import { useState, useEffect, useRef, WheelEvent } from 'react';

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
  const onMoveRef = useRef((evt: any) => {});
  const canvasRef = useRef(null);
  const idx = layers.findIndex((layer) => layer.id === activeLayer);
  const paintCanvas = () => {
    draw(canvasRef.current, layers.slice(0, idx + 1), scale);
  };
  useEffect(paintCanvas, [layers, layers[idx], activeLayer, scale]);
  useEffect(() => {
    if (canvasRef.current == null) return;
    (canvasRef.current as HTMLCanvasElement).addEventListener('mousemove', onMoveRef.current);
  }, [onMoveRef.current]);
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
  const toolCallback = (evt: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    evt.stopPropagation();
    if (evt.button == 0) {
      let pos = pointerPosition(canvasRef.current, evt, scale);
      if (!pos) return;
      const toolMoveFn = toolFn(pos);
      const onMoveCallback = (moveEvent: any) => {
        if (canvasRef.current == null) return;
        if (moveEvent.buttons == 0) {
          (canvasRef.current as HTMLCanvasElement).removeEventListener('mousemove', onMoveCallback);
        } else if (moveEvent.button == 0) {
          const newPos = pointerPosition(canvasRef.current, moveEvent, scale);
          if (!newPos) return;
          if (pos && pos.x == newPos.x && pos.y == newPos.y) return;
          toolMoveFn(newPos);
          pos = newPos;
        }
      }
      onMoveRef.current = onMoveCallback;
    }
  };
  return (
    <canvas 
      ref={canvasRef} 
      className="viewport__canvas" 
      onWheel={onZoom} 
      onMouseDown={toolCallback} >
    </canvas>
  );
}

export default LayerCanvas;