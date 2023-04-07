import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeFileName, getFileName, getHeight, getScale, getWidth } from '../../../../store/editorSlice';
import NumberInput from '../common/NumberInput';
import TextInput from '../common/TextInput';
import menuSection from '../common/MenuSection';
import '../menu-section.css';

function ResolutionSection() {
  const scale = useSelector(getScale);
  const canvasWidth = useSelector(getWidth);
  const canvasHeight = useSelector(getHeight);
  return (
    <>
      <NumberInput id={'width-px'} label={'Width'} 
        min={4 * scale} max={1024 * scale} step={1} 
        value={canvasWidth * scale} 
        onChange={() => {}} />
      <NumberInput id={'height-px'} label={'Height'} 
        min={4 * scale} max={1024 * scale} step={1} 
        value={canvasHeight * scale} 
        onChange={() => {}} disabled={true} />
    </>
  );
}

function FileNameSection() {
  const fileName = useSelector(getFileName);
  const dispatch = useDispatch();
  const changeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.stopPropagation();
    dispatch(changeFileName(evt.target.value));
  };
  return (
    <TextInput id={'fileName'} label={'Filename'} 
      value={fileName} minLength={3} maxLength={12} 
      onChange={changeHandler} disabled={false} />
  );
}

export default function ExportImage() {
  return (
    <>
      {menuSection('Image Resolution', ResolutionSection)()}
      {menuSection('Filename', FileNameSection)()}
    </>
  );
}