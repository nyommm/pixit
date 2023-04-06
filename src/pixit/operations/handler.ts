import Layer from '../Layer';
import { OperationData, OperationResult, Operations } from '../types';
import { invertImageColors, dropShadow, cropImage, resizeCanvas,  
  mirrorImage, centralizeImage, outlineImage, scaleCanvas, rotateImage } from './image';

export const operations = {
  None: () => {},
  invertImageColors,
  cropImage,
  centralizeImage,
  outlineImage,
  mirrorImage,
  dropShadow,
  scaleCanvas,
  resizeCanvas,
  rotateImage,
}

export default function operationHandler(layers: Layer[], operation: keyof Operations, data?: OperationData): OperationResult {
  return operations[operation](layers, data);
}