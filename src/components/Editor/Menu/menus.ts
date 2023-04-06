import MirrorImage from './MirrorImage';
import DropShadow from './DropShadow';
import OutlineImage from './OutlineImage';
import ScaleCanvas from './ScaleCanvas';
import ResizeCanvas from './ResizeCanvas';
import RotateImage from './RotateImage';
import { Operations } from '../../../pixit/types';

export default {
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