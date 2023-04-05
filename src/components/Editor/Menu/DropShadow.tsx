import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeOperationData, getHeight, getOperationData, getWidth } from '../../../store/editorSlice';
import { ColorResult, CustomPicker, HuePicker } from 'react-color';
import NumberInput from './NumberInput';
import Layer from '../../../pixit/Layer';
import menuSection from './MenuSection';
import './menu-section.css';

function ShadowOffsetSection() {
  const operationData = useSelector(getOperationData);
  const width = useSelector(getWidth);
  const height = useSelector(getHeight);
  const dispatch = useDispatch();
  const handleChangeX = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeOperationData({ offsetX: +evt.target.value }));
  };
  const handleChangeY = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeOperationData({ offsetY: +evt.target.value }));
  };
  return (
    <>
      <NumberInput id={'x-offset'} label={'X'} 
        min={0} max={width * 2} step={1}
        value={operationData.offsetX ?? 5} onChange={handleChangeX} />
      <NumberInput id={'y-offset'} label={'Y'} 
        min={0} max={height * 2} step={1}
        value={operationData.offsetY ?? 5} onChange={handleChangeY} />
    </>
  );
}

function ShadowColor(props: any) {
  return (
    <>
      <div className="picker__hue">
        <HuePicker {...props} />
      </div>
    </>
  );
}

const ShadowColorFields = CustomPicker(ShadowColor);

function ShadowColorSection() {
  const { shadowColor } = useSelector(getOperationData);
  const dispatch = useDispatch();
  const handleChangeComplete = (result: ColorResult) => {
    dispatch(changeOperationData({ shadowColor: result.rgb }));
  };
  return <ShadowColorFields color={shadowColor ?? Layer.BLACK} onChangeComplete={handleChangeComplete} />;
}

export default function DropShadow() {
  return (
    <>
      {menuSection('Shadow Offset', ShadowOffsetSection)()}
      {menuSection('Shadow Color', ShadowColorSection)()}
    </>
  );
}