import { RGBColor } from "react-color";
import Layer from "../Layer";
import { Pixel, PixelPosition } from "../types";
import dragTool from "./dragTool";

function circle(layer: Layer, pixel: Pixel, dispatch: (layer: Layer) => void) {
  let activeLayer = layer;
  const center = { x: pixel.x, y: pixel.y };
  const circleCallback = (pos: PixelPosition) => {
    const radius = Math.floor(Math.sqrt(
      Math.pow(pos.x - pixel.x, 2) + Math.pow(pos.y - pixel.y, 2)
    ));
    const toColor = [];
    let chord; // technically chord length / 2
    for (let y = center.y - radius; y <= center.y + radius; y++) {
      chord = Math.floor(Math.sqrt(
        Math.pow(radius, 2) - Math.pow(Math.abs(y - center.y), 2)
      ));
      if (chord == 0) continue; // to make the circle 'smoother'
      if (radius == chord) chord -= 1; // to make the circle 'smoother'
      for (let x = center.x - chord; x <= center.x + chord; x++) {
        if (x < 0 || x >= layer.width || y < 0 || y >= layer.height) continue;
        toColor.push({ x, y, color: pixel.color });
      }
    }
    dispatch(activeLayer.colorPixels(toColor));
  }
  circleCallback(center);
  return circleCallback;
}

function circleTool(canvas: HTMLCanvasElement, layer: Layer, scale: number, color: RGBColor, dispatch: (layer: Layer) => void) {
  return dragTool(circle, canvas, layer, scale, color, dispatch);
}

export default circleTool;