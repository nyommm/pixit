import React from 'react';
import '../menu-section.css';

export default function menuSection(sectionHeader: string, Component: () => JSX.Element) {
  return function MenuSection() {
    return (
      <div className="menu-section">
        <p className="menu-section__header">{sectionHeader}</p>
        <div className="menu-section__container">
          <Component />
        </div>
      </div>
    );
  };
}