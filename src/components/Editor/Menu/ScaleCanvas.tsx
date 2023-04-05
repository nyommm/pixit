import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeOperationData, getHeight, getOperationData, getWidth } from '../../../store/editorSlice';
import PixelSection from './PixelSection';
import menuSection from './MenuSection';
import NumberInput from './NumberInput';
import './menu-section.css';

function PercentageSection() {
  const currentWidth = useSelector(getWidth);
  const currentHeight = useSelector(getHeight);
  const { canvasWidth, canvasHeight } = useSelector(getOperationData);
  const dispatch = useDispatch();
  const handleChange = (data: any) => {
    dispatch(changeOperationData(data));
  };
  return (
    <>
      <NumberInput id={'width-perc'} label={'Width'} 
        value={(canvasWidth ?? currentWidth) * 100 / currentWidth} 
        min={4 * currentWidth / 100} max={1024 * currentWidth / 100} step={0.01} 
        onChange={(evt) => handleChange({ canvasWidth: Math.round(+evt.target.value * currentWidth / 100) })} />
      <NumberInput id={'height-perc'} label={'Height'} 
        value={(canvasHeight ?? currentHeight) * 100 / currentHeight} 
        min={4 * currentHeight / 100} max={1024 * currentHeight / 100} step={1} 
        onChange={(evt) => handleChange({ canvasHeight: Math.round(+evt.target.value * currentWidth / 100) })} />
    </>
  );
}

export default function ScaleCanvas() {
  return (
    <>
      {menuSection('Pixels', PixelSection)()}
      {menuSection('Percentage', PercentageSection)()}
    </>
  )
}