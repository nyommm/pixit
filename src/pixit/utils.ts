import React from 'react';
import { RGBColor } from 'react-color';

import Layer from './Layer';
import { Pixel, PixelPosition, ToolOptions } from './types';

const CHECKBOARD_BACKGROUND = Layer.checkboard('cbdl', 64, 64);

/**
 * Get the position of the pixel at the client's position
 */
function pointerPosition(canvas: HTMLCanvasElement | null, 
  moveEvent: MouseEvent, scale: number): PixelPosition | undefined {
  if (canvas == null) return;
  const canvasRect = canvas.getBoundingClientRect();
  return {
    x: Math.max(Math.floor((moveEvent.clientX - canvasRect.left) / scale), 0),
    y: Math.max(Math.floor((moveEvent.clientY - canvasRect.top) / scale), 0)
  };
}

/**
 * Draw the 'pixels' on the canvas layer by layer
 */
function draw(canvas: HTMLCanvasElement | null, layers: Layer[], scale: number): void {
  if (canvas == null) return;
  layers = [...layers, CHECKBOARD_BACKGROUND];

  const width = layers[0].width;
  const height = layers[0].height;

  canvas.width = width * scale;
  canvas.height = height * scale;

  const ctx = canvas.getContext('2d');
  let color: RGBColor | undefined;

  if (ctx == null) return;

  for(let idx = layers.length - 1; idx >= 0; idx--) {
    if (layers[idx].hidden) continue;
    for (let y = 0; y < layers[idx].height; y++) {
      for (let x = 0; x < layers[idx].width; x++) {
        color = layers[idx].pixel(x, y);
        if (!color) return;
        ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},${color.a})`;
        ctx.fillRect(x * scale, y * scale, scale, scale);
      }
    }
  }
}

// TODO!: A function to draw an outline on the 'pixels'/area that will be affected by the tool
// maybe this should be one of the callbacks returned by the ToolFn
// this way each tool can handle the outline

/**
 * Generates points on a straight line between start and end
 */
function generatePointsOnLine(layer: Layer, start: PixelPosition, end: PixelPosition, numberOfPoints: number, options?: ToolOptions): PixelPosition[] {
  const points: PixelPosition[] = [];
  // to keep track of already 'drawn' pixels i.e. to prevent duplicates in points array
  const done: boolean[] = new Array(layer.width * layer.height).fill(false);
  const generateRectangle = (pos: PixelPosition, width: number, height: number) => {
    const w = Math.floor(width / 2);
    const h = Math.floor(height / 2);
    for (let y = pos.y - h; y <= pos.y + h; y++) {
      for (let x = pos.x - w; x <= pos.x + w; x++) {
        if (!layer.isPixelValid(x, y)) continue;
        if (!done[x + (layer.width * y)]) {
          points.push({ x, y });
          done[x + (layer.width * y)] = true;
        }
      }
    }
  };
  const generateSquare = (pos: PixelPosition, side: number) => generateRectangle(pos, side, side);
  const generateCircle = (center: PixelPosition, diameter: number) => {
    const radius = Math.round(diameter / 2);
    let chord;
    for (let y = center.y - radius; y <= center.y + radius; y++) {
      chord = Math.floor(Math.sqrt(
        Math.pow(radius, 2) - Math.pow(Math.abs(y - center.y), 2)
      ));
      if (chord == 0) continue; // to make the circle 'smoother'
      if (radius == chord) chord -= 1; // to make the circle 'smoother'
      for (let x = center.x - chord; x <= center.x + chord; x++) {
        if (!layer.isPixelValid(x, y)) continue;
        if (!done[x + (layer.width * y)]) {
          points.push({ x, y });
          done[x + (layer.width * y)] = true;
        }
      }
    }
  };
  const deltaX = numberOfPoints == 0 ? 0 : (end.x - start.x) / numberOfPoints;
  const deltaY = numberOfPoints == 0 ? 0 : (end.y - start.y) / numberOfPoints;
  const thickness = options?.thickness?.value;
  let prevPosition = { x: Number.MAX_SAFE_INTEGER, y: Number.MIN_SAFE_INTEGER };
  let x = start.x, y = start.y;
  let exit = false;
  do {
    const x1 = Math.round(x);
    const y1 = Math.round(y);
    // if (x1,y1) is the end point exit this loop
    if (x1 == Math.round(end.x) && y1 == Math.round(end.y)) exit = true;
    // if thickness == 1px no need to draw a shape
    if (thickness && thickness > 1) {
      if ((x >= (prevPosition.x + thickness / 4) || x <= (prevPosition.x - thickness / 4)) || 
        (y >= (prevPosition.y + thickness / 4) || y <= (prevPosition.y - thickness / 4))) {
        switch(options.toolShape) {
          case 'square':
            generateSquare({ x: x1, y: y1 }, thickness);
            break;
          case 'circle':
          default:
            generateCircle({ x: x1, y: y1 }, thickness);
        }
        prevPosition.x = x;
        prevPosition.y = y;
      }
    } else {
      if (!done[x1 + (layer.width * y1)]) {
        points.push({ x: x1, y: y1 });
        done[x1 + (layer.width * y1)] = true;
      }
    }
    x += deltaX;
    y += deltaY;
  } while (!exit)
  return points;
}

function drawLine(layer: Layer, start: PixelPosition, end: PixelPosition, color: RGBColor, options?: ToolOptions): Layer {
  const toColor: Pixel[] = [];
  // TODO!: Optimize for large thickness values
  const points = generatePointsOnLine(
    layer, start, end,
    // *Optimization Idea: reduce numberOfPoints proportional to thickness
    Math.round(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)),
    options
  );
  for (const point of points) {
    if (!layer.isPixelValid(point.x, point.y))
      continue;
    toColor.push({
      x: Math.round(point.x),
      y: Math.round(point.y),
      color,
    });
  }
  return layer.colorPixels(toColor);
}

export {
  draw,
  drawLine,
  pointerPosition
};