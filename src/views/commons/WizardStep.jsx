import React from 'react';
import { ProgressStep } from './ProgreesSteps';
import './WizardStep.scss';

export function WizardStep({ children }) {
  return (
    <div className="WizarStep">
      <div className="WizarStep-header">
        <ProgressStep total={3} current={2} />
      </div>
      <div className="WizarStep-body">{children}</div>
      <div className="WizarStep-footer"></div>
    </div>
  );
}
