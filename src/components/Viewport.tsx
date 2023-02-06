import React from 'react';
import { useState } from 'react';

import Layer from '../pixit/Layer';
import LayerCanvas from './LayerCanvas';
import ViewportWidget from './Widgets/ViewportWidget';
import layerSelect from './Widgets/LayerSelect';
import colorSelect from './Widgets/colorSelect';
import { tools, PixitTools } from '../pixit/tools';
import { PixelPosition } from '../pixit/types';

const BASE_LAYER = Layer.empty('0', 64, 64);

function Viewport({ tool }: { tool: keyof PixitTools }) {
  const [layers, setLayers] = useState([BASE_LAYER]);
  const [activeLayer, setActiveLayer] = useState('0');
  const [color, setColor] = useState('#000000');
  const idx = layers.findIndex((layer) => layer.id == activeLayer);
  const dispatch = (layer: Layer) => {
    setLayers([
      ...layers.slice(0, idx),
      layer, ...layers.slice(idx + 1)
    ]);
  }
  const toolFn = (pos: PixelPosition) => 
      tools[tool](layers[idx], { ...pos, color }, dispatch);
  return (
    <div>
      <LayerCanvas 
        layers={layers} 
        activeLayer={activeLayer}
        toolFn={toolFn} />
      <ViewportWidget 
        render={layerSelect(layers, setLayers, activeLayer, setActiveLayer)} />
      <ViewportWidget render={colorSelect(color, setColor)} />
    </div>
  );
}

export default Viewport;