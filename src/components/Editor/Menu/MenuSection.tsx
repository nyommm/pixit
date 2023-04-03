import React from 'react';

export default function menuSection(sectionHeader: string, Component: () => JSX.Element) {
  return function MenuSection() {
    return (
      <div>
        <p>{sectionHeader}</p>
        <div>
          <Component />
        </div>
      </div>
    );
  };
}