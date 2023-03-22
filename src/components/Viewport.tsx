import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './viewport.css';

import Layer from '../pixit/Layer';
import LayerCanvas from './LayerCanvas';
import ViewportWidget from './Widgets/ViewportWidget';
import layerSelect from './Widgets/LayerSelect';
import colorSelect from './Widgets/colorSelect';
import toolOptions from './Widgets/toolOptions';
import tools from '../pixit/tools/tools';
import { getTool, getToolSettings, changeToolSettings, getColor, changeColor } from '../store/editorSlice';
import { RGBColor } from 'react-color';
import { ToolOptions } from '../pixit/types';

const BASE_LAYER = Layer.empty('Layer 0', 64, 64);
const BLACK: RGBColor = { r: 0, g: 0, b: 0, a: 255 };

function Viewport() {
  const dispatch = useDispatch();
  const tool = useSelector(getTool);
  const toolSettings = useSelector(getToolSettings);
  const color = useSelector(getColor);
  const [layers, setLayers] = useState([BASE_LAYER]);
  const [activeLayer, setActiveLayer] = useState(BASE_LAYER.id);
  const idx = layers.findIndex((layer) => layer.id == activeLayer);
  const toolOptionsDispatch = (options: ToolOptions) => {
    dispatch(changeToolSettings(options));
  };
  const colorDispatch = (color: RGBColor) => {
    dispatch(changeColor(color));
  };
  const toolDispatch = (state: { layer?: Layer, color?: RGBColor }) => {
    if (state.layer) {
      setLayers([
        ...layers.slice(0, idx),
        state.layer, ...layers.slice(idx + 1)
      ]);
    }
    if (state.color) colorDispatch(state.color);
  };
  const toolFn = (canvas: HTMLCanvasElement, scale: number) => 
      tools[tool].toolFn(canvas, layers[idx], scale, color, toolDispatch, toolSettings);
  return (
    <div className="viewport" >
      <LayerCanvas 
        layers={layers} 
        color={color} 
        activeLayerIdx={idx}
        toolFn={toolFn} />
      <ViewportWidget 
        widgetName='Layers'
        widgetClass='widget-layerSelect'
        render={layerSelect(layers, setLayers, idx, setActiveLayer)} />
      <ViewportWidget 
        widgetName='Color'
        widgetClass='widget-colorSelect'
        render={colorSelect(color, colorDispatch)} />
      <ViewportWidget
        widgetName='Tool Options'
        widgetClass='widget-toolOptions'
        render={toolOptions(toolSettings, toolOptionsDispatch)} />
    </div>
  );
}

export default Viewport;