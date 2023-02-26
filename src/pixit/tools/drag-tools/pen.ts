import { RGBColor } from 'react-color';
import Layer from '../../Layer';
import { DispatchFn, Pixel, PixelPosition, ToolOptions } from '../../types';
import { drawLine } from '../../utils';
import dragTool from './dragTool';

function pen(layer: Layer, pixel: Pixel, dispatch: DispatchFn, options?: ToolOptions) {
  let activeLayer = layer;
  let start = { x: pixel.x, y: pixel.y };
  const penCallback = (pos: PixelPosition) => {
    // if the cursor goes out of the canvas reset start
    if (pos.x == 0 || pos.x == layer.width - 1 || 
      pos.y == 0 || pos.y == layer.height - 1) start = pos;
    activeLayer = drawLine(activeLayer, start, pos, pixel.color, options);
    start = pos;
    dispatch({ layer: activeLayer });
  };
  penCallback(start);
  return penCallback;
}

function penTool(canvas: HTMLCanvasElement, layer: Layer, scale: number, color: RGBColor, dispatch: DispatchFn, options?: ToolOptions) {
  return dragTool(pen, canvas, layer, scale, color, dispatch, options);
}

export default penTool;