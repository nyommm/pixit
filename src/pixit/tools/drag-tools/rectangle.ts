import { RGBColor } from "react-color";
import Layer from "../../Layer";
import { DispatchFn, Pixel, PixelPosition, ToolOptions } from "../../types";
import dragTool from "./dragTool";

function rectangle(layer: Layer, pixel: Pixel, dispatch: DispatchFn, options?: ToolOptions) {
  const activeLayer = layer;
  const rectCallback = (pos: PixelPosition) => {
    const startX = Math.min(pixel.x, pos.x);
    const startY = Math.min(pixel.y, pos.y);
    const endX = Math.max(pixel.x, pos.x);
    const endY = Math.max(pixel.y, pos.y);
    const toColor = [];
    const thickness = options?.thickness?.value ? options.thickness.value - 1 : 0;
    for (let y = startY; y <= endY; y++) {
      for (let x = startX; x <= endX; x++) {
        if ((options?.fill !== undefined && !options.fill) 
          && (x > (startX + thickness) && x < (endX - thickness) && y > (startY + thickness) && y < (endY - thickness)))
          continue;
        toColor.push({ x, y, color: pixel.color});
      }
    }
    dispatch({ layer: activeLayer.colorPixels(toColor) });
  }
  rectCallback({ x: pixel.x, y: pixel.y });
  return rectCallback;
}

function rectTool(canvas: HTMLCanvasElement, layer: Layer, scale: number, color: RGBColor, dispatch: DispatchFn, options?: ToolOptions) {
  return dragTool(rectangle, canvas, layer, scale, color, dispatch, options);
}

export default rectTool;