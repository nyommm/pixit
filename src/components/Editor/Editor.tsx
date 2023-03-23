import React from 'react';
import { useState } from 'react';
import { PixitTools } from '../../pixit/types';
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