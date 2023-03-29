import React from 'react';
import { useRef } from 'react';
import { HiOutlineX } from 'react-icons/hi'
import './dialog-box.css';

interface DialogBoxProps {
  title: string;
  render: () => JSX.Element;
  close: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function DialogBox({ title, render, close }: DialogBoxProps) {
  const dialogBoxRef = useRef(null);
  const onMouseDown = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    evt.stopPropagation();
    if (dialogBoxRef.current == null) return;
    const widgetElement = dialogBoxRef.current as HTMLDivElement;
    if (evt.button == 0) {
      let x = evt.clientX, y = evt.clientY;
      let offsetX = 0, offsetY = 0;
      const onMove = (moveEvent: any) => {
        if (moveEvent.buttons != 1) {
          widgetElement.removeEventListener('mousemove', onMove);
        } else {
          offsetX = x - moveEvent.clientX;
          offsetY = y - moveEvent.clientY;
          widgetElement.style.left = `${widgetElement.offsetLeft - offsetX}px`;
          widgetElement.style.top = `${widgetElement.offsetTop - offsetY}px`;
          x = moveEvent.clientX;
          y = moveEvent.clientY;
        }
      }
      widgetElement.addEventListener('mousemove', onMove);
    }
  };
  return (
    <div ref={dialogBoxRef.current} className="dialog-box">
      <div className="dialog-box__header" onMouseDown={onMouseDown}>
        <span>{title}</span>
        <button className="dialog-box__header__btn" onClick={close}><HiOutlineX /></button>
      </div>
      <div className="dialog-box__content">
        {render()}
      </div>
    </div>
  );
}