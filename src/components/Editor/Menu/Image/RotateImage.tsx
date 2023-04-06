import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeOperationData, getHeight, getOperationData, getWidth } from '../../../../store/editorSlice';
import menuSection from '../common/MenuSection';
import NumberInput from '../common/NumberInput';
import '../menu-section.css';

function PivotSection() {
  const canvasWidth = useSelector(getWidth);
  const canvasHeight = useSelector(getHeight);
  const { pivot } = useSelector(getOperationData);
  const dispatch = useDispatch();
  const handleChange = (data: any) => {
    dispatch(changeOperationData(data));
  };
  return (
    <>
      <NumberInput id={'pivot-x'} label={'X'} 
        min={0} max={canvasWidth - 1} step={1} 
        value={pivot?.x ?? 0} 
        onChange={(evt) => handleChange({ pivot: { x: +evt.target.value, y: pivot?.y ?? 0 } })} />
      <NumberInput id={'pivot-y'} label={'Y'} 
        min={0} max={canvasHeight - 1} step={1} 
        value={pivot?.y ?? 0} 
        onChange={(evt) => handleChange({ pivot: { y: +evt.target.value, x: pivot?.x ?? 0 } })} />
    </>
  );
}

function AngleSection() {
  const { angle } = useSelector(getOperationData);
  const dispatch = useDispatch();
  const handleChange = (data: any) => {
    dispatch(changeOperationData(data));
  };
  return (
    <NumberInput id={'angle'} label={'Angle'} 
      min={0} max={360} step={0.1} value={angle ?? 0} 
      onChange={(evt) => handleChange({ angle: +evt.target.value })} />
  );
}

export default function RotateImage() {
  return (
    <>
      {menuSection('Pivot Point', PivotSection)()}
      {menuSection('Angle', AngleSection)()}
    </>
  );
}