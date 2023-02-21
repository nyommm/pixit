import React from 'react';
import './widget.css';

import Layer from '../../pixit/Layer';

interface LayerSelectItem {
  activeLayer: string;
  layerIds: string[];
  setActiveLayer: Function;
};

function LayerSelectItem({ activeLayer, layerIds, setActiveLayer }: LayerSelectItem) {
  const changeActiveLayer = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) => {
    evt.stopPropagation();
    setActiveLayer(id);
  };
  return (
    <>
      {layerIds.map((id) => (
        <div key={id} 
          className={`widget__item__layer ${id == activeLayer ? 'widget__item__layer-active' : ''}`}
          onClick={(evt) => changeActiveLayer(evt, id)}>{id}
        </div>
      ))}
    </>
  )
}

function layerSelect(
  layers: Layer[], setLayers: Function, 
  activeLayer: string, setActiveLayer: Function) {
  const idx = layers.findIndex((layer) => layer.id === activeLayer);
  const insertLayer = (evt: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    evt.stopPropagation();
    let newID = layers.length;
    while (layers.some((layer) => layer.id == `Layer ${newID}`)) {
      newID += 1;
    };
    const active = `Layer ${newID}`;
    setLayers([
      ...(idx == 0 ? [] : layers.slice(0, idx)),
      Layer.empty(active, layers[idx].width, layers[idx].height),
      ...layers.slice(idx),
    ]);
    setActiveLayer(active);
  };
  const removeLayer = (evt: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    evt.stopPropagation();
    if (layers.length == 1) {
      const newLayer = Layer.empty('Layer 0', layers[0].width, layers[0].height);
      setLayers([newLayer]);
      setActiveLayer('Layer 0');
      return;
    }
    if (idx < layers.length - 1) {
      setActiveLayer(layers[idx + 1].id);
    } else {
      setActiveLayer(layers[idx - 1].id);
    }
    setLayers([
      ...layers.slice(0, idx),
      ...layers.slice(idx + 1)
    ]);
  };
  const moveLayer = (evt: React.MouseEvent<HTMLSpanElement, MouseEvent>, change: number) => {
    evt.stopPropagation();
    // move layer down
    if (change == 1) {
      if (idx == layers.length - 1) return;
      setLayers([
        ...layers.slice(0, idx),
        layers[idx + 1], layers[idx],
        ...layers.slice(idx + 2)
      ]);
    }
    // move layer up
    if (change == -1) {
      if (idx == 0) return;
      setLayers([
        ...layers.slice(0, idx - 1),
        layers[idx], layers[idx - 1],
        ...layers.slice(idx + 1)
      ]);
    }
  };
  return () => (
    <div className="widget__item">
      <span className="widget__item__btn" onClick={insertLayer}>+</span>
      <span className="widget__item__btn" onClick={removeLayer}>-</span>
      <span className="widget__item__btn" onClick={(evt) => moveLayer(evt, -1)}>&#5169;</span>
      <span className="widget__item__btn" onClick={(evt) => moveLayer(evt, 1)}>&#5167;</span>
      <LayerSelectItem 
        activeLayer={activeLayer}
        layerIds={layers.map((layer) => layer.id)} 
        setActiveLayer={setActiveLayer} />
    </div>
  );
}

export default layerSelect;