import React from 'react';
import './Input.scss';

export function Input({ id, label, value, error, onChange }) {
  return (
    <div id={id} className="Input">
      <span className="Input-label">{label}</span>
      <div>
        <input
          id={id + '-input'}
          className="Input-input"
          onChange={(event) => onChange(event.target.value)}
          value={value}
        />
        {error && <p className="AlertText">{error}</p>}
      </div>
    </div>
  );
}
