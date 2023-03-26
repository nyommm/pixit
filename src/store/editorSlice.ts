import { createSlice } from '@reduxjs/toolkit';
import { RGBColor } from 'react-color';
import Layer from '../pixit/Layer';
import tools from '../pixit/tools/tools';
import { PixitTools, ToolOptions } from '../pixit/types';


// ***** DEFAULTS *****
const BLACK: RGBColor = { r: 0, g: 0, b: 0, a: 255 };
const DEFAULT_SCALE = 10;
const DEFAULT_FILENAME = 'untitled';
const DEFAULT_CANVAS_SIZE = 64; // side length in number of pixels
const DEFAULT_TOOL: keyof PixitTools = 'pen';

export const pixitEditorSlice = createSlice({
  name: 'editor',
  initialState: {
    fileName: DEFAULT_FILENAME,
    width: DEFAULT_CANVAS_SIZE,
    height: DEFAULT_CANVAS_SIZE,
    color: BLACK,
    scale: DEFAULT_SCALE,
    tool: DEFAULT_TOOL,
    activeLayerIdx: 0,
    toolSettings: tools[DEFAULT_TOOL].options,
  },
  reducers: {
    changeFileName: (state, action) => {
      state.width = action.payload;
    },
    changeWidth: (state, action) => {
      state.width = action.payload;
    },
    changeHeight: (state, action) => {
      state.height = action.payload;
    },
    changeActiveLayerIdx: (state, action) => {
      state.activeLayerIdx = action.payload;
    },
    changeTool: (state, action) => {
      state.tool = action.payload;
      // @ts-ignore
      state.toolSettings = tools[action.payload].options;
    },
    changeToolSettings: (state, action) => {
      state.toolSettings = action.payload;
    },
    changeColor: (state, action) => {
      state.color = action.payload;
    },
    changeScale: (state, action) => {
      state.scale = action.payload;
    },
  },
});

export const {
  changeFileName,
  changeWidth,
  changeHeight,
  changeActiveLayerIdx,
  changeTool,
  changeToolSettings,
  changeColor,
  changeScale,
} = pixitEditorSlice.actions;

export const getWidth = (state): number => state.editor.width;
export const getHeight = (state): number => state.editor.height;
export const getFileName = (state): number => state.editor.fileName;
export const getActiveLayerIdx = (state): number => state.editor.activeLayerIdx;
export const getColor = (state): RGBColor => state.editor.color;
export const getScale = (state): number => state.editor.scale;
export const getTool = (state): keyof PixitTools => state.editor.tool;
export const getToolSettings = (state): ToolOptions => state.editor.toolSettings;

export const editorReducer = pixitEditorSlice.reducer;