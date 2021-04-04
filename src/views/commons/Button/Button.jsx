import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import './Button.scss';

export function Button({ id, disabled, label, onClick, styleMode, showSpinner }) {
  const sufix = styleMode + (disabled ? '-disabled' : '');

  return (
    <button id={id} className={'Button-' + sufix} onClick={() => !disabled && onClick()}>
      <div className="Button-inner">
        {showSpinner && (
          <div className="Button-inner-spinner-container">
            <CircularProgress className="Button-inner-spinner" />
          </div>
        )}
        <span className="Button-inner-text">{label}</span>
      </div>
    </button>
  );
}
