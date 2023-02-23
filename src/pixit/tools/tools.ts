import { FaPen, FaCircle, FaEraser, FaFillDrip } from 'react-icons/fa';
import { GiPlainSquare } from 'react-icons/gi';

import { PixitTools } from '../types';
import penToolFn from './pen';
import rectToolFn from './rectangle';
import circleToolFn from './circle';
import eraseToolFn from './erase';
import fillToolFn from './fill';

const tools: PixitTools = {
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
  erase: {
    name: 'erase',
    toolFn: eraseToolFn,
    icon: FaEraser,
  },
  fill: {
    name: 'fill',
    toolFn: fillToolFn,
    icon: FaFillDrip,
  },
};

export default tools;