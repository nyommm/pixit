import { TbColorPicker } from 'react-icons/tb';
import { BsSlashLg } from 'react-icons/bs';
import { BiPencil, BiRectangle, BiCircle, BiColorFill, BiEraser } from 'react-icons/bi';
import { RxShadowInner } from 'react-icons/rx';
import { PixitTools } from '../types';
import penToolFn from './drag-tools/pen';
import rectToolFn from './drag-tools/rectangle';
import circleToolFn from './drag-tools/ellipse';
import eraseToolFn from './drag-tools/erase';
import fillToolFn from './click-tools/fill';
import lineToolFn from './drag-tools/line';
import colorPickerToolFn from './click-tools/colorPicker';
import shadingToolFn from './drag-tools/shade';

const MIN_STROKE_THICKNESS = 1;
const MAX_STROKE_THICKNESS = 64;

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
    options: {
      thickness: {
        value: MIN_STROKE_THICKNESS,
        min: MIN_STROKE_THICKNESS,
        max: MAX_STROKE_THICKNESS,
      },
      toolShape: 'circle',
    }
  },
  pen: {
    name: 'pen',
    toolFn: penToolFn,
    icon: BiPencil,
    options: {
      thickness: {
        value: MIN_STROKE_THICKNESS,
        min: MIN_STROKE_THICKNESS,
        max: MAX_STROKE_THICKNESS,
      },
      toolShape: 'circle',
    }
  },
  shade: {
    name: 'shading tool',
    toolFn: shadingToolFn,
    icon: RxShadowInner,
    options: {
      thickness: {
        value: MIN_STROKE_THICKNESS,
        min: MIN_STROKE_THICKNESS,
        max: MAX_STROKE_THICKNESS,
      },
      toolShape: 'circle',
    },
  },
  line: {
    name: 'line',
    toolFn: lineToolFn,
    icon: BsSlashLg,
    options: {
      thickness: {
        value: MIN_STROKE_THICKNESS,
        min: MIN_STROKE_THICKNESS,
        max: MAX_STROKE_THICKNESS,
      },
      toolShape: 'circle',
    }
  },
  rectangle: {
    name: 'rectangle',
    toolFn: rectToolFn,
    icon: BiRectangle,
    options: {
      thickness: {
        value: MIN_STROKE_THICKNESS,
        min: MIN_STROKE_THICKNESS,
        max: MAX_STROKE_THICKNESS,
      },
      fill: true,
    },
  },
  ellipse: {
    name: 'ellipse',
    toolFn: circleToolFn,
    icon: BiCircle,
    options: {
      thickness: {
        value: MIN_STROKE_THICKNESS,
        min: MIN_STROKE_THICKNESS,
        max: MAX_STROKE_THICKNESS,
      },
      fill: true,
    },
  },
};

export default tools;