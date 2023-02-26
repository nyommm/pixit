import { RGBColor } from "react-color";
import Layer from "../../Layer";
import { DispatchFn, Pixel, PixelPosition, ToolOptions } from "../../types";
import dragTool from "./dragTool";

function ellipse(layer: Layer, pixel: Pixel, dispatch: DispatchFn, options?: ToolOptions) {
  let activeLayer = layer;
  const center = { x: pixel.x, y: pixel.y };
  const ellipseCallback = (pos: PixelPosition) => {
    const toColor = [];
    const deltaY = Math.floor(Math.abs(pos.y - center.y));
    const deltaX = Math.floor(Math.abs(pos.x - center.x));
    const thickness = options?.thickness?.value ? options.thickness.value : 1;
    // TODO!: IDK why but it only works if I swap the minor and major axis :(
    // !The logic here is kind of whack, need to understand it first before adding anything else
    // *but it works for the most part :)
    if (deltaY <= deltaX) {
      const a = deltaX // minor axis
      const b = deltaY // major axis
      let chord; // technically chord length / 2
      for (let y = center.y - a; y <= center.y + a; y++) {
        // length of chord parallel to major axis
        chord = Math.floor(a * Math.sqrt(1 - Math.pow((y - center.y) / b, 2)));
        if (chord == 0) continue; // to make the circle 'smoother'
        if (y == center.y) chord -= 1; // to make the circle 'smoother'
        for (let x = center.x - chord; x <= center.x + chord; x++) {
          if (!layer.isPixelValid(x, y)) continue;
          if ((options?.fill !== undefined && !options.fill) && 
            ((x > center.x - (chord - thickness) && x < center.x + (chord - thickness)) && 
            (y > center.y - (b - thickness) && y < center.y + (b - thickness))))
            continue;
          toColor.push({ x, y, color: pixel.color });
        }
      }
    } else {
      const a = deltaY // minor axis
      const b = deltaX // major axis
      let chord; // technically chord length / 2
      for (let x = center.x - a; x <= center.x + a; x++) {
        // length of chord parallel to major axis
        chord = Math.floor(a * Math.sqrt(1 - Math.pow((x - center.x) / b, 2)));
        if (chord == 0) continue; // to make the circle 'smoother'
        if (x == center.x) chord -= 1; // to make the circle 'smoother'
        for (let y = center.y - chord; y <= center.y + chord; y++) {
          if (!layer.isPixelValid(x, y)) continue;
          if ((options?.fill !== undefined && !options.fill) && 
            ((y > center.y - (chord - thickness) && y < center.y + (chord - thickness)) && 
            (x > center.x - (b - thickness) && x < center.x + (b - thickness))))
            continue;
          toColor.push({ x, y, color: pixel.color });
        }
      }
    }
    dispatch({ layer: activeLayer.colorPixels(toColor) });
  }
  ellipseCallback(center);
  return ellipseCallback;
}

function ellipseTool(canvas: HTMLCanvasElement, layer: Layer, scale: number, color: RGBColor, dispatch: DispatchFn, options?: ToolOptions) {
  return dragTool(ellipse, canvas, layer, scale, color, dispatch, options);
}

export default ellipseTool;