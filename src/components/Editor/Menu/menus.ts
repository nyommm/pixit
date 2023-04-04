import MirrorImage from './MirrorImage';
import DropShadow from './DropShadow';
import OutlineImage from './OutlineImage';
import { Operations } from '../../../pixit/types';
import ScaleCanvas from './ScaleCanvas';

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
};