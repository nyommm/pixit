import { RGBColor } from 'react-color';
import Layer from '../../Layer';
import { DispatchFn, Pixel, PixelPosition, ToolOptions } from '../../types';
import { shadeLayer, shadePixels } from '../../utils';
import dragTool from './dragTool';

function shade(layer: Layer, pixel: Pixel, dispatch: DispatchFn, options?: ToolOptions) {
  let activeLayer = layer;
  let start = { x: pixel.x, y: pixel.y };
  const shadedLayer = shadeLayer(layer, options);
  const shadeCallback = (pos: PixelPosition) => {
    // if the cursor goes out of the canvas reset start
    if (pos.x == 0 || pos.x == layer.width - 1 || 
      pos.y == 0 || pos.y == layer.height - 1) start = pos;
    const positions = shadePixels(activeLayer, start, pos, options);
    start = pos;
    const pixels: Pixel[] = [];
    for (const pos of positions) {
      const color = shadedLayer.pixel(pos.x, pos.y)
      if (!color || !color.a) continue;
      pixels.push({ ...pos, color });
    }
    activeLayer = activeLayer.colorPixels(pixels);
    dispatch({ layer: activeLayer });
  };
  shadeCallback(start);
  return shadeCallback;
}

function shadingTool(canvas: HTMLCanvasElement, layer: Layer, scale: number, color: RGBColor, dispatch: DispatchFn, options?: ToolOptions) {
  return dragTool(shade, canvas, layer, scale, color, dispatch, options);
}

export default shadingTool;