import Layer from '../Layer';
import { OperationData, Operations } from '../types';
import { invertImageColors, dropShadow, cropImage, 
  mirrorImage, centralizeImage, outlineImage, scaleCanvas } from './image';

export const operations = {
  None: () => {},
  invertImageColors,
  cropImage,
  centralizeImage,
  outlineImage,
  mirrorImage,
  dropShadow,
  scaleCanvas,
}

export default function operationHandler(layers: Layer[], operation: keyof Operations, data?: OperationData) {
  return operations[operation](layers, data);
}