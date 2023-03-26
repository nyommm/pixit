import React from 'react';
import { TopbarMenuBtn } from '../../../pixit/types';

interface DropDownMenuProps {
  title: string;
  buttons: TopbarMenuBtn[];
};

export default function DropDownMenu({ title, buttons }: DropDownMenuProps) {
  return (
    <div className="topbar__dropdown-menu">
      <div className="topbar__dropdown-menu__btn">{title}</div>
      <div className="topbar__dropdown-menu__content">
        {buttons.map(({ name, onClick }) => {
          const disable = onClick ? '' : 'topbar__dropdown-menu__content__btn-disabled';
          return (
            <div key={name} onClick={onClick} className={`topbar__dropdown-menu__content__btn ${disable}`}>
              {name}
            </div>
          );
        })}
      </div>
    </div>
  );
}