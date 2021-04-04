import React from 'react';
import './WizardStep.scss';

export function WizardStep({ header, children, leftButton, rightButton }) {
  return (
    <div className="WizarStep">
      {header && <div className="WizarStep-header">{header}</div>}
      <div className="WizarStep-body">{children}</div>
      <div className="WizarStep-footer">
        <div>{leftButton && <div className="WizarStep-footer-left">{leftButton}</div>}</div>
        <div>{rightButton && <div className="WizarStep-footer-right">{rightButton}</div>}</div>
      </div>
    </div>
  );
}
