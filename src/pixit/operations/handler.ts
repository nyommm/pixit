import Layer from '../Layer';
import { OperationData, Operations } from '../types';
import { invertImageColors, cropImage, centralizeImage, outlineImage } from './image';

export const operations = {
  None: () => {},
  invertImageColors,
  cropImage,
  centralizeImage,
  outlineImage,
}

export default function operationHandler(layers: Layer[], operation: keyof Operations) {
  return operations[operation](layers);
}