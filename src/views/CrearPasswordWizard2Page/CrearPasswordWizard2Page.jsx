import React from 'react';
import { WizardStep } from '../commons/WizardStep/WizardStep';
import { ReactComponent as CabezaSvg } from '../../assets/img/group.svg';
import { ReactComponent as CajaFuerteSvg } from '../../assets/img/group-3.svg';
import { useTranslation } from 'react-i18next';

import './CrearPasswordWizard2Page.scss';
import { ProgressStep } from '../commons/ProgreesSteps/ProgreesSteps';
import { routes } from 'config/routes';
import { useHistory } from 'react-router';
import { Button } from '../commons/Button/Button';

export function CrearPasswordWizard2Page() {
  const { t } = useTranslation();
  let history = useHistory();

  function onClickCancelar() {
    history.push(routes.home);
  }

  function onClickSiguiente() {
    history.push(routes.crearPasswordWizard3);
  }

  return (
    <WizardStep
      header={<ProgressStep total={4} current={2} />}
      leftButton={<Button styleMode="terciary" label={t('Cancelar')} onClick={onClickCancelar} />}
      rightButton={
        <Button
          id="siguienteButton"
          styleMode="secondary"
          onClick={onClickSiguiente}
          label={t('Siguiente')}
        />
      }
    >
      <h1>{t('CrearPasswordWizard2.h1')}</h1>
      <div className="CrearPasswordWizard2Page-imagenesBlock">
        <div>
          <CabezaSvg />
          <div>{t('CrearPasswordWizard2.Cabeza')}</div>
        </div>
        <div>
          <CajaFuerteSvg />
          <div>{t('CrearPasswordWizard2.CajaFuerte')}</div>
        </div>
      </div>
      <h2>{t('CrearPasswordWizard2.ComoH2')}</h2>
      <div>{t('CrearPasswordWizard2.Como')}</div>
      <h2>{t('CrearPasswordWizard2.QueH2')}</h2>
      <div>{t('CrearPasswordWizard2.Que')}</div>
    </WizardStep>
  );
}
