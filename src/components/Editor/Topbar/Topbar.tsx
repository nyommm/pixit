import React from 'react';
import { useDispatch } from 'react-redux';
import './topbar.css';

import DropDownMenu from './DropDownMenu';
import { DialogBox, Operations } from '../../../pixit/types';
import { changeDialogBox, changeOperation } from '../../../store/editorSlice';

function Topbar() {
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
  const menuItems = {
    file: {
      title: 'File',
      buttons: [
        { name: 'New...' }, { name: 'Save' }, 
        { name: 'Save As...' }, { name: 'Export' }, 
      ],
    },
    edit: {
      title: 'Edit',
      buttons: [
        { name: 'Undo' }, { name: 'Redo' }, 
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
        { name: 'Rotate Image' }, { name: 'Desaturation' }, 
        { name: 'Invert Colors', onClick: dispatchOperation('invertImageColors') }, 
        { name: 'Outline', onClick: dispatchMenu('outlineImage') }, 
        { name: 'Drop Shadow', onClick: dispatchMenu('dropShadow') }, { name: 'Adjust Hue/Saturation/Value' }, 
      ],
    },
    view: {
      title: 'View',
      buttons: [
        { name: 'Grayscale View' }, { name: 'Invert View' }, 
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
    </nav>
  );
}

export default Topbar;