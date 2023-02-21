import { PixitTools } from '../types';
import pen from './pen';
import rectangle from './rectangle';
import circle from './circle';
import erase from './erase';
import fill from './fill';

const tools: PixitTools = {
  pen,
  rectangle,
  circle,
  erase,
  fill,
};

export default tools;