import { FaPen, FaCircle, FaEraser, FaFillDrip, FaEyeDropper } from 'react-icons/fa';
import { GiPlainSquare } from 'react-icons/gi';

import { PixitTools } from '../types';
import penToolFn from './pen';
import rectToolFn from './rectangle';
import circleToolFn from './circle';
import eraseToolFn from './erase';
import fillToolFn from './fill';
import colorPickerToolFn from './colorPicker';

const tools: PixitTools = {
  'color picker': {
    name: 'color picker',
    toolFn: colorPickerToolFn,
    icon: FaEyeDropper,
  },
  fill: {
    name: 'fill',
    toolFn: fillToolFn,
    icon: FaFillDrip,
  },
  erase: {
    name: 'erase',
    toolFn: eraseToolFn,
    icon: FaEraser,
  },
  pen: {
    name: 'pen',
    toolFn: penToolFn,
    icon: FaPen,
  },
  rectangle: {
    name: 'rectangle',
    toolFn: rectToolFn,
    icon: GiPlainSquare,
  },
  circle: {
    name: 'circle',
    toolFn: circleToolFn,
    icon: FaCircle,
  },
};

export default tools;