import { RGBColor } from "react-color";
import Layer from "../../Layer";
import { DispatchFn, Pixel, PixelPosition } from "../../types";
import dragTool from "./dragTool";

// * maybe this can be used later
// function circle(layer: Layer, pixel: Pixel, dispatch: DispatchFn) {
//   let activeLayer = layer;
//   const center = { x: pixel.x, y: pixel.y };
//   const circleCallback = (pos: PixelPosition) => {
//     const radius = Math.floor(Math.sqrt(
//       Math.pow(pos.x - pixel.x, 2) + Math.pow(pos.y - pixel.y, 2)
//     ));
//     const toColor = [];
//     let chord; // technically chord length / 2
//     for (let y = center.y - radius; y <= center.y + radius; y++) {
//       chord = Math.floor(Math.sqrt(
//         Math.pow(radius, 2) - Math.pow(Math.abs(y - center.y), 2)
//       ));
//       if (chord == 0) continue; // to make the circle 'smoother'
//       if (radius == chord) chord -= 1; // to make the circle 'smoother'
//       for (let x = center.x - chord; x <= center.x + chord; x++) {
//         if (x < 0 || x >= layer.width || y < 0 || y >= layer.height) continue;
//         toColor.push({ x, y, color: pixel.color });
//       }
//     }
//     dispatch({ layer: activeLayer.colorPixels(toColor) });
//   }
//   circleCallback(center);
//   return circleCallback;
// }

function ellipse(layer: Layer, pixel: Pixel, dispatch: DispatchFn) {
  let activeLayer = layer;
  const center = { x: pixel.x, y: pixel.y };
  const ellipseCallback = (pos: PixelPosition) => {
    const toColor = [];
    const deltaY = Math.floor(Math.abs(pos.y - center.y));
    const deltaX = Math.floor(Math.abs(pos.x - center.x));
    // TODO!: IDK why but it only works if I swap the minor and major axis :(
    if (deltaY <= deltaX) {
      const a = deltaX // minor axis
      const b = deltaY // major axis
      let chord; // technically chord length / 2
      for (let y = center.y - a; y <= center.y + a; y++) {
        // length of chord // to major axis
        chord = Math.floor(a * Math.sqrt(1 - Math.pow((y - center.y) / b, 2)));
        if (chord == 0) continue; // to make the circle 'smoother'
        if (y == center.y) chord -= 1; // to make the circle 'smoother'
        for (let x = center.x - chord; x <= center.x + chord; x++) {
          if (x < 0 || x >= layer.width || y < 0 || y >= layer.height) continue;
          toColor.push({ x, y, color: pixel.color });
        }
      }
    } else {
      const a = deltaY // minor axis
      const b = deltaX // major axis
      let chord; // technically chord length / 2
      for (let x = center.x - a; x <= center.x + a; x++) {
        // length of chord // to major axis
        chord = Math.floor(a * Math.sqrt(1 - Math.pow((x - center.x) / b, 2)));
        if (chord == 0) continue; // to make the circle 'smoother'
        if (x == center.x) chord -= 1; // to make the circle 'smoother'
        for (let y = center.y - chord; y <= center.y + chord; y++) {
          if (x < 0 || x >= layer.width || y < 0 || y >= layer.height) continue;
          toColor.push({ x, y, color: pixel.color });
        }
      }
    }
    dispatch({ layer: activeLayer.colorPixels(toColor) });
  }
  ellipseCallback(center);
  return ellipseCallback;
}

function ellipseTool(canvas: HTMLCanvasElement, layer: Layer, scale: number, color: RGBColor, dispatch: DispatchFn) {
  return dragTool(ellipse, canvas, layer, scale, color, dispatch);
}

export default ellipseTool;