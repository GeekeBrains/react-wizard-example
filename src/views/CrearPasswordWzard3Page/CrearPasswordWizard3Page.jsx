import React, { useReducer, useState } from 'react';
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

export const SET = 'SET';

// Component ----------------------------
export function CrearPasswordWizard3Page() {
  const [showSpinner, setShowSpinner] = useState(false);
  const { t } = useTranslation();
  let history = useHistory();

  // Control State --------------------
  const formInitialState = {
    formControlOk: false,
    password: { value: '', error: t('CampoObligatorio') },
    password2: { value: '', error: t('CampoObligatorio') },
    pista: { value: '', error: '' },
  };

  const formReducer = (state, dispatch) => {
    console.log('formReducer', { state, dispatch });
    switch (dispatch.type) {
      case SET:
        const field = Object.keys(dispatch.data)[0];
        const value = dispatch.data[field];
        let error = formCheckField(field, value, state);

        let ret = {
          ...state,
          // Actualiza el estado del campo
          [field]: { value, error },
        };
        ret = {
          ...ret,
          // TODO: Para mas campos hacer una funcion
          formControlOk:
            ret.password.error === '' && ret.password2.error === '' && ret.pista.error === '',
        };
        console.log('red', { ret });
        console.log('reducer ret', ret);
        return ret;

      default:
        return state;
    }
  };

  // TODO: Mejora posible, controlar algunos mensajes solo al perder el foco o si tiene el foco el campo.
  // TODO: Mejora posible, sacar la funcion del componente, pero habría que inyectarle el traductor.
  const formCheckField = (field, value, formState) => {
    let error = '';
    const regexpPassword = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,24}$/;
    console.log({ field, value, formState });
    switch (field) {
      case 'password':
        console.log({ value, exp: regexpPassword.test(value) });
        if (value === '') {
          error = t('CampoObligatorio');
        } else {
          if (!regexpPassword.test(value)) {
            error = t('CrearPasswordWizard3.PasswordFailed');
          } else if (formState.password2.value !== '') {
            if (value === formState.password2.value) {
              formState.password2.error = '';
            } else {
              error = t('CrearPasswordWizard3.PasswordIguales');
            }
          }
        }
        break;

      case 'password2':
        if (value === '') {
          error = t('CampoObligatorio');
        } else {
          if (!regexpPassword.test(value)) {
            error = t('CrearPasswordWizard3.PasswordFailed');
          } else if (formState.password.value !== '') {
            if (value === formState.password.value) {
              formState.password.error = '';
            } else {
              error = t('CrearPasswordWizard3.PasswordIguales');
            }
          }
        }
        break;

      case 'pista':
        if (value.length > 256) {
          error = t('CrearPasswordWizard3.PistaFailed');
        }
        break;

      default:
        console.error('formCheckField, Campo no contemplado', field);
    }

    return error;
  };

  const [formState, formDispatch] = useReducer(formReducer, formInitialState);

  // Eventos del form ------------------------
  function onClickCancelar() {
    history.push(routes.home);
  }

  async function onClickSiguiente() {
    setShowSpinner(true);
    submitForm(formState.password.value, formState.password2.value, formState.pista.value).then(
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

  // Render -----------------------------
  return (
    <WizardStep
      header={<ProgressStep total={4} current={3} />}
      leftButton={<Button styleMode="terciary" label={t('Cancelar')} onClick={onClickCancelar} />}
      rightButton={
        <Button
          id="siguienteButton"
          styleMode="secondary"
          disabled={!formState.formControlOk}
          onClick={onClickSiguiente}
          label={t('Siguiente')}
          showSpinner={showSpinner}
        />
      }
    >
      <h1>{t('CrearPasswordWizard3.h1')}</h1>
      {t('CrearPasswordWizard3.Primero')}
      <div className="CrearPasswordWizard3-passwordBlock">
        <InputPassword
          id="passwordInput"
          label={t('CrearPasswordWizard3.Password')}
          value={formState.password.value}
          error={formState.password.error}
          onChange={(value) => formDispatch({ type: SET, data: { password: value } })}
        />
        <InputPassword
          id="password2Input"
          label={t('CrearPasswordWizard3.Password2')}
          value={formState.password2.value}
          error={formState.password2.error}
          onChange={(value) => formDispatch({ type: SET, data: { password2: value } })}
        />
      </div>
      {formState.password.touched && formState.password.hasError && (
        <p className="AlertText">{formState.password.error}</p>
      )}
      {t('CrearPasswordWizard3.Tambien')}
      <Input
        id="pistaInput"
        label={t('CrearPasswordWizard3.Pista')}
        value={formState.pista.value}
        error={formState.pista.error}
        onChange={(value) => formDispatch({ type: SET, data: { pista: value } })}
      />
    </WizardStep>
  );
}
