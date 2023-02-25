import { RGBColor } from 'react-color';
import Layer from '../../Layer';
import { DispatchFn, Pixel, PixelPosition } from '../../types';
import { drawLine } from '../../utils';
import dragTool from './dragTool';

function line(layer: Layer, pixel: Pixel, dispatch: DispatchFn) {
  const start = { x: pixel.x, y: pixel.y };
  const lineCallback = (pos: PixelPosition) => {
    dispatch({
      layer: drawLine(layer, start, pos, pixel.color)
    });
  }
  lineCallback(start);
  return lineCallback;
}

function lineTool(canvas: HTMLCanvasElement, layer: Layer, scale: number, color: RGBColor, dispatch: DispatchFn) {
  return dragTool(line, canvas, layer, scale, color, dispatch);
}

export default lineTool;