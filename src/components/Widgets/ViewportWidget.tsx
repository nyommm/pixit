import React from 'react';
import './widget.css';

interface ViewportWidgetProps {
  render: () => JSX.Element;
  widgetClass: string;
  widgetName: string;
};

// this component will be used to eventually make the widgets collpsible, movable etc etc
function ViewportWidget({ render, widgetClass, widgetName }: ViewportWidgetProps) {
  return (
    <div className={`widget ${widgetClass}`}>
      <div className="widget__topbar">
        {widgetName}
        <span className="widget__topbar__btn">▲</span>
      </div>
      {render()}
    </div>
  );
}

export default ViewportWidget;