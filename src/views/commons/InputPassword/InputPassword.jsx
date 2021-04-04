import React, { useState } from 'react';
import './InputPassword.scss';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

export function InputPassword({ id, label, value, error, onChange }) {
  const [visibleIcon, setVisibleIcon] = useState(true);

  return (
    <div id={id} className="InputPassword">
      <span className="InputPassword-label">{label}</span>
      <div>
        <input
          id={id + '-input'}
          className="InputPassword-input"
          type={visibleIcon ? 'password' : ''}
          onChange={(event) => onChange(event.target.value)}
          value={value}
        />
        <div className="InputPassword-endIcon" onClick={() => setVisibleIcon(!visibleIcon)}>
          {visibleIcon ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </div>
        {error && <p className="AlertText">{error}</p>}
      </div>
    </div>
  );
}
