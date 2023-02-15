import React from 'react';
import { CSSProperties } from 'react';
import { CustomPicker, RGBColor, HSLColor } from 'react-color';
import { Saturation, Hue, Alpha, Checkboard, EditableInput } from 'react-color/lib/components/common';
import './picker.css';

interface ColorPickerFieldsProps {
  hex: string;
  rgb: RGBColor;
  hsl: HSLColor;
  colors: string[],
  onChange: Function;
};

interface ColorPickerStyles {
  picker__controls: CSSProperties;
  input: CSSProperties;
  label: CSSProperties;
  picker__controls__colors: CSSProperties;
  picker__controls__color: CSSProperties;
  picker__controls__hex: CSSProperties;
  picker__controls__red: CSSProperties;
  picker__controls__green: CSSProperties;
  picker__controls__blue: CSSProperties;
  picker__controls__alpha: CSSProperties;
};

function ColorPickerFields({ hex, rgb, hsl, colors, onChange}: ColorPickerFieldsProps) {
  const validateHexCode = (code: string) => {
    return /^[0-9A-Fa-f]{6}$/.test(code) || /^[0-9A-Fa-f]{3}$/.test(code);
  }
  const handleChange = (data, e) => {
    if (data.hex) {
      validateHexCode(data.hex) && onChange({
        hex: data.hex,
        source: 'hex',
      }, e);
    } else if (data.r || data.g || data.b) {
      onChange({
        r: data.r || rgb.r,
        g: data.g || rgb.g,
        b: data.b || rgb.b,
        a: rgb.a,
        source: 'rgb',
      }, e);
    } else if (data.a) {
      if (data.a < 0) {
        data.a = 0;
      } else if (data.a > 100) {
        data.a = 100;
      }
      data.a /= 100
      onChange({
        h: hsl.h,
        s: hsl.s,
        l: hsl.l,
        a: data.a,
        source: 'rgb',
      }, e);
    }
  };

  const gridColumnSettings = {
    gridColumnStart: 1,
    gridColumnEnd: 4,
  };

  const styles: ColorPickerStyles = {
    picker__controls: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
      gridTemplateRows: '1fr 1fr 1fr 1fr 1fr',
      columnGap: '0.25rem',
      rowGap: '0.25rem',
    },
    input: {
      width: '60%',
      // padding: '0.25rem 0.25rem',
      fontSize: '0.6rem',
    },
    label: {
      textAlign: 'center',
      textTransform: 'uppercase',
      fontSize: '0.75rem',
      paddingLeft: '0.125rem',
    },
    picker__controls__colors: {
      gridColumnStart: 4,
      gridColumnEnd: 6,
      gridRowStart: 1,
      gridRowEnd: 6,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: '1fr 1fr 1fr 1fr 1fr',
      columnGap: 'inherit',
      rowGap: 'inherit',
    },
    picker__controls__color: {
      borderRadius: '0.25rem',
      border: '1px ghostwhite solid',
    },
    picker__controls__hex: {
      ...gridColumnSettings,
      gridRowStart: 1,
      gridRowEnd: 2,
    },
    picker__controls__red: {
      ...gridColumnSettings,
      gridRowStart: 2,
      gridRowEnd: 3,
    },
    picker__controls__green: {
      ...gridColumnSettings,
      gridRowStart: 3,
      gridRowEnd: 4,
    },
    picker__controls__blue: {
      ...gridColumnSettings,
      gridRowStart: 4,
      gridRowEnd: 5,
    },
    picker__controls__alpha: {
      ...gridColumnSettings,
      gridRowStart: 5,
      gridRowEnd: 6,
    },
  };

  return (
    <div className="picker__controls" style={styles.picker__controls}>
      <div className="picker__controls__hex" style={styles.picker__controls__hex}>
          <EditableInput 
            label="hex" 
            value={hex.replace('#', '')} 
            style={{input: styles.input, label: styles.label}} 
            onChange={handleChange} />
      </div>
      <div className="picker__controls__colors" style={styles['picker__controls__colors']}>
        {colors.map((color) => (
          <div className="picker__controls__color" style={{...styles.picker__controls__color, backgroundColor: `${color}`}}>
          </div>
        ))}
      </div>
      <div className="picker__controls__red" style={styles.picker__controls__red}>
          <EditableInput 
            label="r" 
            value={rgb.r} 
            style={{input: styles.input, label: styles.label}} 
            onChange={handleChange} />
      </div>
        <div className="picker__controls__green" style={styles.picker__controls__green}>
          <EditableInput 
            label="g" 
            value={rgb.g} 
            style={{input: styles.input, label: styles.label}} 
            onChange={handleChange} />
        </div>
        <div className="picker__controls__blue" style={styles.picker__controls__blue}>
          <EditableInput 
            label="b" 
            value={rgb.b} 
            style={{input: styles.input, label: styles.label}} 
            onChange={handleChange} />
        </div>
        <div className="picker__controls__alpha" style={styles.picker__controls__alpha}>
          <EditableInput 
            label="a" 
            value={rgb.a} 
            style={{input: styles.input, label: styles.label}} 
            onChange={handleChange} />
        </div>
    </div>
  );
}

function ColorPicker(props: any) {
  return (
    <div className="picker">
      <div className="picker__saturation">
        <Saturation {...props} />
      </div>
      <div className="picker__alpha">
        <Checkboard white="#fff" size={4} />
        <Alpha {...props} />
      </div>
      <div className="picker__hue">
        <Hue {...props} />
      </div>
      <ColorPickerFields 
        hex={props.hex}
        rgb={props.rgb}
        hsl={props.hsl}
        colors={props.colors}
        onChange={props.onChange} />
    </div>
  );
}

export default CustomPicker(ColorPicker);