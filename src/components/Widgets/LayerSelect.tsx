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
    const active = `${layers.length}`; 
    setLayers([
      ...(idx == 0 ? [] : layers.slice(0, idx)),
      Layer.empty(active, layers[idx].width, layers[idx].height),
      ...layers.slice(idx),
    ]);
    setActiveLayer(active);
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
  }
  return () => (
    <div className="widget__item">
      <span className="widget__item__btn" onClick={insertLayer}>+</span>
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