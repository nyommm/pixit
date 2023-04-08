import React from 'react';
import { RGBColor } from 'react-color';

import Layer from './Layer';
import { CanvasGrid, MirrorAxis, Pixel, PixelPosition, ToolOptions } from './types';

interface Position {
  x: number;
  y: number;
};

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

function drawGridLine(canvas: HTMLCanvasElement, start: Position, end: Position): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
}

function drawPixelGrid(canvas: HTMLCanvasElement, width: number, height: number, scale: number, size: number = 1) {
  const startX = 0;
  const endX = (width) * scale;
  const startY = 0;
  const endY = (height) * scale;
  for (let y = 0; y < height; y += size)
    drawGridLine(canvas, { x: startX, y: y * scale }, { x: endX, y: y * scale });
  for (let x = 0; x < width; x += size)
    drawGridLine(canvas, { x: x * scale, y: startY }, { x: x * scale, y: endY });
}

/**
 * Draw the 'pixels' on the canvas layer by layer
 */
function draw(canvas: HTMLCanvasElement | null, layers: Layer[], scale: number, grid: CanvasGrid, gridSize: number): void {
  if (canvas == null) return;
  const width = layers[0].width;
  const height = layers[0].height;
  canvas.width = width * scale;
  canvas.height = height * scale;
  const ctx = canvas.getContext('2d');
  let color: RGBColor | undefined;
  if (ctx == null) return;
  const ckbgScale = 1.5 * scale;
  const ckbgOffsetX = -1;
  const ckbgOffsetY = -1.5;
  for(let idx = layers.length - 1; idx >= 0; idx--) {
    if (layers[idx].hidden) continue;
    for (let y = 0; y < layers[idx].height; y++) {
      for (let x = 0; x < layers[idx].width; x++) {
        color = layers[idx].pixel(x, y);
        if (!color) return;
        ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},${color.a})`;
        if (idx == layers.length - 1 && layers[idx].id == 'ckbg')
          ctx.fillRect((x + ckbgOffsetX) * ckbgScale, (y + ckbgOffsetY) * ckbgScale, ckbgScale, ckbgScale);
        else
          ctx.fillRect(x * scale, y * scale, scale, scale);
      }
    }
  }
  if (grid != 'none') drawPixelGrid(canvas, width, height, scale, grid == 'pixel' ? 1 : gridSize);
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

function shadePixels(layer: Layer, start: PixelPosition, end: PixelPosition, options?: ToolOptions): PixelPosition[] {
  const pixels: PixelPosition[] = [];
  // TODO!: Optimize for large thickness values
  const points = generatePointsOnLine(
    layer, start, end,
    // *Optimization Idea: reduce numberOfPoints proportional to thickness
    Math.round(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)),
    options
  );
  for (const point of points) {
    const color = layer.pixel(Math.round(point.x), Math.round(point.y));
    if (!color || !color.a) continue;
    pixels.push({ x: Math.round(point.x), y: Math.round(point.y) })
  }
  return pixels;
}

function shadeLayer(layer: Layer, options?: ToolOptions): Layer {
  const newLayer = Layer.empty(layer.id, layer.width, layer.height);
  const toColor: Pixel[] = [];
  const mag = options?.shadingIntensity?.value ?? 10;
  const effect = options?.shadingEffect ?? 'darken';
  const shiftColorComponent = (value: number) => {
    switch(effect) {
      case 'darken':
        return Math.max(value - mag, 0);
      case 'lighten':
        return Math.min(value + mag, 255);
      default:
        return value;
    }
  }
  for (let y = 0; y < layer.height; y++) {
    for (let x = 0; x < layer.width; x++) {
      const color = layer.pixel(x, y);
      if (!color || !color.a) continue;
      toColor.push({
        x, y,
        color: {
          r: shiftColorComponent(color.r),
          g: shiftColorComponent(color.g),
          b: shiftColorComponent(color.b),
          a: color.a,
        },
      });
    }
  }
  return newLayer.colorPixels(toColor);
}

function getImageBoundingBox(layers: Layer[]) {
  let hasContent = false;
  let minX = Number.MAX_SAFE_INTEGER, minY = Number.MAX_SAFE_INTEGER;
  let maxX = Number.MIN_SAFE_INTEGER, maxY = Number.MIN_SAFE_INTEGER;
  for (const layer of layers) {
    for (let y = 0; y < layer.height; y++) {
      for (let x = 0; x < layer.width; x++) {
        const color = layer.pixel(x, y);
        if (!color || color.a === undefined || color.a === 0) continue;
        hasContent = true;
        minX = x < minX ? x : minX;
        minY = y < minY ? y : minY;
        maxX = x > maxX ? x : maxX;
        maxY = y > maxY ? y : maxY;
      }
    }
  }
  return { hasContent, minX, minY, maxX, maxY };
}

function invertLayerColors(layer: Layer): Layer {
  const toColor: Pixel[] = [];
  for (let y = 0; y < layer.height; y++) {
    for (let x = 0; x < layer.width; x++) {
      const color = layer.pixel(x, y);
      if (!color) continue;
      if (color.a === undefined || color.a == 0) continue;
      toColor.push({
        x, y, 
        color: {
          r: 255 - color.r,
          g: 255 - color.g,
          b: 255 - color.b,
          a: color.a
        }
      });
    }
  }
  return layer.colorPixels(toColor);
}

function grayscaleLayerColors(layer: Layer): Layer {
  const toColor: Pixel[] = [];
  for (let y = 0; y < layer.height; y++) {
    for (let x = 0; x < layer.width; x++) {
      const color = layer.pixel(x, y);
      if (!color) continue;
      if (color.a === undefined || color.a == 0) continue;
      toColor.push({
        x, y, 
        color: {
          r: Math.round(0.299 * color.r),
          g: Math.round(0.587 * color.g),
          b: Math.round(0.114 * color.b),
          a: color.a
        }
      });
    }
  }
  return layer.colorPixels(toColor);
}

function outlineLayer(layer: Layer, outlineThickness: number = 1, outlineColor: RGBColor = Layer.BLACK): Layer {
  if (outlineThickness <= 0) return layer;
  const toColor: Pixel[] = [];
  const directions = [];
  for (let i = outlineThickness; i > 0; i--) {
    directions.push(
      { dx: i, dy: 0 }, { dx: -i, dy: 0 },
      { dx: 0, dy: i }, { dx: 0, dy: -i },
    );
  }
  for (let y = 0; y < layer.height; y++) {
    for (let x = 0; x < layer.width; x++) {
      const color = layer.pixel(x, y);
      if (!color || color.a !== 0) continue;
      let addOutline = false;
      for (let { dx, dy } of directions) {
        const adjacentColor = layer.pixel(x + dx, y + dy);
        if (!adjacentColor || adjacentColor.a === undefined || adjacentColor.a == 0) continue;
        addOutline = true;
        break;
      }
      if (addOutline) toColor.push({ x, y, color: outlineColor });
    }
  }
  return layer.colorPixels(toColor);
}

function translatePixels(layer: Layer, offsetX: number, offsetY: number): Layer {
  const emptyLayer = Layer.empty(layer.id, layer.width, layer.height);
  const toColor: Pixel[] = [];
  for (let y = 0; y < layer.height; y++) {
    for (let x = 0; x < layer.width; x++) {
      const color = layer.pixel(x, y);
      if (!color) continue;
      toColor.push({ x: x + offsetX, y: y + offsetY, color });
    }
  }
  return emptyLayer.colorPixels(toColor);
}

function mirrorLayer(layer: Layer, axis: MirrorAxis = 'Y'): Layer {
  const emptyLayer = Layer.empty(layer.id, layer.width, layer.height);
  const toColor: Pixel[] = [];
  for (let y = 0; y < layer.height; y++) {
    for (let x = 0; x < layer.width; x++) {
      const color = layer.pixel(x, y);
      if (!color) continue;
      if (axis == 'Y') {
        toColor.push({
          x: layer.width - 1 - x,
          y, color
        });
      } else {
        toColor.push({
          y: layer.height - 1 - y,
          x, color
        });
      }
    }
  }
  return emptyLayer.colorPixels(toColor);
}

function dropShadowOnLayer(layer: Layer, offsetX: number = 1, offsetY: number = 1, shadowColor: RGBColor = Layer.BLACK): Layer {
  const emptyLayer = Layer.copy(layer.id, layer);
  const toColor: Pixel[] = [];
  const alphaFactor = 0.4;
  for (let y = 0; y < layer.height; y++) {
    for (let x = 0; x < layer.width; x++) {
      const color = layer.pixel(x, y);
      if (!color || !color.a) continue;
      const colorAtOffset = layer.pixel(x + offsetX, y + offsetY);
      if (colorAtOffset && colorAtOffset.a) continue;
      toColor.push({
        x: x + offsetX, 
        y: y + offsetY, 
        color: {
          ...shadowColor,
          a: alphaFactor * color.a,
        },
      });
    }
  }
  return emptyLayer.colorPixels(toColor);
}

function nearestNeighbor(initialWidth: number, initialHeight: number, finalWidth: number, finalHeight: number) {
  const rowRatio = initialWidth / finalWidth;
  const colRatio = initialHeight / finalHeight;
  return {
    rowPositions: new Array(finalWidth).fill(0).map((_, idx) => Math.ceil(idx * rowRatio)),
    colPositions: new Array(finalHeight).fill(0).map((_, idx) => Math.ceil(idx * colRatio)),
  };
}

function scaleLayer(layer: Layer, finalWidth: number, finalHeight: number): Layer {
  const emptyLayer = Layer.empty(layer.id, finalWidth, finalHeight);
  const toColor: Pixel[] = [];
  const { rowPositions, colPositions } = nearestNeighbor(layer.width, layer.height, finalWidth, finalHeight);
  for (let y = 0; y < emptyLayer.height; y++) {
    for (let x = 0; x < emptyLayer.width; x++) {
      const color = layer.pixel(rowPositions[x], colPositions[y]);
      if (!color || !color.a) continue;
      toColor.push({ x, y, color });
    }
  }
  return emptyLayer.colorPixels(toColor);
}

function resizeLayer(layer: Layer, width: number, height: number): Layer {
  const emptyLayer = Layer.empty(layer.id, width, height);
  const toColor: Pixel[] = [];
  for (let y = 0; y < emptyLayer.height; y++) {
    if (layer.height <= y) break;
    for (let x = 0; x < emptyLayer.width; x++) {
      if (layer.width <= x) break;
      const color = layer.pixel(x, y);
      if (!color || !color.a) continue;
      toColor.push({ x, y, color });
    }
  }
  return emptyLayer.colorPixels(toColor);
}

function rotateLayer(layer: Layer, pivot: PixelPosition, angle: number): Layer {
  const emptyLayer = Layer.empty(layer.id, layer.width, layer.height);
  const toColor: Pixel[] = [];
  const theta = -(angle * (Math.PI / 180));
  const cosTheta = Math.cos(theta);
  const sinTheta = Math.sin(theta);
  const deltaX = pivot.x;
  const deltaY = pivot.y;
  for (let y = 0; y < emptyLayer.height; y++) {
    for (let x = 0; x < emptyLayer.width; x++) {
      const x0 = Math.ceil((x - deltaX) * cosTheta - (y - deltaY) * sinTheta) + deltaX;
      const y0 = Math.ceil((y - deltaY) * cosTheta + (x - deltaX) * sinTheta) + deltaY;
      const color = layer.pixel(x0, y0);
      if (!color || !color.a) continue;
      toColor.push({ x, y, color });
    }
  }
  return emptyLayer.colorPixels(toColor);
}

export {
  draw,
  drawLine,
  shadePixels,
  shadeLayer,
  pointerPosition,
  getImageBoundingBox,
  translatePixels,
  grayscaleLayerColors,
  invertLayerColors,
  outlineLayer,
  mirrorLayer,
  dropShadowOnLayer,
  scaleLayer,
  resizeLayer,
  rotateLayer,
};