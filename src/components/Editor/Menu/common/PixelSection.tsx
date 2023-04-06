import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeOperationData, getHeight, getOperationData, getWidth } from '../../../../store/editorSlice';
import NumberInput from './NumberInput';
import '../menu-section.css';

export default function PixelSection() {
  const currentWidth = useSelector(getWidth);
  const currentHeight = useSelector(getHeight);
  const { canvasWidth, canvasHeight } = useSelector(getOperationData);
  const dispatch = useDispatch();
  const handleChange = (data: any) => {
    dispatch(changeOperationData(data));
  };
  return (
    <>
      <NumberInput id={'width-px'} label={'Width'} 
        min={4} max={1024} step={1} 
        value={canvasWidth ?? currentWidth} 
        onChange={(evt) => handleChange({ canvasWidth: +evt.target.value })} />
      <NumberInput id={'height-px'} label={'Height'} 
        min={4} max={1024} step={1} 
        value={canvasHeight ?? currentHeight} 
        onChange={(evt) => handleChange({ canvasHeight: +evt.target.value })} />
    </>
  );
}