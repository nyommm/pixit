import React from 'react';
import './tools.css';

import tools from '../pixit/tools/tools';

function Tools({ tool, setTool }: { tool: string, setTool: Function }) {
  return (
    <div className="tools-sidebar" >
      {Object.keys(tools)
        .map((t) => (
          <button className="tools-sidebar__tool" key={t} disabled={t == tool} onClick={() => setTool(t)}>
            {`${t[0].toUpperCase()}${t.slice(1)}`}
          </button>
        ))}
    </div>
  );
}

export default Tools;