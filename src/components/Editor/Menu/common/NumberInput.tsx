import React from 'react';
import '../menu-section.css';

interface NumberInputProps {
  label: string;
  id: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function NumberInput(props: NumberInputProps) {
  return (
    <div className="num-input__container">
      <label htmlFor={props.id} className="num-input__container__label">{props.label}</label>
      <input type="number" name={props.id} id={props.id} 
        className="num-input__container__input" 
        min={props.min} max={props.max} step={props.step} 
        value={props.value} onChange={props.onChange} />
    </div>
  );
}