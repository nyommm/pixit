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

function drawLine(layer: Layer, start: PixelPosition, end: PixelPosition, color: RGBColor): Layer {
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

export {
  draw,
  drawLine,
  pointerPosition
};