import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './tools.css';

import { getTool, changeTool } from '../store/editorSlice';
import tools from '../pixit/tools/tools';

function Tools() {
  const tool = useSelector(getTool);
  const dispatch = useDispatch();
  return (
    <div className="tools-sidebar" >
      {Object.keys(tools)
        .map((t) => (
          <button className="tools-sidebar__tool" key={t} disabled={t == tool} onClick={() => dispatch(changeTool(t))}>
            {(() => {
              // t will always be a key of PixitTools
              // @ts-ignore
              const Icon = tools[t].icon;
              return <Icon />
            })()}
          </button>
        ))}
    </div>
  );
}

export default Tools;