import React from 'react';
import { BiCopy, BiLayerPlus, BiLayerMinus, BiArrowToTop, 
  BiArrowToBottom, BiShow, BiHide, BiLockOpenAlt, BiLockAlt } from 'react-icons/bi';
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
  layer: Layer;
  layerIdx: number;
  changeActiveLayer: Function;
  handleLayerIdChange: Function;
  updateLayerVisibility: Function;
  updateLayerLock: Function;
};

function LayerSelectItem(props: LayerSelectItem) {
  return (
    <div onClick={(evt) => props.changeActiveLayer(evt, props.layer.id)}
      className={`widget__item__layer ${props.layer.id == props.activeLayer ? 'widget__item__layer-active' : ''}`}>
      <input type="text" 
        className="widget__item__layer__input"
        minLength={1} 
        maxLength={15} 
        value={props.layer.id} 
        onClick={(evt) => { evt.stopPropagation(); }}
        onChange={(evt) => props.handleLayerIdChange(evt, props.layerIdx)} />
      <div className="widget__item__layer__btns">
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
    <div className="widget__item__layers">
      {layers.map((layer, idx) => (
        <LayerSelectItem key={layer.id}
          activeLayer={activeLayer}
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
  layers: Layer[], setLayers: Function, 
  activeLayer: string, setActiveLayer: Function) {
  const idx = layers.findIndex((layer) => layer.id === activeLayer);
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
      ...(idx == 0 ? [] : layers.slice(0, idx)),
      layer || Layer.empty(active, layers[idx].width, layers[idx].height),
      ...layers.slice(idx),
    ]);
    setActiveLayer(active);
  };
  const cloneLayer = (evt: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    evt.stopPropagation();
    insertLayer(undefined, Layer.copy(`Layer ${generateId()}`, layers[idx]))
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
      <div>
        <span className="widget__item__btn" onClick={insertLayer}><BiLayerPlus /></span>
        <span className="widget__item__btn" onClick={removeLayer}><BiLayerMinus /></span>
        <span className="widget__item__btn" onClick={cloneLayer}><BiCopy /></span>
        <span className="widget__item__btn" onClick={(evt) => moveLayer(evt, -1)}><BiArrowToTop /></span>
        <span className="widget__item__btn" onClick={(evt) => moveLayer(evt, 1)}><BiArrowToBottom /></span>
      </div>
      <LayerSelectItems 
        activeLayer={activeLayer}
        layers={layers}
        setLayers={setLayers}
        setActiveLayer={setActiveLayer} />
    </div>
  );
}

export default layerSelect;