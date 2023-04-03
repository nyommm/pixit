import MirrorImage from './MirrorImage';
import DropShadow from './DropShadow';
import OutlineImage from './OutlineImage';
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
    title: 'DropShadow',
    operation: 'dropShadow' as keyof Operations,
    component: DropShadow,
  },
};