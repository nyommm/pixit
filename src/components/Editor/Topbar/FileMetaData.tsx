import React from 'react';
import { useSelector } from 'react-redux';
import { getFileName, getHeight, getPointerPosition, getWidth } from '../../../store/editorSlice';
import './topbar.css';

export default function FileMetaData() {
  const fileName = useSelector(getFileName)
  const canvasWidth = useSelector(getWidth);
  const canvasHeight = useSelector(getHeight);
  const pointer = useSelector(getPointerPosition);
  return (
    <div className="topbar__metadata">
      {fileName}.png {`[${canvasWidth},${canvasHeight}]`} {`${pointer.x},${pointer.y}`}
    </div>
  );
}