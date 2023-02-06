import React from 'react';

import { tools } from '../pixit/tools';

function Tools({ tool, setTool }: { tool: string, setTool: Function }) {
  return (
    <div>
      {Object.keys(tools)
        .map((t) => (
          <button key={t} disabled={t == tool} onClick={() => setTool(t)}>
            {`${t[0].toUpperCase()}${t.slice(1)}`}
          </button>
        ))}
    </div>
  );
}

export default Tools;