import Layer from '../Layer';
import { OperationData, OperationResult, Operations } from '../types';
import { invertImageColors, dropShadow, cropImage, resizeCanvas,  
  mirrorImage, centralizeImage, outlineImage, scaleCanvas, rotateImage } from './image';
import { undoRedoChange } from './edit';
import { exportImage } from './file';
import { switchGrid, switchBackground } from './view';

export const operations = {
  None: () => { return {} as OperationResult; },
  invertImageColors,
  cropImage,
  centralizeImage,
  outlineImage,
  mirrorImage,
  dropShadow,
  scaleCanvas,
  resizeCanvas,
  rotateImage,
  undoChange: undoRedoChange,
  redoChange: undoRedoChange,
  switchGrid,
  switchBackground,
  exportImage,
};

export default function operationHandler(layers: Layer[], operation: keyof Operations, data?: OperationData): OperationResult {
  return operations[operation](layers, data);
}