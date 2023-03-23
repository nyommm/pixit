import React from 'react';
import { useState, useRef } from 'react';
import './widget.css';

interface ViewportWidgetProps {
  render: () => JSX.Element | null;
  widgetClass: string;
  widgetName: string;
};

// this component will be used to eventually make the widgets collpsible, movable etc etc
function ViewportWidget({ render, widgetClass, widgetName }: ViewportWidgetProps) {
  const [hidden, setHidden] = useState(false);
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
  };
  const toggleWidget = (evt: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    evt.stopPropagation();
    setHidden(!hidden);
  };
  return (
    <div ref={widgetRef} className={`widget ${widgetClass}`}>
      <div className="widget__topbar"  onMouseDown={onMouseDown}>
        {widgetName}
        <span className="widget__topbar__btn" onClick={toggleWidget}>
          {hidden ? '▼' : '▲'}
        </span>
      </div>
      {!hidden && render()}
    </div>
  );
}

export default ViewportWidget;