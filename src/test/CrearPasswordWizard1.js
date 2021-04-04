import { getMyBrowser } from '../libs/MyBrowser';

export async function crearPasswordWizard1() {
  const b = await getMyBrowser();

  await b.screenshot('Step1');

  // Inicialmente boton siguiente deshabilitado
  const element = await b.getElementBySelector('#siguienteButton');
  expect(element).toBeDefined();
  await b.click('#siguienteButton');
  // No avanza haciendo click
  expect(await b.getUrl()).toBe('/crearPasswordWizard1');

  await b.click('#mayorCheck');
  await b.click('#privacidadCheck');
  await b.screenshot('Step2-con-checks');
  await b.click('#siguienteButton');
  expect(await b.getUrl()).toBe('/crearPasswordWizard2');
}
