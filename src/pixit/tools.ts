import Layer from './Layer';
import { Pixel, PixelPosition, ToolFn } from './types';

export interface PixitTools {
  pen: ToolFn;
  rectangle: ToolFn;
  circle: ToolFn
};

function drawLine(layer: Layer, start: PixelPosition, end: PixelPosition, color: string): Layer {
  const toColor: Pixel[] = [];
  const deltaX = start.x <= end.x ? 1 : -1;
  const deltaY = start.y <= end.y ? 1 : -1;
  let x = start.x, y = start.y;
  while (true) {
    toColor.push({ x, y, color });
    if (x == end.x && y == end.y) break;
    if (x != end.x) x += deltaX;
    if (y != end.y) y += deltaY;
  }
  return layer.colorPixels(toColor);
}

function pen(layer: Layer, pixel: Pixel, dispatch: (layer: Layer) => void) {
  let activeLayer = layer;
  let start = { x: pixel.x, y: pixel.y };
  const penCallback = (pos: PixelPosition) => {
    activeLayer = drawLine(activeLayer, start, pos, pixel.color);
    start = pos;
    dispatch(activeLayer);
  };
  penCallback(start);
  return penCallback;
}

function rectangle(layer: Layer, pixel: Pixel, dispatch: (layer: Layer) => void) {
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
    dispatch(activeLayer.colorPixels(toColor));
  }
  rectCallback({ x: pixel.x, y: pixel.y });
  return rectCallback;
}

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

export const tools: PixitTools = {
  pen,
  rectangle,
  circle
};