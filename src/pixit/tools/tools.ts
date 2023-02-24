import { FaPen, FaCircle, FaEraser, FaFillDrip, FaEyeDropper } from 'react-icons/fa';
import { GiPlainSquare } from 'react-icons/gi';
import { BsSlashLg } from 'react-icons/bs';

import { PixitTools } from '../types';
import penToolFn from './drag-tools/pen';
import rectToolFn from './drag-tools/rectangle';
import circleToolFn from './drag-tools/circle';
import eraseToolFn from './drag-tools/erase';
import fillToolFn from './click-tools/fill';
import lineToolFn from './drag-tools/line';
import colorPickerToolFn from './click-tools/colorPicker';

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
  line: {
    name: 'line',
    toolFn: lineToolFn,
    icon: BsSlashLg,
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