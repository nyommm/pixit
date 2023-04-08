import { TbColorPicker } from 'react-icons/tb';
import { BsSlashLg } from 'react-icons/bs';
import { BiPencil, BiRectangle, BiCircle, BiColorFill, BiEraser } from 'react-icons/bi';
import { RxShadowInner } from 'react-icons/rx';
import { PixitTools, ShadingEffect, ToolShape } from '../types';
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
const DEFAULT_SHADING_INTENSITY = 10;
const MIN_SHADING_INTENSITY = 1;
const MAX_SHADING_INTENSITY = 100;
const DEFAULT_SHADING_EFFECT = 'darken' as ShadingEffect;
const DEFAULT_TOOL_SHAPE = 'circle' as ToolShape;

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
      toolShape: DEFAULT_TOOL_SHAPE,
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
      toolShape: DEFAULT_TOOL_SHAPE,
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
      shadingIntensity: {
        value: DEFAULT_SHADING_INTENSITY,
        min: MIN_SHADING_INTENSITY,
        max: MAX_SHADING_INTENSITY,
      },
      shadingEffect: DEFAULT_SHADING_EFFECT,
      toolShape: DEFAULT_TOOL_SHAPE,
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
      toolShape: DEFAULT_TOOL_SHAPE,
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