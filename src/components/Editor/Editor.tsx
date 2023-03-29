import React from 'react';
import { useState } from 'react';
import DialogBox from './DialogBox/DialogBox';
import './editor.css';

import Tools from './ToolsSidebar/Tools';
import Topbar from './Topbar/Topbar';
import Viewport from './Viewport/Viewport';

function Editor() {
  const [visible, setVisibility] = useState(true);
  return (
    <div className="editor" >
      <Topbar />
      <Tools />
      <Viewport />
    </div>
  )
}

export default Editor;