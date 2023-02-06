import React, { ChangeEvent } from 'react';

// Currently only hex colors are supported but eventually this will be switched to react-color
function colorSelect(color: string, setColor: Function) {
  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setColor(evt.target.value);
  };
  return () => (
    <>
      <label>Color: 
        <input type="color" value={color} onChange={onChange} />
      </label>
    </>
  );
}

export default colorSelect;