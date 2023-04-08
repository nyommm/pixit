import { configureStore } from '@reduxjs/toolkit';
import { editorReducer } from './editorSlice';

const store = configureStore({
  reducer: {
    editor: editorReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  const stateToPersist = {
    editorState: {
      fileName: state.editor.fileName,
      width: state.editor.width,
      height: state.editor.height,
      activeLayerIdx: state.editor.activeLayerIdx,
      color: state.editor.color,
      tool: state.editor.tool,
      scale: state.editor.scale,
      toolSettings: state.editor.toolSettings,
    },
  };
  localStorage.setItem('reduxState', JSON.stringify(stateToPersist));
});

export default store;