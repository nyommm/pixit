import React from 'react';
import { useRef } from 'react';
import './widget.css';

interface ViewportWidgetProps {
  render: () => JSX.Element;
  widgetClass: string;
  widgetName: string;
};

// this component will be used to eventually make the widgets collpsible, movable etc etc
function ViewportWidget({ render, widgetClass, widgetName }: ViewportWidgetProps) {
  const widgetRef = useRef(null);
  const onMouseDown = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    evt.stopPropagation();
    if (widgetRef.current == null) return;
    const widgetElement = widgetRef.current as HTMLDivElement;
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
  }
  return (
    <div ref={widgetRef} className={`widget ${widgetClass}`}>
      <div className="widget__topbar"  onMouseDown={onMouseDown}>
        {widgetName}
        <span className="widget__topbar__btn">▲</span>
      </div>
      {render()}
    </div>
  );
}

export default ViewportWidget;