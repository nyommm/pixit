import { createSlice } from '@reduxjs/toolkit';
import { RGBColor } from 'react-color';
import Layer from '../pixit/Layer';
import tools from '../pixit/tools/tools';
import { OperationData, Operations, PixitTools, ToolOptions, 
  DialogBox, ChangeData, PixelPosition } from '../pixit/types';

// ***** DEFAULTS *****
const DEFAULT_SCALE = 10;
const DEFAULT_FILENAME = 'untitled';
const DEFAULT_CANVAS_SIZE = 64; // side length in number of pixels
const DEFAULT_TOOL: keyof PixitTools = 'pen';
const DEFAULT_POINTER_POSITION: PixelPosition = { x: 0, y: 0 };
const DEFAULT_OPERATION_DATA: OperationData = {
  canvasWidth: DEFAULT_CANVAS_SIZE,
  canvasHeight: DEFAULT_CANVAS_SIZE,
  mirrorAxis: 'Y',
  outlineThickness: 1,
  outlineColor: Layer.BLACK,
  shadowColor: Layer.BLACK,
  offsetX: 5,
  offsetY: 5,
  angle: 0,
  pivot: { x: 0, y: 0 },
};

export const pixitEditorSlice = createSlice({
  name: 'editor',
  initialState: {
    fileName: DEFAULT_FILENAME,
    width: DEFAULT_CANVAS_SIZE,
    height: DEFAULT_CANVAS_SIZE,
    color: Layer.BLACK,
    scale: DEFAULT_SCALE,
    tool: DEFAULT_TOOL,
    activeLayerIdx: 0,
    toolSettings: tools[DEFAULT_TOOL].options,
    operation: 'None' as keyof Operations,
    operationData: DEFAULT_OPERATION_DATA,
    dialogBox: 'None' as DialogBox,
    undoStack: [] as ChangeData[],
    redoStack: [] as ChangeData[],
    pointerPosition: DEFAULT_POINTER_POSITION,
  },
  reducers: {
    changeFileName: (state, action) => {
      state.fileName = action.payload;
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
      state.operationData = {
        ...state.operationData,
        ...action.payload,
      };
    },
    changeDialogBox: (state, action) => {
      state.dialogBox = action.payload;
    },
    changeUndoStack: (state, action) => {
      const stackSize = 12;
      if (state.undoStack.length == stackSize) 
        state.undoStack = state.undoStack.slice(1);
      state.undoStack = [...state.undoStack, action.payload];
    },
    changeRedoStack: (state, action) => {
      const stackSize = 12;
      if (state.redoStack.length == stackSize) 
        state.redoStack = state.redoStack.slice(1);
      state.redoStack = [...state.redoStack, action.payload];
    },
    undo: (state) => {
      if (state.undoStack.length >= 1) state.undoStack = state.undoStack.slice(0, -1);
    },
    redo: (state) => {
      if (state.redoStack.length > 0) state.redoStack = state.redoStack.slice(0, -1);
    },
    changePointerPosition: (state, action) => {
      state.pointerPosition = action.payload;
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
  changeOperation,
  changeOperationData,
  changeDialogBox,
  changeUndoStack,
  changeRedoStack,
  undo, redo,
  changePointerPosition
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
export const getDialogBox = (state: { editor: EditorState }): DialogBox => state.editor.dialogBox;
export const getUndoStack = (state: { editor: EditorState }): ChangeData[] => state.editor.undoStack;
export const getRedoStack = (state: { editor: EditorState }): ChangeData[] => state.editor.redoStack;
export const getPointerPosition = (state: { editor: EditorState }): PixelPosition => state.editor.pointerPosition;

export const editorReducer = pixitEditorSlice.reducer;