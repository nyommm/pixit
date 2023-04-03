import React from 'react';
import { useRef } from 'react';
import { HiOutlineX } from 'react-icons/hi'
import { useDispatch } from 'react-redux';
import { changeDialogBox, changeOperation } from '../../../store/editorSlice';
import { Operations } from '../../../pixit/types';
import './dialog-box.css';

interface DialogBoxProps {
  title: string;
  operation: keyof Operations;
  menu: () => JSX.Element;
}

export default function DialogBox({ title, operation, menu }: DialogBoxProps) {
  const dialogBoxRef = useRef(null);
  const dispatch = useDispatch();
  const onMouseDown = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    evt.stopPropagation();
    if (dialogBoxRef.current == null) return;
    const dialogBoxElement = dialogBoxRef.current as HTMLDivElement;
    if (evt.button == 0) {
      let x = evt.clientX, y = evt.clientY;
      let offsetX = 0, offsetY = 0;
      const onMove = (moveEvent: any) => {
        if (moveEvent.buttons != 1) {
          dialogBoxElement.removeEventListener('mousemove', onMove);
        } else {
          offsetX = x - moveEvent.clientX;
          offsetY = y - moveEvent.clientY;
          dialogBoxElement.style.left = `${dialogBoxElement.offsetLeft - offsetX}px`;
          dialogBoxElement.style.top = `${dialogBoxElement.offsetTop - offsetY}px`;
          x = moveEvent.clientX;
          y = moveEvent.clientY;
        }
      }
      dialogBoxElement.addEventListener('mousemove', onMove);
    }
  };
  const close = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.stopPropagation();
    dispatch(changeDialogBox('None'));
  };
  const Component = menu;
  return (
    <div ref={dialogBoxRef} className="dialog-box">
      <div className="dialog-box__header" onMouseDown={onMouseDown}>
        {title}
        <button className="dialog-box__header__btn" onClick={close}><HiOutlineX /></button>
      </div>
      <div className="dialog-box__content">
        <Component />
      </div>
      <div className="dialog-box__btns">
        <button onClick={() => dispatch(changeOperation(operation))}>Ok</button>
        <button onClick={() => dispatch(changeDialogBox('None'))}>Cancel</button>
      </div>
    </div>
  );
}