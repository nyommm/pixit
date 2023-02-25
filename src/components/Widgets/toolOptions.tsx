import React from 'react';
import { ToolOptions } from '../../pixit/types';
import './tool-options.css';

function toolOptions(options: ToolOptions | undefined, setOptions: Function) {
  if (options == undefined) return () => null;
  return () => {
    return (
      <div className="widget__item">
        {options.thickness 
          ? (<div className="widget-toolOptions__thickness">
              <label>Stroke: 
                <input type="range" 
                  min={options.thickness.min} 
                  max={options.thickness.max} 
                  step={1} className=""
                  value={options.thickness.value} 
                  onChange={(evt) => setOptions({...options, thickness: { ...options.thickness, value: evt.target.value }})} />
              {options.thickness.value}px</label>
            </div>)
          : null}
        {options.toolShape 
          ? (<div className="widget-toolOptions__shape">
              <label>Box: 
                <input name="tool-shape" 
                  type="radio" 
                  value="square" 
                  checked={options.toolShape == 'square'}
                  onChange={() => setOptions({ ...options, toolShape: 'square' })} />
              </label>
              <label>Circle: 
                <input name="tool-shape" 
                  type="radio" 
                  value="circle" 
                  checked={options.toolShape == 'circle'}
                  onChange={() => setOptions({ ...options, toolShape: 'circle' })} />
              </label>
            </div>)
          : null}
        {options.fill 
          ? (<div className="widget-toolOptions__fill">
              <label>Fill: 
              <input type="checkbox" 
                checked={options.fill} 
                onChange={(evt) => setOptions({ ...options, fill: evt.target.checked })} />
              </label>
            </div>)
          : null}
      </div>
    )
  };
}

export default toolOptions;