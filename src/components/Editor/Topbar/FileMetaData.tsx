import React from 'react';
import { useSelector } from 'react-redux';
import { getFileName, getHeight, getWidth } from '../../../store/editorSlice';
import './topbar.css';

export default function FileMetaData() {
  const fileName = useSelector(getFileName)
  const canvasWidth = useSelector(getWidth);
  const canvasHeight = useSelector(getHeight);
  return (
    <div className="topbar__metadata">
      {fileName}.png {`[${canvasWidth},${canvasHeight}]`}
    </div>
  );
}