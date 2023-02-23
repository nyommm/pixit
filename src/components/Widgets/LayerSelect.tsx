import React from 'react';
import { FaLayerGroup, FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import './widget.css';

import Layer from '../../pixit/Layer';

interface LayerSelectItems {
  activeLayer: string;
  layers: Layer[];
  setLayers: Function;
  setActiveLayer: Function;
};

interface LayerSelectItem {
  activeLayer: string;
  layerId: string;
  layerIdx: number;
  changeActiveLayer: Function;
  handleLayerIdChange: Function;
};

function LayerSelectItem({ activeLayer, layerId, layerIdx, changeActiveLayer, handleLayerIdChange }: LayerSelectItem) {
  return (
    <div onClick={(evt) => changeActiveLayer(evt, layerId)}
      className={`widget__item__layer ${layerId == activeLayer ? 'widget__item__layer-active' : ''}`}>
      <input type="text" 
        className="widget__item__layer__input"
        minLength={1} 
        maxLength={15} 
        value={layerId} 
        onClick={(evt) => { evt.stopPropagation(); }}
        onChange={(evt) => handleLayerIdChange(evt, layerIdx)} />
    </div>
  )
}

function LayerSelectItems({ activeLayer, layers, setLayers, setActiveLayer }: LayerSelectItems) {
  const handleLayerIdChange = (evt: any, layerIdx: number) => {
    // if new id is not unique don't make any changes
    // TODO!: Need to tell this to the user as well
    if (layers.some((layer, idx) => idx != layerIdx && layer.id == evt.target.value))
      return;
    const idx = layers.findIndex((layer) => layer.id === activeLayer);
    const updatedLayer = Layer.copy(evt.target.value, layers[layerIdx]);
    setLayers([
      ...layers.slice(0, layerIdx),
      updatedLayer,
      ...layers.slice(layerIdx + 1),

    ]);
    if (idx == layerIdx) {
      setActiveLayer(evt.target.value);
    }
  };
  const changeActiveLayer = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) => {
    evt.stopPropagation();
    setActiveLayer(id);
  };
  return (
    <>
      {layers.map((layer, idx) => (
        <LayerSelectItem key={layer.id}
          activeLayer={activeLayer}
          layerId={layer.id}
          layerIdx={idx}
          changeActiveLayer={changeActiveLayer}
          handleLayerIdChange={handleLayerIdChange} />
      ))}
    </>
  );
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
      <span className="widget__item__btn" onClick={insertLayer}><FaLayerGroup /></span>
      <span className="widget__item__btn" onClick={removeLayer}><FaTrash /></span>
      <span className="widget__item__btn" onClick={(evt) => moveLayer(evt, -1)}><FaArrowUp /></span>
      <span className="widget__item__btn" onClick={(evt) => moveLayer(evt, 1)}><FaArrowDown /></span>
      <LayerSelectItems 
        activeLayer={activeLayer}
        layers={layers}
        setLayers={setLayers}
        setActiveLayer={setActiveLayer} />
    </div>
  );
}

export default layerSelect;