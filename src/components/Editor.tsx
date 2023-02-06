import React from 'react';
import { useState } from 'react';

import Tools from './Tools';
import Viewport from './Viewport';

const DEFAULT_TOOL = 'pen';

function Editor() {
  const [tool, setTool] = useState(DEFAULT_TOOL);
  return (
    <>
      <Tools tool={tool} setTool={setTool} />
      <Viewport tool={tool} />
    </>
  )
}

export default Editor;