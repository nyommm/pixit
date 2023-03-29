import Layer from '../Layer';
import { Pixel } from '../types';
import { getImageBoundingBox, invertLayerColors, 
  mirrorLayer, outlineLayer, translatePixels } from '../utils';

export function invertImageColors(layers: Layer[]): Layer[] {
  const newLayers: Layer[] = [];
  for (const layer of layers)
    newLayers.push(invertLayerColors(layer));
  return newLayers;
}

export function centralizeImage(layers: Layer[]): Layer[] {
  if (layers.length == 0) return layers;
  const centerX = Math.round(layers[0].width / 2);
  const centerY = Math.round(layers[0].height / 2);
  const { hasContent, minX, minY, maxX, maxY } = getImageBoundingBox(layers);
  if (!hasContent) return layers;
  const rectCenterX = Math.round((maxX - minX) / 2);
  const rectCenterY = Math.round((maxY - minY) / 2);
  const offsetX = rectCenterX - centerX;
  const offsetY = rectCenterY - centerY;
  const newLayers: Layer[] = [];
  for (const layer of layers)
    newLayers.push(translatePixels(layer, offsetX, offsetY));
  return newLayers;
}

export function cropImage(layers: Layer[]): Layer[] {
  if (layers.length == 0) return layers;
  const { hasContent, minX, minY, maxX, maxY } = getImageBoundingBox(layers);
  if (!hasContent) return layers;
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
  return newLayers;
}

export function outlineImage(layers: Layer[]): Layer[] {
  const newLayers: Layer[] = [];
  for (const layer of layers)
    newLayers.push(outlineLayer(layer));
  return newLayers;
}

export function mirrorImage(layers: Layer[]): Layer[] {
  const newLayers: Layer[] = [];
  for (const layer of layers)
    newLayers.push(mirrorLayer(layer));
  return newLayers;
}