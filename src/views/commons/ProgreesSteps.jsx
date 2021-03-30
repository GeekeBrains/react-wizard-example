import React from 'react';
import './ProgressSteps.scss';

export function ProgressStep({ total, current }) {
  const steps = [];

  for (let i = 1; i < total + 1; i++) {
    let stepSufix = '';
    if (i === current) {
      stepSufix = '-current';
    } else if (i < current) {
      stepSufix = '-done';
    }

    let sepSufix = '';
    if (i < current) {
      sepSufix = '-done';
    }

    steps.push(
      <>
        <div className={'ProgressSteps-step' + stepSufix} key={'keyStep' + i}>
          <div className={'ProgressSteps-step-text' + stepSufix}>{i}</div>
        </div>
        {i !== total && <div className={'ProgressSteps-step-separator' + sepSufix} />}
      </>,
    );
  }

  return <div className="ProgressSteps">{steps}</div>;
}
