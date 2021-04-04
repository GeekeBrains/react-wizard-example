import React from 'react';
import { useTranslation } from 'react-i18next';

import './HomePage.scss';
import { routes } from 'config/routes';
import { useHistory } from 'react-router';
import { Button } from '../commons/Button/Button';

export function HomePage() {
  const { t } = useTranslation();
  let history = useHistory();

  return (
    <div className="Iniciar">
      <Button
        id="wizardButton"
        styleMode="secondary"
        onClick={() => {
          history.push(routes.crearPasswordWizard1);
        }}
        label={t('Iniciar Wizard')}
      />
    </div>
  );
}
