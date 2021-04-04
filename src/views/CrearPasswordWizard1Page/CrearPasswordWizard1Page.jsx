import React, { useState } from 'react';
import { WizardStep } from '../commons/WizardStep/WizardStep';
import { useTranslation } from 'react-i18next';

import './CrearPasswordWizard1Page.scss';
import { ProgressStep } from '../commons/ProgreesSteps/ProgreesSteps';
import { routes } from 'config/routes';
import { useHistory } from 'react-router';
import { Check } from '../commons/Check/Check';
import { Button } from '../commons/Button/Button';

export function CrearPasswordWizard1Page() {
  const [edadOk, setEdadOk] = useState(false);
  const [privacidadOk, setPrivacidadOk] = useState(false);

  const { t } = useTranslation();
  let history = useHistory();

  function onClickCancelar() {
    history.push(routes.home);
  }

  function onClickSiguiente() {
    history.push(routes.crearPasswordWizard2);
  }

  return (
    <WizardStep
      header={<ProgressStep total={4} current={1} />}
      leftButton={<Button styleMode="terciary" label={t('Cancelar')} onClick={onClickCancelar} />}
      rightButton={
        <Button
          id="siguienteButton"
          styleMode="secondary"
          disabled={!(edadOk & privacidadOk)}
          onClick={onClickSiguiente}
          label={t('Siguiente')}
        />
      }
    >
      <h1>{t('CrearPasswordWizard1.h1')}</h1>
      <span>{t('CrearPasswordWizard1.bienvenida')}</span>
      <Check
        id="mayorCheck"
        label={t('CrearPasswordWizard1.mayor')}
        value={edadOk}
        onChange={(value) => setEdadOk(value)}
      ></Check>
      <Check
        id="privacidadCheck"
        label={t('CrearPasswordWizard1.privacidad')}
        value={privacidadOk}
        onChange={(value) => setPrivacidadOk(value)}
      ></Check>
    </WizardStep>
  );
}
