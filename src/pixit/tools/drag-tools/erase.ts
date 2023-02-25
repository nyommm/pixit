import { RGBColor } from 'react-color';
import Layer from '../../Layer';
import { Pixel, PixelPosition, DispatchFn } from '../../types';
import { drawLine } from '../../utils';
import dragTool from './dragTool';

const TRANSPARENT = { r: 0, g: 0, b: 0, a: 0 };

function erase(layer: Layer, pixel: Pixel, dispatch: DispatchFn) {
  let activeLayer = layer;
  let start = { x: pixel.x, y: pixel.y };
  const eraseCallback = (pos: PixelPosition) => {
    // if the cursor goes out of the canvas reset start
    if (pos.x == 0 || pos.x == layer.width - 1 || 
      pos.y == 0 || pos.y == layer.height - 1) start = pos;
    activeLayer = drawLine(activeLayer, start, pos, TRANSPARENT);
    start = pos;
    dispatch({ layer: activeLayer });
  };
  eraseCallback(start);
  return eraseCallback;
}

function eraseTool(canvas: HTMLCanvasElement, layer: Layer, scale: number, color: RGBColor, dispatch: DispatchFn) {
  return dragTool(erase, canvas, layer, scale, color, dispatch);
}

export default eraseTool;