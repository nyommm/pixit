import Layer from "../Layer";
import { OperationData, OperationResult } from "../types";

export function undoRedoChange(layers: Layer[], data?: OperationData): OperationResult {
  if (!data?.changeData) return { layers };
  const newLayers: Layer[] = [];
  for (const layerData of data.changeData.layers) {
    const newLayer = new Layer(layerData.id, layerData.width, layerData.height, layerData.pixels);
    newLayer.hidden = layerData.hidden;
    newLayer.locked = layerData.locked;
    newLayers.push(newLayer);
  }
  return {
    activeLayerIdx: data.changeData.activeLayerIdx,
    layers: newLayers,
  };
}