import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { routes } from './config/routes';
import { HomePage } from './views/HomePage/HomePage';
import { DocPruebaPage } from './views/DocPruebaPage/DocPruebaPage';
import { CrearPasswordWizard1Page } from './views/CrearPasswordWizard1Page/CrearPasswordWizard1Page';
import { CrearPasswordWizard2Page } from './views/CrearPasswordWizard2Page/CrearPasswordWizard2Page';
import { CrearPasswordWizard3Page } from './views/CrearPasswordWzard3Page/CrearPasswordWizard3Page';
import { CrearPasswordWizard4Page } from './views/CrearPasswordWzard4Page/CrearPasswordWizard4Page';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import locale from './locale/es.json';

// Configuración traductor
i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: 'es',
  resources: {
    es: {
      translation: locale,
    },
  },
});

export function App() {
  return (
    <React.StrictMode>
      <I18nextProvider i18n={i18next}>
        <Router>
          <Switch>
            <Route path={routes.home} component={HomePage} />
            <Route path={routes.docPrueba} component={DocPruebaPage} />
            <Route path={routes.crearPasswordWizard1} component={CrearPasswordWizard1Page} />
            <Route path={routes.crearPasswordWizard2} component={CrearPasswordWizard2Page} />
            <Route path={routes.crearPasswordWizard3} component={CrearPasswordWizard3Page} />
            <Route path={routes.crearPasswordWizard4} component={CrearPasswordWizard4Page} />
            <Route>
              {/* Default route*/}
              <Redirect to={routes.home} />
            </Route>
          </Switch>
        </Router>
      </I18nextProvider>
    </React.StrictMode>
  );
}
