import React from 'react';
import { ToolOptions } from '../../pixit/types';

function toolOptions(options: ToolOptions | undefined, setOptions: Function) {
  if (options == undefined) return () => null;
  return () => {
    return (
      <div className="widget__item">
        {options.thickness 
          ? (<>
              <input type="range" 
                min={options.thickness.min} 
                max={options.thickness.max} 
                step={1}
                value={options.thickness.value} 
                onChange={(evt) => setOptions({...options, thickness: { ...options.thickness, value: evt.target.value }})} />
              <span>{options.thickness.value}px</span>
            </>)
          : null}
        {options.toolShape 
          ? (<>
              <label>Box
                <input name="tool-shape" 
                  type="radio" 
                  value='square' 
                  onChange={() => setOptions({ ...options, toolShape: 'square' })} />
              </label>
              <label>Circle
                <input name="tool-shape" 
                  type="radio" 
                  value='circle' 
                  onChange={() => setOptions({ ...options, toolShape: 'circle' })} />
              </label>
            </>)
          : null}
        {options.fill 
          ? <input type="checkbox" 
            checked={options.fill} 
            onChange={(evt) => setOptions({ ...options, fill: evt.target.checked })} />
          : null}
      </div>
    )
  };
}

export default toolOptions;