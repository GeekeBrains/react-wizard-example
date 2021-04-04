import React from 'react';
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import './Msg.scss';

export function Msg({ styleMode, title, text }) {
  let icon = null;
  if (styleMode === 'ok') {
    icon = <CheckCircleIcon className="Msg-icon" />;
  } else {
    icon = <WarningIcon className="Msg-icon" />;
  }

  return (
    <div className="Msg">
      <div>{icon}</div>
      <div className="Msg-container">
        <p className="Msg-title">{title}</p>
        <p className="Msg-text">{text}</p>
      </div>
    </div>
  );
}
