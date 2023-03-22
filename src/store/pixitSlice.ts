import { createSlice } from '@reduxjs/toolkit';
import { RGBColor } from 'react-color';
import Layer from '../pixit/Layer';
import tools from '../pixit/tools/tools';
import { PixitTools } from '../pixit/types';


// ***** DEFAULTS *****
const BLACK: RGBColor = { r: 0, g: 0, b: 0, a: 255 };
const DEFAULT_SCALE = 10;
const MIN_SCALE = DEFAULT_SCALE / 2;
const MAX_SCALE = DEFAULT_SCALE * 2;
const BASE_LAYER = Layer.empty('Layer 0', 64, 64);
const MAX_LAYER_COUNT = 64;
const DEFAULT_TOOL: keyof PixitTools = 'pen';

export const pixitEditorSlice = createSlice({
  name: 'pixitEditor',
  initialState: {
    color: BLACK,
    scale: DEFAULT_SCALE,
    tool: DEFAULT_TOOL,
    activeLayerIdx: 0,
    layers: [BASE_LAYER],
    toolSettings: tools[DEFAULT_TOOL].options,
  },
  reducers: {
    updateActiveLayer: (state, action) => {
      state.layers[state.activeLayerIdx] = action.payload;
    },
    changeActiveLayer: (state, action) => {
      if (action.payload < 0 || action.payload >= state.layers.length) return;
      state.activeLayerIdx = action.payload;
    },
    insertLayer: (state, action) => {
      if (state.layers.length >= MAX_LAYER_COUNT) return;
      state.layers = [
        ...(state.activeLayerIdx == 0 ? [] : state.layers.slice(0, state.activeLayerIdx)),
        action.payload,
        ...state.layers.slice(state.activeLayerIdx),
      ];
    },
    changeTool: (state, action) => {
      state.tool = action.payload;
      // @ts-ignore
      state.toolSettings = tools[action.payload].options;
    },
    changeColor: (state, action) => {
      state.color = action.payload;
    },
    changeScale: (state, action) => {
      if (MIN_SCALE > action.payload) return;
      if (MAX_SCALE < action.payload) return;
      state.scale = action.payload;
    },
  },
});

export const pixitEditorActions = pixitEditorSlice.actions;

export const getActiveLayerIdx = (state) => state.pixitEditor.activeLayerIdx;
export const getActiveLayer = (state) => state.pixitEditor.layers[state.pixitEditor.activeLayerIdx];
export const getLayers = (state) => state.pixitEditor.layers;
export const getColor = (state) => state.pixitEditor.color;
export const getScale = (state) => state.pixitEditor.scale;
export const getTool = (state) => state.pixitEditor.tool;
export const getToolSettings = (state) => state.pixitEditor.toolSettings;

export const pixitEditorReducer = pixitEditorSlice.reducer;