import { RGBColor } from "react-color";
import Layer from "../Layer";
import { DispatchFn, Pixel } from "../types";
import clickTool from "./clickTool";

function colorPicker(layer: Layer, pixel: Pixel, dispatch: DispatchFn) {
  const color = layer.pixel(pixel.x, pixel.y);
  if (color)
    dispatch({ color });
}

function colorPickerTool(canvas: HTMLCanvasElement, layer: Layer, scale: number, color: RGBColor, dispatch: DispatchFn) {
  return clickTool(colorPicker, canvas, layer, scale, color, dispatch);
}

export default colorPickerTool;