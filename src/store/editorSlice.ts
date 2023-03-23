import { createSlice } from '@reduxjs/toolkit';
import { RGBColor } from 'react-color';
import Layer from '../pixit/Layer';
import tools from '../pixit/tools/tools';
import { PixitTools, ToolOptions } from '../pixit/types';


// ***** DEFAULTS *****
const BLACK: RGBColor = { r: 0, g: 0, b: 0, a: 255 };
const DEFAULT_SCALE = 10;
const MIN_SCALE = DEFAULT_SCALE / 2;
const MAX_SCALE = DEFAULT_SCALE * 2;
const MAX_LAYER_COUNT = 64;
const DEFAULT_TOOL: keyof PixitTools = 'pen';

export const pixitEditorSlice = createSlice({
  name: 'editor',
  initialState: {
    color: BLACK,
    scale: DEFAULT_SCALE,
    tool: DEFAULT_TOOL,
    activeLayerIdx: 0,
    toolSettings: tools[DEFAULT_TOOL].options,
  },
  reducers: {
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
  changeActiveLayerIdx,
  changeTool,
  changeToolSettings,
  changeColor,
  changeScale,
} = pixitEditorSlice.actions;

export const getActiveLayerIdx = (state): number => state.editor.activeLayerIdx;
export const getColor = (state): RGBColor => state.editor.color;
export const getScale = (state): number => state.editor.scale;
export const getTool = (state): keyof PixitTools => state.editor.tool;
export const getToolSettings = (state): ToolOptions => state.editor.toolSettings;

export const editorReducer = pixitEditorSlice.reducer;