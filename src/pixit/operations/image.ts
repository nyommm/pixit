import Layer from '../Layer';
import { getImageBoundingBox, invertLayerColors, outlineLayer, translatePixels } from '../utils';

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

export function outlineImage(layers: Layer[]): Layer[] {
  const newLayers: Layer[] = [];
  for (const layer of layers)
    newLayers.push(outlineLayer(layer));
  return newLayers;
}