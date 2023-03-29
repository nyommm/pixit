import { createSlice } from '@reduxjs/toolkit';
import { RGBColor } from 'react-color';
import tools from '../pixit/tools/tools';
import { OperationData, Operations, PixitTools, ToolOptions } from '../pixit/types';

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
    operation: 'None' as keyof Operations,
    operationData: {} as OperationData,
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
    changeOperation: (state, action) => {
      state.operation = action.payload;
    },
    changeOperationData: (state, action) => {
      state.operationData = action.payload;
    }
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
  changeOperation,
  changeOperationData
} = pixitEditorSlice.actions;

export type EditorState = ReturnType<typeof pixitEditorSlice.reducer>

export const getWidth = (state: { editor: EditorState }): number => state.editor.width;
export const getHeight = (state: { editor: EditorState }): number => state.editor.height;
export const getFileName = (state: { editor: EditorState }): string => state.editor.fileName;
export const getActiveLayerIdx = (state: { editor: EditorState }): number => state.editor.activeLayerIdx;
export const getColor = (state: { editor: EditorState }): RGBColor => state.editor.color;
export const getScale = (state: { editor: EditorState }): number => state.editor.scale;
export const getTool = (state: { editor: EditorState }): keyof PixitTools => state.editor.tool;
export const getToolSettings = (state: { editor: EditorState }): ToolOptions | undefined => state.editor.toolSettings;
export const getOperation = (state: { editor: EditorState }): keyof Operations => state.editor.operation;
export const getOperationData = (state: { editor: EditorState }): OperationData => state.editor.operationData;

export const editorReducer = pixitEditorSlice.reducer;