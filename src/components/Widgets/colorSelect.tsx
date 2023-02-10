import React, { ChangeEvent } from 'react';
import './widget.css';

// Currently only hex colors are supported but eventually this will be switched to react-color
function colorSelect(color: string, setColor: Function) {
  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setColor(evt.target.value);
  };
  return () => (
      <div className="widget__item">
        <input type="color" value={color} onChange={onChange} />
      </div>
  );
}

export default colorSelect;