import React, { useState } from 'react';
import { WizardStep } from '../commons/WizardStep/WizardStep';
import { useTranslation } from 'react-i18next';

import './CrearPasswordWizard3Page.scss';
import { ProgressStep } from '../commons/ProgreesSteps/ProgreesSteps';
import { routes } from 'config/routes';
import { useHistory } from 'react-router';
import { InputPassword } from 'views/commons/InputPassword/InputPassword';
import { Input } from 'views/commons/Input/Input';
import { Button } from '../commons/Button/Button';
import { submitForm } from '../../services/api';
import { responsesTypes } from '../../config/responsesTypes';

const regexpPassword = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,24}$/;

export function CrearPasswordWizard3Page() {
  const [pista, setPista] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [showSpinner, setShowSpinner] = useState(false);

  const { t } = useTranslation();
  let history = useHistory();

  function onClickCancelar() {
    history.push(routes.home);
  }

  async function onClickSiguiente() {
    setShowSpinner(true);
    submitForm(password, password2, pista).then(
      (resolve) => {
        setShowSpinner(false);
        console.log({ resolve });
        if (resolve.status === responsesTypes.ok) {
          history.push({
            pathname: routes.crearPasswordWizard4,
            status: 'ok',
          });
        } else {
          console.error('Respuesta del back no contemplada: ', resolve.status);
        }
      },
      (reject) => {
        setShowSpinner(false);
        console.error({ reject });
        if (reject.status === responsesTypes.ko) {
          history.push({
            pathname: routes.crearPasswordWizard4,
            status: 'ko',
          });
        } else {
          console.error('Respuesta del back no contemplada: ', reject.status);
        }
      },
    );
  }

  return (
    <WizardStep
      header={<ProgressStep total={4} current={3} />}
      leftButton={<Button styleMode="terciary" label={t('Cancelar')} onClick={onClickCancelar} />}
      rightButton={
        <Button
          id="siguienteButton"
          styleMode="secondary"
          disabled={!isOk(password, password2, pista)}
          onClick={onClickSiguiente}
          label={t('Siguiente')}
          showSpinner={showSpinner}
        />
      }
    >
      <h1>{t('CrearPasswordWizard3.h1')}</h1>
      {t('CrearPasswordWizard3.Primero')}
      <div className="CrearPasswordWizard2-passwordBlock">
        <InputPassword
          id="passwordInput"
          label={t('CrearPasswordWizard3.Password')}
          value={password}
          onChange={(value) => setPassword(value)}
        />
        <InputPassword
          id="password2Input"
          label={t('CrearPasswordWizard3.Password2')}
          value={password2}
          onChange={(value) => setPassword2(value)}
        />
      </div>
      {showAlertPassword(password, password2) && (
        <p className="AlertText">
          La contraseña debe ser de entre 8 y 24 caracteres y al menos 1 número y una mayúscula.
        </p>
      )}
      {t('CrearPasswordWizard3.Tambien')}
      <Input
        id="pistaInput"
        label={t('CrearPasswordWizard3.Pista')}
        onChange={(value) => setPista(value)}
        value={pista}
      />
      {pista.length > 255 && (
        <p className="AlertText">La pista debe tener menos de 255 caracteres.</p>
      )}
    </WizardStep>
  );
}

function isOk(password, password2, pista) {
  let ret = false;
  if (password === password2 && pista.length < 256) {
    ret = regexpPassword.test(password);
  }
  return ret;
}

function showAlertPassword(password, password2) {
  let ret = false;
  if (password !== '') {
    ret = !regexpPassword.test(password);
  }
  return ret;
}
