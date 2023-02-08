import Layer from './Layer';

export interface PixelPosition {
  x: number;
  y: number
};

export interface Pixel extends PixelPosition {
  color: string
};

export type ToolFn = 
  (layer: Layer, pixel: Pixel, dispatch: (layer: Layer) => void) => (pos: PixelPosition) => void;