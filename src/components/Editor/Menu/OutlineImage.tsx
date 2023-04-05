import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeOperationData, getHeight, getOperationData, getWidth } from '../../../store/editorSlice';
import { AlphaPicker, ColorResult, CustomPicker, HuePicker } from 'react-color';
import NumberInput from './NumberInput';
import menuSection from './MenuSection';
import Layer from '../../../pixit/Layer';
import './menu-section.css';

function OutlineThicknessSection() {
  const operationData = useSelector(getOperationData);
  const width = useSelector(getWidth);
  const height = useSelector(getHeight);
  const dispatch = useDispatch();
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeOperationData({ outlineThickness: +evt.target.value }));
  };
  return (
    <>
      <NumberInput id={'outline-thickness'} label={'Px:'} 
        min={1} max={width > height ? width : height} step={1}
        value={operationData.outlineThickness ?? 1} onChange={handleChange} />
    </>
  );
}

function OutlineColor(props: any) {
  return (
    <>
      <div className="menu-section__container__alpha">
        <AlphaPicker {...props} />
      </div>
      <div className="menu-section__container__hue">
        <HuePicker {...props} />
      </div>
    </>
  );
}

const OutlineColorFields = CustomPicker(OutlineColor);

function OutlineColorSection() {
  const { outlineColor } = useSelector(getOperationData);
  const dispatch = useDispatch();
  const handleChangeComplete = (result: ColorResult) => {
    dispatch(changeOperationData({ outlineColor: result.rgb }));
  };
  return <OutlineColorFields color={outlineColor ?? Layer.BLACK} onChangeComplete={handleChangeComplete} />;
}

export default function OutlineImage() {
  return (
    <>
      {menuSection('Outline Thickness', OutlineThicknessSection)()}
      {menuSection('Outline Color', OutlineColorSection)()}
    </>
  );
}