import Layer from './Layer';
import { RGBColor } from 'react-color';

export interface PixelPosition {
  x: number;
  y: number
};

export interface Pixel extends PixelPosition {
  color: RGBColor
};

export type ToolFn = (canvas: HTMLCanvasElement, layer: Layer, 
  scale: number, color: RGBColor, dispatch: (layer: Layer) => void) => {
    handleMouseDown: (evt: MouseEvent) => void;
    handleMouseLeave?: (evt: MouseEvent) => void;
    handleMouseEnter?: (evt: MouseEvent) => void;
    removeEventListeners: () => void;
};

export interface PixitTools {
  pen: ToolFn;
  rectangle: ToolFn;
  circle: ToolFn;
  erase: ToolFn;
  fill: ToolFn;
};