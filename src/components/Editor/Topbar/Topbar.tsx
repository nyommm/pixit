import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './topbar.css';

import DropDownMenu from './DropDownMenu';
import FileMetaData from './FileMetaData';
import { DialogBox, Operations } from '../../../pixit/types';
import { changeDialogBox, changeOperation, getRedoStack, getUndoStack, 
  changeOperationData, undo, redo } from '../../../store/editorSlice';

function Topbar() {
  const undoStack = useSelector(getUndoStack);
  const redoStack = useSelector(getRedoStack);
  const dispatch = useDispatch();
  const dispatchOperation = (operation: keyof Operations) => {
    return (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      evt.stopPropagation();
      dispatch(changeOperation(operation));
    };
  };
  const dispatchMenu = (menu: DialogBox) => {
    return (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      evt.stopPropagation();
      dispatch(changeDialogBox(menu));
    };
  };
  const dispatchUndoOperation = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    evt.stopPropagation();
    if (undoStack.length == 0) return;
    const changeData = undoStack[undoStack.length - 1];
    dispatch(undo());
    dispatch(changeOperationData({ changeData }));
    dispatch(changeOperation('undoChange'));
  };
  const dispatchRedoOperation = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    evt.stopPropagation();
    if (redoStack.length == 0) return;
    const changeData = redoStack[redoStack.length - 1];
    dispatch(redo());
    dispatch(changeOperationData({ changeData }));
    dispatch(changeOperation('redoChange'));
  };
  const menuItems = {
    file: {
      title: 'File',
      buttons: [
        { name: 'New...' }, { name: 'Save' }, { name: 'Save As...' }, 
        { name: 'Export...', onClick: dispatchMenu('exportImage') }, 
      ],
    },
    edit: {
      title: 'Edit',
      buttons: [
        { name: 'Undo', onClick: dispatchUndoOperation }, 
        { name: 'Redo', onClick: dispatchRedoOperation }, 
        { name: 'Copy' }, { name: 'Cut' }, 
        { name: 'Paste' }, { name: 'Delete' }, 
        { name: 'Preferences...' }, 
      ],
    },
    select: {
      title: 'Select',
      buttons: [
        { name: 'Clear Selection' }, { name: 'Select All' }, 
        { name: 'Invert Selection' }, 
      ],
    },
    image: {
      title: 'Image',
      buttons: [
        { name: 'Scale Canvas', onClick: dispatchMenu('scaleCanvas') }, 
        { name: 'Resize Canvas', onClick: dispatchMenu('resizeCanvas') }, 
        { name: 'Crop Image', onClick: dispatchOperation('cropImage') }, 
        { name: 'Centralize Image', onClick: dispatchOperation('centralizeImage') }, 
        { name: 'Mirror Image', onClick: dispatchMenu('mirrorImage') }, 
        { name: 'Rotate Image', onClick: dispatchMenu('rotateImage') }, 
        { name: 'Invert Colors', onClick: dispatchOperation('invertImageColors') }, 
        { name: 'Outline', onClick: dispatchMenu('outlineImage') }, 
        { name: 'Drop Shadow', onClick: dispatchMenu('dropShadow') }, 
        { name: 'Desaturation' }, { name: 'Adjust Hue/Saturation/Value' }, 
      ],
    },
    view: {
      title: 'View',
      buttons: [
        { name: 'Grayscale View' }, { name: 'Show Checkboard' }, 
        { name: 'Show Grid' }, { name: 'Show Pixel Grid' }, 
      ],
    },
  };
  return (
    <nav className="navbar">
      <span className="navbar__logo">Pixit!</span>
      <div className="navbar__menu">
        <DropDownMenu {...menuItems.file} />
        <DropDownMenu {...menuItems.edit} />
        <DropDownMenu {...menuItems.view} />
        <DropDownMenu {...menuItems.select} />
        <DropDownMenu {...menuItems.image} />
      </div>
      <FileMetaData />
    </nav>
  );
}

export default Topbar;