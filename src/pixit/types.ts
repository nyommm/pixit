import Layer from './Layer';
import { RGBColor } from 'react-color';

export interface PixelPosition {
  x: number;
  y: number
};

export interface Pixel extends PixelPosition {
  color: RGBColor
};

export type CanvasGrid = 'none' | 'pixel' | 'grid';

export type CanvasBackground = 'none' | 'solid' | 'checkboard';

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

export interface ShadingIntensity {
  value: number;
  min: number;
  max: number;
}

export type ToolShape = 'square' | 'circle';

export type ShadingEffect = 'lighten' | 'darken';

export interface ToolOptions {
  thickness?: ToolThickness;
  toolShape?: ToolShape;
  fill?: boolean;
  shadingEffect?: ShadingEffect;
  shadingIntensity?: ShadingIntensity;
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
  shade: PixitTool;
};

export interface LayerData {
  id: string;
  width: number;
  height: number;
  hidden: boolean;
  locked: boolean;
  pixels: RGBColor[];
};

export interface ChangeData {
  activeLayerIdx: number;
  layers: LayerData[];
};

export interface TopbarMenuBtn {
  name: string;
  onClick?: (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export type MirrorAxis = 'X' | 'Y';

export interface OperationResult {
  activeLayerIdx?: number;
  layers?: Layer[];
};

export interface OperationData {
  canvasWidth?: number;
  canvasHeight?: number;
  mirrorAxis?: MirrorAxis;
  outlineThickness?: number;
  outlineColor?: RGBColor;
  shadowColor?: RGBColor;
  offsetX?: number;
  offsetY?: number;
  angle?: number;
  pivot?: PixelPosition;
  changeData?: ChangeData;
};

export type ImageOperation = ((layers: Layer[], data?: OperationData) => OperationResult);

export interface Operations {
  None: () => OperationResult;
  invertImageColors: ImageOperation;
  centralizeImage: ImageOperation;
  cropImage: ImageOperation;
  outlineImage: ImageOperation;
  mirrorImage: ImageOperation;
  dropShadow: ImageOperation;
  scaleCanvas: ImageOperation;
  resizeCanvas: ImageOperation;
  rotateImage: ImageOperation;
  undoChange: ImageOperation;
  redoChange: ImageOperation;
  switchGrid: () => OperationResult;
  switchBackground: () => OperationResult;
  exportImage: () => OperationResult;
};

export type DialogBox = 
  'None' 
  | 'mirrorImage' 
  | 'outlineImage' 
  | 'dropShadow' 
  | 'scaleCanvas' 
  | 'resizeCanvas' 
  | 'rotateImage'
  | 'exportImage';