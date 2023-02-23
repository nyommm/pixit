import React from 'react';
import { useState } from 'react';
import './viewport.css';

import Layer from '../pixit/Layer';
import LayerCanvas from './LayerCanvas';
import ViewportWidget from './Widgets/ViewportWidget';
import layerSelect from './Widgets/LayerSelect';
import colorSelect from './Widgets/colorSelect';
import tools from '../pixit/tools/tools';
import { DispatchFn, PixitTools } from '../pixit/types';
import { RGBColor } from 'react-color';

const BASE_LAYER = Layer.empty('Layer 0', 64, 64);
const BLACK: RGBColor = { r: 0, g: 0, b: 0, a: 255 };

function Viewport({ tool }: { tool: keyof PixitTools }) {
  const [layers, setLayers] = useState([BASE_LAYER]);
  const [activeLayer, setActiveLayer] = useState(BASE_LAYER.id);
  const [color, setColor] = useState(BLACK);
  const idx = layers.findIndex((layer) => layer.id == activeLayer);
  const dispatch = (state: { layer?: Layer, color?: RGBColor }) => {
    if (state.layer) {
      setLayers([
        ...layers.slice(0, idx),
        state.layer, ...layers.slice(idx + 1)
      ]);
    }
    if (state.color) {
      setColor(state.color);
    }
  };
  const toolFn = (canvas: HTMLCanvasElement, scale: number) => 
      tools[tool].toolFn(canvas, layers[idx], scale, color, dispatch);
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
        render={layerSelect(layers, setLayers, activeLayer, setActiveLayer)} />
      <ViewportWidget 
        widgetName='Color'
        widgetClass='widget-colorSelect'
        render={colorSelect(color, setColor)} />
    </div>
  );
}

export default Viewport;