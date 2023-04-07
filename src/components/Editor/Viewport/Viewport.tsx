import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { debounce } from 'lodash';
import './viewport.css';

import Layer from '../../../pixit/Layer';
import LayerCanvas from './LayerCanvas';
import ViewportWidget from './Widgets/ViewportWidget';
import layerSelect from './Widgets/LayerSelect';
import colorSelect from './Widgets/colorSelect';
import toolOptions from './Widgets/toolOptions';
import tools from '../../../pixit/tools/tools';
import { getTool, getToolSettings, changeToolSettings, 
  getColor, changeColor, getActiveLayerIdx, changeActiveLayerIdx, 
  getWidth, getHeight, getOperation, changeOperation, changeWidth, 
  changeHeight, getOperationData, changeUndoStack, changeRedoStack } from '../../../store/editorSlice';
import { RGBColor } from 'react-color';
import { ToolOptions, LayerData, ChangeData } from '../../../pixit/types';
import operationHandler from '../../../pixit/operations/handler';

function generateDefaultBaseLayer(width: number, height: number) {
  return Layer.empty('Layer 0', width, height);
}

function Viewport() {
  const dispatch = useDispatch();
  const tool = useSelector(getTool);
  const toolSettings = useSelector(getToolSettings);
  const color = useSelector(getColor);
  const activeLayerIdx = useSelector(getActiveLayerIdx);
  const canvasWidth = useSelector(getWidth);
  const canvasHeight = useSelector(getHeight);
  const operation = useSelector(getOperation);
  const operationData = useSelector(getOperationData);
  const [layers, setLayers] = useState([generateDefaultBaseLayer(canvasWidth, canvasHeight)]);
  const [changeDataUndo, setChangeDataUndo] = useState({} as ChangeData);
  const [changeDataRedo, setChangeDataRedo] = useState({} as ChangeData);
  const toolOptionsDispatch = (options: ToolOptions) => dispatch(changeToolSettings(options));
  const colorDispatch = (color: RGBColor) => dispatch(changeColor(color));
  const activeLayerIdxDispatch = (idx: number) => dispatch(changeActiveLayerIdx(idx));
  const getChangeData = (canvasLayers: Layer[] = layers, activeLayerIndex: number = activeLayerIdx) => {
    const layerData: LayerData[] = canvasLayers.map((layer) => {
      return {
        id: layer.id,
        width: layer.width,
        height: layer.height,
        hidden: layer.hidden,
        locked: layer.locked,
        pixels: layer.pixels.slice(),
      };
    });
    return {
      activeLayerIdx: activeLayerIndex,
      layers: layerData,
    };
  };
  const updateUndoStack = debounce(() => {
    dispatch(changeUndoStack(changeDataUndo));
    setChangeDataUndo({} as ChangeData);
  }, 100);
  const updateRedoStack = debounce(() => {
    dispatch(changeRedoStack(changeDataRedo));
    setChangeDataUndo({} as ChangeData);
  }, 100);
  const executeOperation = () => {
    if (operation == 'None') return;
    const result = operationHandler(layers, operation, operationData);
    if (result.layers) {
      if (result.layers.length > 1) {
        dispatch(changeWidth(result.layers[0].width));
        dispatch(changeHeight(result.layers[0].height));
      }
      if (operation != 'undoChange') setChangeDataUndo(getChangeData());
      if (operation == 'undoChange') setChangeDataRedo(getChangeData());
      console.log(result.layers);
      setLayers(result.layers);
    };
    if (result.activeLayerIdx) activeLayerIdxDispatch(result.activeLayerIdx);
    dispatch(changeOperation('None'));
  };
  useEffect(executeOperation, [operation]);
  useEffect(() => {
    if (changeDataUndo.layers || changeDataUndo.activeLayerIdx) updateUndoStack();
    return () => updateUndoStack.cancel();
  }, [changeDataUndo]);
  useEffect(() => {
    if (changeDataRedo.layers || changeDataRedo.activeLayerIdx) updateRedoStack();
    return () => updateRedoStack.cancel();
  }, [changeDataRedo]);
  const toolDispatch = (state: { layer?: Layer, color?: RGBColor }) => {
    if (state.layer) {
      const newLayers = [
        ...layers.slice(0, activeLayerIdx),
        state.layer, ...layers.slice(activeLayerIdx + 1)
      ]
      setChangeDataUndo(getChangeData());
      // setChangeDataRedo(getChangeData(newLayers));
      setLayers(newLayers);
    }
    if (state.color) colorDispatch(state.color);
  };
  const toolFn = (canvas: HTMLCanvasElement, scale: number) => 
      tools[tool].toolFn(canvas, layers[activeLayerIdx], scale, color, toolDispatch, toolSettings);
  return (
    <div className="viewport" >
      <LayerCanvas 
        layers={layers} 
        color={color} exportImage={operation == 'exportImage'}
        activeLayerIdx={activeLayerIdx} 
        toolFn={toolFn} />
      <ViewportWidget 
        widgetName='Layers'
        widgetClass='widget-layerSelect'
        render={layerSelect(layers, setLayers, activeLayerIdx, activeLayerIdxDispatch)} />
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