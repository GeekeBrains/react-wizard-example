import { routes } from 'config/routes';
import React from 'react';
import { useHistory, useLocation } from 'react-router';
import { ProgressStep } from 'views/commons/ProgreesSteps/ProgreesSteps';
import { WizardStep } from 'views/commons/WizardStep/WizardStep';

import { Msg } from '../commons/Msg/Msg';
import { Button } from '../commons/Button/Button';
import { useTranslation } from 'react-i18next';

export function CrearPasswordWizard4Page({ props }) {
  let params = useLocation();
  let history = useHistory();
  const { t } = useTranslation();

  function onClickOk() {
    history.push(routes.home);
  }

  function onClickKo() {
    history.push(routes.crearPasswordWizard3);
  }

  return (
    <WizardStep
      header={<ProgressStep total={4} current={4} />}
      rightButton={
        <>
          {params.status === 'ok' && (
            <Button
              id="siguienteButton"
              styleMode="primary"
              label={t('CrearPasswordWizard4.ButtonOk')}
              onClick={onClickOk}
            />
          )}
          {params.status === 'ko' && (
            <Button
              id="siguienteButton"
              styleMode="primary"
              label={t('CrearPasswordWizard4.ButtonKo')}
              onClick={onClickKo}
            />
          )}
        </>
      }
    >
      {params.status === 'ok' && (
        <Msg
          styleMode="ok"
          title={t('CrearPasswordWizard4.TitleOk')}
          text={t('CrearPasswordWizard4.TextOk')}
        />
      )}
      {params.status === 'ko' && (
        <Msg
          styleMode="warning"
          title={t('CrearPasswordWizard4.TitleKo')}
          text={t('CrearPasswordWizard4.TextKo')}
        />
      )}
    </WizardStep>
  );
}
