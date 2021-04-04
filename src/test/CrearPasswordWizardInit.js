import { getMyBrowser } from '../libs/MyBrowser';

// Activación desde front
export async function crearPasswordWizardInit() {
  const b = await getMyBrowser();

  b.newFlow('/CreatePasswordWizard');
  await b.goto('/');
  await b.screenshot('home');

  const element = await b.getElementBySelector('#wizardButton');

  expect(element).toBeDefined();

  await b.click('#wizardButton');
}
