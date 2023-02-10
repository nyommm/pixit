import React from 'react';
import { useState } from 'react';
import './editor.css';

import Tools from './Tools';
import Viewport from './Viewport';

const DEFAULT_TOOL = 'pen';

function Editor() {
  const [tool, setTool] = useState(DEFAULT_TOOL);
  return (
    <div className="editor" >
      <Tools tool={tool} setTool={setTool} />
      <Viewport tool={tool} />
    </div>
  )
}

export default Editor;