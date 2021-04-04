/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */

// import MyConsole from '../../libs/MyConsole';
import { createRcBrowser, closeRcBrowser } from '../libs/RCBrowserPlaywright';

import testConfig from './testConfig.json';

// Activación desde front
export async function onBoarding() {
  const b = await createRcBrowser();
  // await clientesGetCliente();

  // Login
  const userTest = 'Jesus';
  console.log('token', testConfig.data.users[userTest].token);
  b.newFlow('/OnBoarding');
  await b.goto(`/webapp/?token=${testConfig.data.users[userTest].token}`);
  // window.location.href;
  await b.screenshot('OnBoarding0');

  await b.goto(`/webapp/app/onBoarding?token=${testConfig.data.users[userTest].token}`);
  await b.screenshot('OnBoarding1');
  await b.clickNavigation('#nextButton');

  // Datos
  // await b.type('#name', testConfig.data.users[userTest].name);
  // await b.type('#phone', testConfig.data.users[userTest].phone);
  await b.screenshot('Registro');
  await b.clickNavigation('#nextButton');

  // Añadir grupo
  await b.screenshot('Grupos');
  await b.clickNavigation('#addButton');

  // Poner nombre grupo
  await b.type('#nameInput', 'Grupo ' + Date.now());
  await b.screenshot('Grupo Añadir');
  await b.clickNavigation('#nextButton');

  expect(cliente.estado).toBe('postActivacion');
}
