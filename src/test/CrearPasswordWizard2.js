import { getMyBrowser } from '../libs/MyBrowser';

export async function crearPasswordWizard2() {
  const b = await getMyBrowser();

  await b.screenshot('Step2');

  await b.click('#siguienteButton');
  expect(await b.getUrl()).toBe('/crearPasswordWizard3');
}
