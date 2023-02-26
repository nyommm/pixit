import Layer from './Layer';
import { RGBColor } from 'react-color';

export interface PixelPosition {
  x: number;
  y: number
};

export interface Pixel extends PixelPosition {
  color: RGBColor
};

export type DispatchFn = (state: { layer?: Layer, color?: RGBColor }) => void;

export type ToolFn = (canvas: HTMLCanvasElement, layer: Layer, 
  scale: number, color: RGBColor, dispatch: DispatchFn, options?: ToolOptions) => {
    handleMouseDown: (evt: MouseEvent) => void;
    handleMouseLeave?: (evt: MouseEvent) => void;
    handleMouseEnter?: (evt: MouseEvent) => void;
    removeEventListeners: () => void;
};

export interface ToolThickness {
  value: number;
  min: number;
  max: number;
}

export type ToolShape = 'square' | 'circle';

export interface ToolOptions {
  thickness?: ToolThickness;
  toolShape?: ToolShape;
  fill?: boolean;
}

export interface PixitTool {
  name: string;
  icon: any;
  toolFn: ToolFn;
  options?: ToolOptions;
}

export interface PixitTools {
  pen: PixitTool;
  rectangle: PixitTool;
  ellipse: PixitTool;
  erase: PixitTool;
  fill: PixitTool;
  'color picker': PixitTool;
  line: PixitTool;
};