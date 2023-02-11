import React from 'react';

import Layer from './Layer';
import { PixelPosition } from './types';

/**
 * Get the position of the pixel at the client's position
 */
function pointerPosition(canvas: HTMLCanvasElement | null, 
  moveEvent: React.MouseEvent<HTMLCanvasElement, MouseEvent>, 
  scale: number): PixelPosition | undefined {
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
  if (canvas == null || layers.length == 0) return;

  const width = layers[0].width;
  const height = layers[0].height;

  canvas.width = width * scale;
  canvas.height = height * scale;

  const ctx = canvas.getContext('2d');
  let color: string | undefined;

  if (ctx == null) return;

  for(const layer of layers) {
    for (let y = 0; y < layer.height; y++) {
      for (let x = 0; x < layer.width; x++) {
        color = layer.pixel(x, y);
        if (color) {
          ctx.fillStyle = color;
          ctx.fillRect(x * scale, y * scale, scale, scale);
        }
      }
    }
  }
}

// TODO: A function to draw an outline on the 'pixels'/area that will be affected by the tool

export {
  draw,
  pointerPosition
};