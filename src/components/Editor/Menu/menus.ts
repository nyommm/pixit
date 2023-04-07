import MirrorImage from './Image/MirrorImage';
import DropShadow from './Image/DropShadow';
import OutlineImage from './Image/OutlineImage';
import ScaleCanvas from './Image/ScaleCanvas';
import ResizeCanvas from './Image/ResizeCanvas';
import RotateImage from './Image/RotateImage';
import ExportImage from './File/ExportImage';
import { Operations } from '../../../pixit/types';

export default {
  export: {
    title: 'Export',
    operation: 'exportImage' as keyof Operations,
    component: ExportImage,
  },
  mirrorImage: {
    title: 'Mirror Image',
    operation: 'mirrorImage' as keyof Operations,
    component: MirrorImage,
  },
  outlineImage: {
    title: 'Outline Image',
    operation: 'outlineImage' as keyof Operations,
    component: OutlineImage,
  },
  dropShadow: {
    title: 'Drop Shadow',
    operation: 'dropShadow' as keyof Operations,
    component: DropShadow,
  },
  scaleCanvas: {
    title: 'Scale Canvas',
    operation: 'scaleCanvas' as keyof Operations,
    component: ScaleCanvas,
  },
  resizeCanvas: {
    title: 'Resize Canvas',
    operation: 'resizeCanvas' as keyof Operations,
    component: ResizeCanvas,
  },
  rotateImage: {
    title: 'Rotate Image',
    operation: 'rotateImage' as keyof Operations,
    component: RotateImage,
  },
};