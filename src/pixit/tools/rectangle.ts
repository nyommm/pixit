import { RGBColor } from "react-color";
import Layer from "../Layer";
import { DispatchFn, Pixel, PixelPosition } from "../types";
import dragTool from "./dragTool";

function rectangle(layer: Layer, pixel: Pixel, dispatch: DispatchFn) {
  const activeLayer = layer;
  const rectCallback = (pos: PixelPosition) => {
    const startX = Math.min(pixel.x, pos.x);
    const startY = Math.min(pixel.y, pos.y);
    const endX = Math.max(pixel.x, pos.x);
    const endY = Math.max(pixel.y, pos.y);
    const toColor = [];
    for (let y = startY; y <= endY; y++) {
      for (let x = startX; x <= endX; x++) {
        toColor.push({ x, y, color: pixel.color});
      }
    }
    dispatch({ layer: activeLayer.colorPixels(toColor) });
  }
  rectCallback({ x: pixel.x, y: pixel.y });
  return rectCallback;
}

function rectTool(canvas: HTMLCanvasElement, layer: Layer, scale: number, color: RGBColor, dispatch: DispatchFn) {
  return dragTool(rectangle, canvas, layer, scale, color, dispatch);
}

export default rectTool;