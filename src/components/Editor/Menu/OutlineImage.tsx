import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeOperationData, getOperationData } from '../../../store/editorSlice';
import { AlphaPicker, ColorResult, CustomPicker, HuePicker } from 'react-color';
import menuSection from './MenuSection';
import Layer from '../../../pixit/Layer';
import './menu-section.css';

function OutlineThicknessSection() {
  const operationData = useSelector(getOperationData);
  const dispatch = useDispatch();
  const [thickness, setThickness] = useState(operationData.outlineThickness ?? 1);
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setThickness(+evt.target.value);
    dispatch(changeOperationData({ outlineThickness: thickness }));
  };
  return (
    <>
      <label className="menu-section__container__label" htmlFor="outline-thickness">
        Px:  
        <input id="outline-thickness" type="number" name="outline-thickness" 
          value={thickness} min={1} step={1}
          className="menu-section__container__input" 
          onChange={handleChange} />
      </label>
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