import React from 'react';
import { RGBColor } from 'react-color';

import Layer from './Layer';
import { Pixel, PixelPosition } from './types';

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

// TODO: A function to draw an outline on the 'pixels'/area that will be affected by the tool

function generatePointsOnLine(start: PixelPosition, end: PixelPosition, numberOfPoints: number): PixelPosition[] {
  const points: PixelPosition[] = [];
  const deltaX = (end.x - start.x) / numberOfPoints;
  const deltaY = (end.y - start.y) / numberOfPoints;
  for (let x = start.x, y = start.y; points.length <= numberOfPoints;) {
    points.push({ x, y });
    x += deltaX;
    y += deltaY;
  }
  return points;
}

// TODO!: Need to add thickness to the line
// User should be able to set the thickness of pen/erase/line tool
function drawLine(layer: Layer, start: PixelPosition, end: PixelPosition, color: RGBColor): Layer {
  const toColor: Pixel[] = [];
  // TODO!: the numberOfPixels should be dynamically set depending on the distance between start and end
  const points = generatePointsOnLine(start, end, 2000);
  for (const point of points) {
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