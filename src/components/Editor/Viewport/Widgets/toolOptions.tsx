import React from 'react';
import { ToolOptions } from '../../../../pixit/types';
import './tool-options.css';

function toolOptions(options: ToolOptions | undefined, setOptions: (options: ToolOptions) => void) {
  if (options == undefined) return () => null;
  return () => {
    return (
      <div className="widget__item">
        {options.thickness
          ? (<div className="widget-toolOptions__slider">
              <label>Stroke: 
                <input type="range" 
                  min={options.thickness.min} 
                  max={options.thickness.max} 
                  step={1} 
                  value={options.thickness.value} 
                  onChange={(evt) => setOptions({...options, thickness: { ...options.thickness, value: +evt.target.value }})} />
              {options.thickness.value}px</label>
            </div>)
          : null}
        {options.shadingIntensity
          ? (<div className="widget-toolOptions__slider">
              <label>Intensity: 
                <input type="range" 
                  min={options.shadingIntensity.min} 
                  max={options.shadingIntensity.max} 
                  step={1} 
                  value={options.shadingIntensity.value} 
                  onChange={(evt) => setOptions({...options, shadingIntensity: { ...options.shadingIntensity, value: +evt.target.value }})} />
              {options.shadingIntensity.value}</label>
            </div>)
          : null}
        {options.toolShape 
          ? (<div className="widget-toolOptions__radio">
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
        {options.shadingEffect 
          ? (<div className="widget-toolOptions__radio">
              <label>Lighten: 
                <input name="shading-effect" 
                  type="radio" 
                  value="lighten" 
                  checked={options.shadingEffect == 'lighten'}
                  onChange={() => setOptions({ ...options, shadingEffect: 'lighten' })} />
              </label>
              <label>Darken: 
                <input name="shading-effect" 
                  type="radio" 
                  value="darken" 
                  checked={options.shadingEffect == 'darken'}
                  onChange={() => setOptions({ ...options, shadingEffect: 'darken' })} />
              </label>
            </div>)
          : null}
        {options.fill !== undefined
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