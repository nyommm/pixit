import React from 'react';
import './topbar.css';

function Topbar() {
  return (
    <nav className="navbar">
      <span className="navbar__logo">Pixit!</span>
      <ul className="navbar__menu">
        <li className="navbar__menu__item navbar__menu__item-file">File</li>
        <li className="navbar__menu__item navbar__menu__item-edit">Edit</li>
        <li className="navbar__menu__item navbar__menu__item-view">View</li>
        <li className="navbar__menu__item navbar__menu__item-select">Select</li>
        <li className="navbar__menu__item navbar__menu__item-image">Image</li>
        <li className="navbar__menu__item navbar__menu__item-window">Window</li>
      </ul>
    </nav>
  )
}

export default Topbar;