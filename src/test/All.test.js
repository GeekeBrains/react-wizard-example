/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */

import { getMyBrowser, closeMyBrowser } from '../libs/MyBrowser';
import { crearPasswordWizardInit } from './CrearPasswordWizardInit';
import { crearPasswordWizard1 } from './CrearPasswordWizard1';
import { crearPasswordWizard2 } from './CrearPasswordWizard2';
import { crearPasswordWizard3 } from './CrearPasswordWizard3';

// Test ----------------------------------------------------------------
// Estan configurados en secuencia, no en paralelo.
describe('All Test', () => {
  test('Crea Browser', getMyBrowser, 10000);
  test('CrearPasswordWizard Init', crearPasswordWizardInit, 10000);
  test('CrearPasswordWizard 1', crearPasswordWizard1, 10000);
  test('CrearPasswordWizard 2', crearPasswordWizard2, 10000);
  test('CrearPasswordWizard 3', crearPasswordWizard3, 60000);
  test('Cerrar Browser', closeMyBrowser, 10000);
});
