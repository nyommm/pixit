import { RGBColor } from 'react-color';
import Layer from '../Layer';
import { Pixel, PixelPosition } from '../types';
import { drawLine, pointerPosition } from '../utils';

function pen(layer: Layer, pixel: Pixel, dispatch: (layer: Layer) => void) {
  let activeLayer = layer;
  let start = { x: pixel.x, y: pixel.y };
  const penCallback = (pos: PixelPosition) => {
    // if the cursor goes out of the canvas reset start
    if (pos.x == 0 || pos.x == layer.width - 1 || 
      pos.y == 0 || pos.y == layer.height - 1) start = pos;
    activeLayer = drawLine(activeLayer, start, pos, pixel.color);
    start = pos;
    dispatch(activeLayer);
  };
  penCallback(start);
  return penCallback;
}

function penTool(canvas: HTMLCanvasElement, layer: Layer, scale: number, color: RGBColor, dispatch: (layer: Layer) => void) {
  let handleMouseMove: (moveEvent: any) => void;
  const handleMouseDown = (evt: MouseEvent) => {
    // evt.stopPropagation();
    if (evt.button == 0) {
      let pos = pointerPosition(canvas, evt, scale);
      if (!pos) return;
      const toolMoveFn = pen(layer, { ...pos, color }, dispatch);
      handleMouseMove = (moveEvent: any) => {
        if (moveEvent.buttons != 1) {
          canvas.removeEventListener('mousemove', handleMouseMove);
        } else {
          const newPos = pointerPosition(canvas, moveEvent, scale);
          if (!newPos || !pos) return;
          if (pos.x == newPos.x && pos.y == newPos.y) return;
          toolMoveFn(newPos);
          pos = newPos;
        }
      }
      canvas.addEventListener('mousemove', handleMouseMove);
    }
  };
  // this may be unnecessary
  const handleMouseLeave = (evt: MouseEvent) => {
    evt.stopPropagation();
    canvas.removeEventListener('mousemove', handleMouseMove);
  }
  const removeEventListeners = () => {
    canvas.removeEventListener('mousedown', handleMouseDown);
    canvas.removeEventListener('mouseleave', handleMouseLeave);
  }
  return {
    handleMouseDown,
    handleMouseLeave,
    removeEventListeners,
  };
}

export default penTool;