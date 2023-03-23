import React from 'react';
import './topbar.css';

import DropDownMenu from './DropDownMenu';

function Topbar() {
  const menuItems = {
    file: {
      title: 'File',
      buttons: [
        { name: 'New...' }, { name: 'Save' }, 
        { name: 'Save As...' }, { name: 'Export' }, 
        { name: 'Export As...' },
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
        { name: 'Clear' }, { name: 'All' }, 
        { name: 'Invert' },
      ],
    },
    image: {
      title: 'Image',
      buttons: [
        { name: 'Scale' }, { name: 'Resize' }, 
        { name: 'Crop' }, { name: 'Centralize' }, 
        { name: 'Mirror' }, { name: 'Rotate' }, 
        { name: 'Desaturation' }, { name: 'Invert Colors' }, 
        { name: 'Outline' }, { name: 'Adjust Hue/Saturation/Value' }, 
      ],
    },
    view: {
      title: 'View',
      buttons: [
        { name: 'Mirror View' }, { name: 'Grayscale View' }, 
        { name: 'Invert View' }, { name: 'Show Grid' }, 
        { name: 'Show Pixel Grid' },
      ],
    },
  }
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
  )
}

export default Topbar;