import React from 'react';
import './Check.scss';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

export function Check({ id, label, value, onChange }) {
  return (
    <div id={id} className="Check" onClick={() => onChange(!value)}>
      <div className="Check-input">{value ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}</div>
      <div className="Check-label">{label}</div>
    </div>
  );
}
