import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeOperationData, getOperationData } from '../../../store/editorSlice';
import { Hue } from 'react-color/lib/components/common';
import { ColorResult, CustomPicker } from 'react-color';
import Layer from '../../../pixit/Layer';
import menuSection from './MenuSection';
import './menu-section.css';

function ShadowOffsetSection() {
  const operationData = useSelector(getOperationData);
  const dispatch = useDispatch();
  const [offsetX, setOffsetX] = useState(operationData.offsetX ?? 5);
  const [offsetY, setOffsetY] = useState(operationData.offsetY ?? 5);
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>, x: boolean) => {
    if (x) {
      setOffsetX(+evt.target.value);
      dispatch(changeOperationData({ offsetX: +evt.target.value }));
    } else {
      setOffsetY(+evt.target.value);
      dispatch(changeOperationData({ offsetY: +evt.target.value }));
    }
  };
  return (
    <>
      <label className="menu-section__container__label" htmlFor="x-offset">
        X 
        <input id="x-offset" type="number" name="shadow-offset" 
          value={offsetX} step={1} className="menu-section__container__input" 
          onChange={(evt) => handleChange(evt, true)} />
      </label>
      <label className="menu-section__container__label menu-section__container__label-block" htmlFor="y-offset">
        Y 
        <input id="y-offset" type="number" name="shadow-offset" 
          value={offsetY} step={1} className="menu-section__container__input" 
          onChange={(evt) => handleChange(evt, false)} />
      </label>
    </>
  );
}

function ShadowColor(props: any) {
  return (
    <>
      <div className="picker__hue">
        <Hue {...props} />
      </div>
    </>
  );
}

const ShadowColorFields = CustomPicker(ShadowColor);

function ShadowColorSection() {
  const operationData = useSelector(getOperationData);
  const dispatch = useDispatch();
  const handleChange = (result: ColorResult) => {
    dispatch(changeOperationData({ shadowColor: result.rgb }));
  };
  return <ShadowColorFields color={operationData.shadowColor ?? Layer.BLACK} onChange={handleChange} />;
}

export default function DropShadow() {
  return (
    <>
      {menuSection('Shadow Offset', ShadowOffsetSection)()}
      {menuSection('Shadow Color', ShadowColorSection)()}
    </>
  );
}