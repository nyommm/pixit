import React from 'react';
import { useState } from 'react';
import { PixitTools } from '../pixit/types';
import './editor.css';

import Tools from './Tools';
import Topbar from './Topbar';
import Viewport from './Viewport';

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