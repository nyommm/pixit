import React from 'react';
import { useSelector } from 'react-redux';
import { getDialogBox } from '../../store/editorSlice';
import DialogBox from './DialogBox/DialogBox';
import menus from './Menu/menus';
import './editor.css';

import Tools from './ToolsSidebar/Tools';
import Topbar from './Topbar/Topbar';
import Viewport from './Viewport/Viewport';

function Editor() {
  const dialogBox = useSelector(getDialogBox);
  return (
    <div className="editor" >
      <Topbar />
      <Tools />
      <Viewport />
      {dialogBox != 'None' 
        ? (<DialogBox 
            title={menus[dialogBox].title} 
            menu={menus[dialogBox].component} 
            operation={menus[dialogBox].operation} />) 
        : null}
    </div>
  )
}

export default Editor;