import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MirrorAxis } from '../../../pixit/types';
import { changeOperationData, getOperationData } from '../../../store/editorSlice';
import menuSection from './MenuSection';

function AxisSection() {
  const operationData = useSelector(getOperationData);
  const dispatch = useDispatch();
  const axis = operationData.mirrorAxis ?? 'Y' as MirrorAxis;
  return (
    <>
      <label htmlFor="x-axis">
        X 
        <input id="x-axis" type="radio" name="mirror-axis" 
          value={'X' as MirrorAxis} checked={axis == 'X'} 
          onChange={() => dispatch(changeOperationData({ ...operationData, mirrorAxis: 'X' }))} />
      </label>
      <label htmlFor="y-axis">
        Y 
        <input id="y-axis" type="radio" name="mirror-axis" 
          value={'Y' as MirrorAxis} checked={axis == 'Y'} 
          onChange={() => dispatch(changeOperationData({ ...operationData, mirrorAxis: 'Y' }))} />
      </label>
    </>
  );
}

export default menuSection('Mirror Axis', AxisSection);