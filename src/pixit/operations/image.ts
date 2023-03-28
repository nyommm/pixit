import Layer from '../Layer';
import { invertLayerColors, outlineLayer, translatePixels } from '../utils';

export function invertColors(layers: Layer[]): Layer[] {
  const newLayers: Layer[] = [];
  for (const layer of layers)
    newLayers.push(invertLayerColors(layer));
  return newLayers;
}

export function centralizeImage(layers: Layer[]): Layer[] {
  if (layers.length == 0) return layers;
  const centerX = Math.round(layers[0].width / 2);
  const centerY = Math.round(layers[0].height / 2);
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
        minX = y < minY ? y : minY;
        maxX = x > maxX ? x : maxX;
        maxX = y > maxY ? y : maxY;
      }
    }
  }
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

export function outlineImage(layers: Layer[]): Layer[] {
  const newLayers: Layer[] = [];
  for (const layer of layers)
    newLayers.push(outlineLayer(layer));
  return newLayers;
}