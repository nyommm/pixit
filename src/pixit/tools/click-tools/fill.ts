import { RGBColor } from "react-color";
import Layer from "../../Layer";
import { DispatchFn, Pixel } from "../../types";
import clickTool from "./clickTool";

function isSameColor(color1: RGBColor, color2: RGBColor) {
  if (color1.r != color2.r) return false;
  if (color1.g != color2.g) return false;
  if (color1.b != color2.b) return false;
  if (color1.a != color2.a) return false;
  return true;
}

function fill(layer: Layer, pixel: Pixel, dispatch: DispatchFn) {
  const targetColor = layer.pixel(pixel.x, pixel.y);
  const toColor = [pixel];
  const directions = [
    { dx: 1, dy: 0 }, { dx: -1, dy: 0 },
    { dx: 0, dy: 1 }, { dx: 0, dy: -1 },
  ];
  
  for (let done = 0; done < toColor.length; done++) {
    for (let { dx, dy } of directions) {
      const x = toColor[done].x + dx;
      const y = toColor[done].y + dy;

      if (x >= 0 && x < layer.width && 
        y >= 0 && y < layer.height && 
        isSameColor(layer.pixel(x, y), targetColor) && 
        !toColor.some((p) => p.x === x && p.y === y)) {
        toColor.push({ x, y, color: pixel.color });
      }
    }
    dispatch({ layer: layer.colorPixels(toColor) });
  }
}

function fillTool(canvas: HTMLCanvasElement, layer: Layer, scale: number, color: RGBColor, dispatch: DispatchFn) {
  return clickTool(fill, canvas, layer, scale, color, dispatch);
}

export default fillTool;