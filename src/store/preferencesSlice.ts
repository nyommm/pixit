import { createSlice } from '@reduxjs/toolkit';
import { RGBColor } from 'react-color';
import { CanvasGrid, CanvasBackground } from '../pixit/types';

// ***** DEFAULTS *****
const DEFAULT_GRID_SIZE = 4;
const WHITE: RGBColor = { r: 255, g: 255, b: 255, a: 1 };

export const preferencesSlice = createSlice({
  name: 'preferences',
  initialState: {
    grid: 'none' as CanvasGrid,
    gridSize: DEFAULT_GRID_SIZE,
    background: 'checkboard' as CanvasBackground,
    backgroundColor: WHITE,
  },
  reducers: {
    changeGrid: (state, action) => {
      state.grid = action.payload;
    },
    changeGridSize: (state, action) => {
      state.gridSize = action.payload;
    },
    changeBackground: (state, action) => {
      state.background = action.payload;
    },
    changeBackgroundColor: (state, action) => {
      state.backgroundColor = action.payload;
    },
  },
});

export const {
  changeBackground,
  changeBackgroundColor,
  changeGrid,
  changeGridSize,
} = preferencesSlice.actions;

export type PreferencesState = ReturnType<typeof preferencesSlice.reducer>

export const getGrid = (state: { preferences: PreferencesState }): CanvasGrid => state.preferences.grid;
export const getGridSize = (state: { preferences: PreferencesState }): number => state.preferences.gridSize;
export const getBackground = (state: { preferences: PreferencesState }): CanvasBackground => state.preferences.background;
export const getBackgroundColor = (state: { preferences: PreferencesState }): RGBColor => state.preferences.backgroundColor;

export const preferencesReducer = preferencesSlice.reducer;