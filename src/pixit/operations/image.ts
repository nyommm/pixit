import Layer from '../Layer';
import { OperationData, OperationResult, Pixel } from '../types';
import { dropShadowOnLayer, getImageBoundingBox, invertLayerColors, rotateLayer,  
  mirrorLayer, outlineLayer, translatePixels, scaleLayer, resizeLayer } from '../utils';

export function invertImageColors(layers: Layer[]): OperationResult {
  const newLayers: Layer[] = [];
  for (const layer of layers)
    newLayers.push(invertLayerColors(layer));
  return { layers: newLayers };
}

export function centralizeImage(layers: Layer[]): OperationResult {
  if (layers.length == 0) return { layers };
  const centerX = Math.round(layers[0].width / 2);
  const centerY = Math.round(layers[0].height / 2);
  const { hasContent, minX, minY, maxX, maxY } = getImageBoundingBox(layers);
  if (!hasContent) return { layers };
  const rectCenterX = Math.round((maxX - minX) / 2) + minX;
  const rectCenterY = Math.round((maxY - minY) / 2) + minY;
  const offsetX =  centerX - rectCenterX;
  const offsetY =  centerY - rectCenterY;
  const newLayers: Layer[] = [];
  for (const layer of layers)
    newLayers.push(translatePixels(layer, offsetX, offsetY));
  return { layers: newLayers };
}

export function cropImage(layers: Layer[]): OperationResult {
  if (layers.length == 0) return { layers };
  const { hasContent, minX, minY, maxX, maxY } = getImageBoundingBox(layers);
  if (!hasContent) return { layers };
  const newLayers: Layer[] = [];
  for (const layer of layers) {
    const emptyLayer = Layer.empty(layer.id, maxX - minX + 1, maxY - minY + 1);
    const toColor: Pixel[] = [];
    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        const color = layer.pixel(x, y) ?? { r: 0, g: 0, b: 0, a: 0 };
        toColor.push({ x: x - minX, y: y - minY, color });
      }
    }
    newLayers.push(emptyLayer.colorPixels(toColor));
  }
  return { layers: newLayers };
}

export function outlineImage(layers: Layer[], data?: OperationData): OperationResult {
  const newLayers: Layer[] = [];
  for (const layer of layers)
    newLayers.push(outlineLayer(layer, data?.outlineThickness, data?.outlineColor));
  return { layers: newLayers };
}

export function mirrorImage(layers: Layer[], data?: OperationData): OperationResult {
  const newLayers: Layer[] = [];
  for (const layer of layers)
    newLayers.push(mirrorLayer(layer, data?.mirrorAxis));
  return { layers: newLayers };
}

export function dropShadow(layers: Layer[], data?: OperationData): OperationResult {
  const newLayers: Layer[] = [];
  for (const layer of layers)
    newLayers.push(dropShadowOnLayer(layer, data?.offsetX, data?.offsetY, data?.shadowColor));
  return { layers: newLayers };
}

export function scaleCanvas(layers: Layer[], data?: OperationData): OperationResult {
  if (!data?.canvasHeight || !data?.canvasWidth) return { layers };
  const newLayers: Layer[] = [];
  for (const layer of layers)
    newLayers.push(scaleLayer(layer, data.canvasWidth, data.canvasHeight));
  return { layers: newLayers };
}

export function resizeCanvas(layers: Layer[], data?: OperationData): OperationResult {
  if (!data?.canvasHeight || !data?.canvasWidth) return { layers };
  const newLayers: Layer[] = [];
  for (const layer of layers)
    newLayers.push(resizeLayer(layer, data.canvasWidth, data.canvasHeight));
  return { layers: newLayers };
}

export function rotateImage(layers: Layer[], data?: OperationData): OperationResult {
  if (!data?.angle || !data?.pivot) return { layers };
  const newLayers: Layer[] = [];
  for (const layer of layers)
    newLayers.push(rotateLayer(layer, data.pivot, data.angle));
  return { layers: newLayers };
}