import React from 'react';
import { useState } from 'react';
import { BiCopy, BiLayerPlus, BiLayerMinus, BiArrowToTop, 
  BiArrowToBottom, BiShow, BiHide, BiLockOpenAlt, BiLockAlt } from 'react-icons/bi';
import './layer-select.css';

import Layer from '../../pixit/Layer';

interface LayerSelectItems {
  activeLayerIdx: number;
  layers: Layer[];
  setLayers: Function;
  setActiveLayer: Function;
};

interface LayerSelectItem {
  activeLayerIdx: number;
  layer: Layer;
  layerIdx: number;
  changeActiveLayer: Function;
  handleLayerIdChange: Function;
  updateLayerVisibility: Function;
  updateLayerLock: Function;
};

function LayerSelectItem(props: LayerSelectItem) {
  const [value, setValue] = useState(props.layer.id);
  return (
    <div onClick={(evt) => props.changeActiveLayer(evt, props.layerIdx)}
      className={`layer-select__layers__item ${props.layerIdx == props.activeLayerIdx ? 'layer-select__layers__item-active' : ''}`}>
      <input type="text" 
        className="layer-select__layers__item__input"
        minLength={1} 
        maxLength={15} 
        value={value} 
        onBlur={(evt) => { props.handleLayerIdChange(evt, props.layerIdx); setValue(props.layer.id); }} 
        onClick={(evt) => { evt.stopPropagation(); }} 
        onChange={(evt) => setValue(evt.target.value)} />
      <div className="layer-select__layers__item__btns">
        <span onClick={(evt) => props.updateLayerVisibility(evt, props.layerIdx)}>
          {props.layer.hidden ? <BiHide /> : <BiShow />}
        </span>
        <span onClick={(evt) => props.updateLayerLock(evt, props.layerIdx)}>
          {props.layer.locked ? <BiLockAlt /> : <BiLockOpenAlt />}
        </span>
      </div>
    </div>
  )
}

function LayerSelectItems({ activeLayerIdx, layers, setLayers, setActiveLayer }: LayerSelectItems) {
  const handleLayerIdChange = (evt: any, layerIdx: number) => {
    // if new id is not unique don't make any changes
    if (layers.some((layer, idx) => idx != layerIdx && layer.id == evt.target.value))
      return;
    const updatedLayer = Layer.copy(evt.target.value, layers[layerIdx]);
    setLayers([
      ...layers.slice(0, layerIdx),
      updatedLayer,
      ...layers.slice(layerIdx + 1),

    ]);
    if (activeLayerIdx == layerIdx) {
      setActiveLayer(evt.target.value);
    }
  };
  const changeActiveLayer = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>, idx: number) => {
    evt.stopPropagation();
    setActiveLayer(idx);
  };
  const updateLayerVisibility = (evt: React.MouseEvent<HTMLSpanElement, MouseEvent>, idx: number) => {
    evt.stopPropagation();
    setLayers([
      ...layers.slice(0, idx),
      Layer.showHideLayer(layers[idx]),
      ...layers.slice(idx + 1),
    ]);
  };
  const updateLayerLock = (evt: React.MouseEvent<HTMLSpanElement, MouseEvent>, idx: number) => {
    evt.stopPropagation();
    setLayers([
      ...layers.slice(0, idx),
      Layer.lockUnlockLayer(layers[idx]),
      ...layers.slice(idx + 1),
    ]);
  };
  return (
    <div className="layer-select__layers">
      {layers.map((layer, idx) => (
        <LayerSelectItem key={layer.id}
          activeLayerIdx={activeLayerIdx}
          layer={layer}
          layerIdx={idx}
          changeActiveLayer={changeActiveLayer}
          handleLayerIdChange={handleLayerIdChange}
          updateLayerVisibility={updateLayerVisibility}
          updateLayerLock={updateLayerLock} />
      ))}
    </div>
  );
}

function layerSelect(
  layers: Layer[], setLayers: (layers: Layer[]) => void, 
  activeLayerIdx: number, setActiveLayer: (idx: number) => void) {
  const generateId = () => {
    let newID = layers.length;
    while (layers.some((layer) => layer.id == `Layer ${newID}`)) {
      newID += 1;
    };
    return newID;
  }
  const insertLayer = (evt?: React.MouseEvent<HTMLSpanElement, MouseEvent>, layer?: Layer) => {
    evt && evt.stopPropagation();
    const active = layer ? layer.id : `Layer ${generateId()}`;
    setLayers([
      ...(activeLayerIdx == 0 ? [] : layers.slice(0, activeLayerIdx)),
      layer || Layer.empty(active, layers[activeLayerIdx].width, layers[activeLayerIdx].height),
      ...layers.slice(activeLayerIdx),
    ]);
    setActiveLayer(activeLayerIdx + 1);
  };
  const cloneLayer = (evt: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    evt.stopPropagation();
    insertLayer(undefined, Layer.copy(`Layer ${generateId()}`, layers[activeLayerIdx]))
  };
  const removeLayer = (evt: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    evt.stopPropagation();
    if (layers.length == 1) {
      const newLayer = Layer.empty('Layer 0', layers[0].width, layers[0].height);
      setLayers([newLayer]);
      setActiveLayer(0);
      return;
    }
    if (activeLayerIdx < layers.length - 1) {
      setActiveLayer(activeLayerIdx + 1);
    } else {
      setActiveLayer(activeLayerIdx - 1);
    }
    setLayers([
      ...layers.slice(0, activeLayerIdx),
      ...layers.slice(activeLayerIdx + 1)
    ]);
  };
  const moveLayer = (evt: React.MouseEvent<HTMLSpanElement, MouseEvent>, change: number) => {
    evt.stopPropagation();
    // move layer down
    if (change == 1) {
      if (activeLayerIdx == layers.length - 1) return;
      setLayers([
        ...layers.slice(0, activeLayerIdx),
        layers[activeLayerIdx + 1], layers[activeLayerIdx],
        ...layers.slice(activeLayerIdx + 2)
      ]);
    }
    // move layer up
    if (change == -1) {
      if (activeLayerIdx == 0) return;
      setLayers([
        ...layers.slice(0, activeLayerIdx - 1),
        layers[activeLayerIdx], layers[activeLayerIdx - 1],
        ...layers.slice(activeLayerIdx + 1)
      ]);
    }
  };
  return () => (
    <div className="widget__item">
      <div>
        <span className="widget__item__btn" onClick={insertLayer}><BiLayerPlus /></span>
        <span className="widget__item__btn" onClick={removeLayer}><BiLayerMinus /></span>
        <span className="widget__item__btn" onClick={cloneLayer}><BiCopy /></span>
        <span className="widget__item__btn" onClick={(evt) => moveLayer(evt, -1)}><BiArrowToTop /></span>
        <span className="widget__item__btn" onClick={(evt) => moveLayer(evt, 1)}><BiArrowToBottom /></span>
      </div>
      <LayerSelectItems 
        activeLayerIdx={activeLayerIdx}
        layers={layers}
        setLayers={setLayers}
        setActiveLayer={setActiveLayer} />
    </div>
  );
}

export default layerSelect;