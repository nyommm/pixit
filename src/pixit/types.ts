import Layer from './Layer';
import { RGBColor } from 'react-color';

export interface PixelPosition {
  x: number;
  y: number
};

export interface Pixel extends PixelPosition {
  color: RGBColor
};

export type ToolFn = 
  (layer: Layer, pixel: Pixel, dispatch: (layer: Layer) => void) => (pos: PixelPosition) => void;