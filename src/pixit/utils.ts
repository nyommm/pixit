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

function generatePointsOnLine(start: PixelPosition, end: PixelPosition, numberOfPoints: number, options?: ToolOptions): PixelPosition[] {
  const points: PixelPosition[] = [];
  const deltaX = numberOfPoints == 0 ? 0 : (end.x - start.x) / numberOfPoints;
  const deltaY = numberOfPoints == 0 ? 0 : (end.y - start.y) / numberOfPoints;
  const thickness = options?.thickness?.value;
  let prevPosition = { x: Number.MAX_SAFE_INTEGER, y: Number.MIN_SAFE_INTEGER };
  let x = start.x, y = start.y;
  do {
    if (thickness && thickness > 1) {
      if ((x >= (prevPosition.x + thickness / 3) || x <= (prevPosition.x - thickness / 3)) || 
        (y >= (prevPosition.y + thickness / 3) || y <= (prevPosition.y - thickness / 3))) {
        switch(options.toolShape) {
          case 'square':
            points.push(...generateSquare({ x, y }, thickness));
            break;
          case 'circle':
          default:
            points.push(...generateCircle({ x, y }, thickness));
        }
        prevPosition.x = x;
        prevPosition.y = y;
      }
    } else {
      points.push({ x, y });
    }
    x += deltaX;
    y += deltaY;
  } while (Math.round(x) != Math.round(end.x) || Math.round(y) != Math.round(end.y))
  return points;
}

function generateRectangle(pos: PixelPosition, width: number, height: number): PixelPosition[] {
  const rect: PixelPosition[] = [];
  const w = Math.floor(width / 2);
  const h = Math.floor(height / 2);
  for (let y = pos.y - h; y <= pos.y + h; y++) {
    for (let x = pos.x - w; x <= pos.x + w; x++) {
      rect.push({ x, y });
    }
  }
  return rect;
}

function generateSquare(pos: PixelPosition, side: number): PixelPosition[] {
  return generateRectangle(pos, side, side);
}

function generateCircle(center: PixelPosition, diameter: number): PixelPosition[] {
  const circle: PixelPosition[] = [];
  const radius = Math.round(diameter / 2);
  let chord;
  for (let y = center.y - radius; y <= center.y + radius; y++) {
    chord = Math.floor(Math.sqrt(
      Math.pow(radius, 2) - Math.pow(Math.abs(y - center.y), 2)
    ));
    if (chord == 0) continue; // to make the circle 'smoother'
    if (radius == chord) chord -= 1; // to make the circle 'smoother'
    for (let x = center.x - chord; x <= center.x + chord; x++) {
      circle.push({ x, y });
    }
  }
  return circle;
}

// TODO!: Need to add thickness to the line
// User should be able to set the thickness of pen/erase/line tool
function drawLine(layer: Layer, start: PixelPosition, end: PixelPosition, color: RGBColor, options?: ToolOptions): Layer {
  const toColor: Pixel[] = [];
  // TODO!: Optimize for large thickness values
  const points = generatePointsOnLine(
    start, end,
    // *Optimization Idea: reduce numberOfPoints proportional to thickness
    Math.round(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)),
    options
  );
  for (const point of points) {
    if (point.x < 0 || point.x >= layer.width || 
        point.y < 0 || point.y >= layer.height)
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