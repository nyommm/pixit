import { TbColorPicker } from 'react-icons/tb';
import { BsSlashLg } from 'react-icons/bs';
import { BiPencil, BiRectangle, BiCircle, BiColorFill, BiEraser } from 'react-icons/bi';
import { PixitTools } from '../types';
import penToolFn from './drag-tools/pen';
import rectToolFn from './drag-tools/rectangle';
import circleToolFn from './drag-tools/ellipse';
import eraseToolFn from './drag-tools/erase';
import fillToolFn from './click-tools/fill';
import lineToolFn from './drag-tools/line';
import colorPickerToolFn from './click-tools/colorPicker';

// Pixit tools with callbacks, metadata and options
const tools: PixitTools = {
  'color picker': {
    name: 'color picker',
    toolFn: colorPickerToolFn,
    icon: TbColorPicker,
  },
  fill: {
    name: 'fill',
    toolFn: fillToolFn,
    icon: BiColorFill,
  },
  erase: {
    name: 'erase',
    toolFn: eraseToolFn,
    icon: BiEraser,
  },
  pen: {
    name: 'pen',
    toolFn: penToolFn,
    icon: BiPencil,
    options: {
      thickness: {
        value: 1,
        min: 1,
        max: 64,
      },
      toolShape: 'circle',
    }
  },
  line: {
    name: 'line',
    toolFn: lineToolFn,
    icon: BsSlashLg,
  },
  rectangle: {
    name: 'rectangle',
    toolFn: rectToolFn,
    icon: BiRectangle,
  },
  ellipse: {
    name: 'ellipse',
    toolFn: circleToolFn,
    icon: BiCircle,
  },
};

export default tools;