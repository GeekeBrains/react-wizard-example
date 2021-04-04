import React from 'react';
import './WizardStep.scss';

export function WizardStep({ children }) {
  return (
    <div className="WizarStep">
      <div className="WizarStep-header"></div>
      <div className="WizarStep-body">{children}</div>
      <div className="WizarStep-footer"></div>
    </div>
  );
}
