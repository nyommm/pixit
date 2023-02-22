import React, { ChangeEvent, useState } from 'react';
import { RGBColor, ColorResult } from 'react-color';
import './widget.css';

import ColorPicker from './ColorPicker/ColorPicker';

// Currently only hex colors are supported but eventually this will be switched to react-color
function colorSelect(color: RGBColor, setColor: Function) {
  const [colors, setColors] = useState([] as string[]);
  const handleChange = (result: ColorResult) => {
    setColor(result.rgb);
  };
  const handleChangeComplete = (result: ColorResult) => {
    const copy = colors.slice();
    if (copy.length >= 20) copy.pop();
    if (copy.length == 0 || result.hex != copy[0])
      setColors([result.hex, ...copy]);
  };
  return () => (
    <ColorPicker 
      color={color}
      colors={colors}
      onChange={handleChange}
      onChangeComplete={handleChangeComplete} />
  );
}

export default colorSelect;