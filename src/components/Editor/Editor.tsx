import React from 'react';
import './editor.css';

import Tools from './ToolsSidebar/Tools';
import Topbar from './Topbar/Topbar';
import Viewport from './Viewport/Viewport';

function Editor() {
  return (
    <div className="editor" >
      <Topbar />
      <Tools />
      <Viewport />
    </div>
  )
}

export default Editor;