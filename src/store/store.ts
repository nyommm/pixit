import { configureStore } from '@reduxjs/toolkit/dist/configureStore';
import { pixitEditorReducer } from './pixitSlice';

export default configureStore({
  reducer: {
    editor: pixitEditorReducer,
  },
});