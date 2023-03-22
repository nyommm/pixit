import { configureStore } from '@reduxjs/toolkit';
import { editorReducer } from './editorSlice';

export default configureStore({
  reducer: {
    editor: editorReducer,
  },
});