import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeOperationData, getHeight, getOperationData, getWidth } from '../../../store/editorSlice';
import './menu-section.css';

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
      <label className="menu-section__container__label" htmlFor="width-px">
        Width 
        <input id="width-px" type="number" name="width-px" 
          value={canvasWidth ?? currentWidth} min={4} max={1024} step={1} 
          className="menu-section__container__input" 
          onChange={(evt) => handleChange({ canvasWidth: +evt.target.value })} />
      </label>
      <label className="menu-section__container__label" htmlFor="height-px">
        Height 
        <input id="height-px" type="number" name="height-px" 
          value={canvasHeight ?? currentHeight} min={4} max={1024} step={1} 
          className="menu-section__container__input" 
          onChange={(evt) => handleChange({ canvasHeight: +evt.target.value })} />
      </label>
    </>
  );
}