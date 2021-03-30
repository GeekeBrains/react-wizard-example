import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { routes } from './config/routes';
import { DocPruebaPage } from './views/DocPrueba/DocPruebaPage';
import { CrearPasswordWizard1Page } from './views/CrearPasswordWizard/CrearPasswordWizard1Page';
import { CrearPasswordWizard2Page } from './views/CrearPasswordWizard/CrearPasswordWizard2Page';
import { CrearPasswordWizard3Page } from './views/CrearPasswordWizard/CrearPasswordWizard3Page';

export function App() {
  return (
    <Router>
      <Switch>
        <Route path={routes.docPrueba} component={DocPruebaPage} />
        <Route path={routes.crearPasswordWizard1} component={CrearPasswordWizard1Page} />
        <Route path={routes.crearPasswordWizard2} component={CrearPasswordWizard2Page} />
        <Route path={routes.crearPasswordWizard3} component={CrearPasswordWizard3Page} />
        <Route component={CrearPasswordWizard1Page} />
      </Switch>
    </Router>
  );
}
