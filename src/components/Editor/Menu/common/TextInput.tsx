import React from 'react';
import '../menu-section.css';

interface TextInputProps {
  label: string;
  id: string;
  value: string;
  minLength: number;
  maxLength: number;
  disabled?: boolean;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextInput(props: TextInputProps) {
  return (
    <div className="input__container">
      <label htmlFor={props.id} className="input__container__label">{props.label}</label>
      <input type="text" name={props.id} id={props.id} 
        className="input__container__input" disabled={props.disabled ?? false} 
        minLength={props.minLength} maxLength={props.maxLength} 
        value={props.value} onChange={props.onChange} />
    </div>
  );
}