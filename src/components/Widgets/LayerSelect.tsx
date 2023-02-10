import React from 'react';
import './widget.css';

import Layer from '../../pixit/Layer';

function layerSelect(
  layers: Layer[], setLayers: Function, 
  activeLayer: string, setActiveLayer: Function) {
  const insertLayer = () => {
    const idx = layers.findIndex((layer) => layer.id === activeLayer);
    const active = `${layers.length}`; 
    setLayers([
      ...layers.slice(0, idx + 1),
      Layer.empty(active, layers[idx].width, layers[idx].height),
      ...layers.slice(idx + 1),
    ]);
    setActiveLayer(active);
  };
  return () => (
    <div className="widget__item">
      <select value={activeLayer} onChange={(evt) => setActiveLayer(evt.target.value)}>
        {layers.map(({ id }) => <option key={id}>{id}</option>)}
      </select>
      <button onClick={insertLayer}>Add Layer</button>
    </div>
  );
}

export default layerSelect;