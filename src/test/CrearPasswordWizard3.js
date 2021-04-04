import { getMyBrowser } from '../libs/MyBrowser';

export async function crearPasswordWizard3() {
  const b = await getMyBrowser();
  const passOk = 'Qwerty1234';
  const passKo = 'qwerty';
  const passOkBackKo = 'pruebaKO123';

  const pistaLarga =
    'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.';
  const pistaCorta = 'Lorem Ipsum.';

  await b.screenshot('Step3');

  // Inicialmente boton siguiente deshabilitado
  await b.click('#siguienteButton');
  expect(await b.getUrl()).toBe('/crearPasswordWizard3');

  // Password incorrecto, no avanza
  await b.type('#passwordInput-input', passKo);
  await b.screenshot('Step3-passKo');
  await b.click('#siguienteButton');
  expect(await b.getUrl()).toBe('/crearPasswordWizard3');

  // Password distinto, no avanza
  await b.type('#passwordInput-input', passOk);
  await b.type('#password2Input-input', passKo);
  await b.screenshot('Step3-pass-distintos');
  await b.click('#siguienteButton');
  expect(await b.getUrl()).toBe('/crearPasswordWizard3');

  // Limpia
  await b.type('#passwordInput-input', '');
  await b.type('#password2Input-input', '');
  await b.screenshot('Step3-limpia');

  // Pista larga, no avanza
  await b.type('#passwordInput-input', passOk);
  await b.type('#password2Input-input', passOk);
  await b.type('#pistaInput-input', pistaLarga);
  await b.screenshot('Step3-pista-larga');
  await b.click('#siguienteButton');
  expect(await b.getUrl()).toBe('/crearPasswordWizard3');

  // Limpia
  await b.type('#passwordInput-input', '');
  await b.type('#password2Input-input', '');
  await b.type('#pistaInput-input', '');
  await b.screenshot('Step3-limpia');

  // Todo ok, avanza para backko
  await b.type('#passwordInput-input', passOkBackKo);
  await b.type('#password2Input-input', passOkBackKo);
  await b.type('#pistaInput-input', pistaCorta);
  await b.screenshot('Step3-passOk-backKo');
  // Llamada al back
  await b.clickAwaitForElement('#siguienteButton', '.Msg');
  await b.screenshot('Step4-passOk-backKo');

  // Vuelve a paso 3
  await b.click('#siguienteButton');
  expect(await b.getUrl()).toBe('/crearPasswordWizard3');
  await b.screenshot('Step2-despues-backKo');

  // Todo ok, avanza
  await b.type('#passwordInput-input', passOk);
  await b.type('#password2Input-input', passOk);
  await b.type('#pistaInput-input', pistaCorta);
  await b.screenshot('Step3-passOk-backOk');
  // Llamada al back
  await b.clickAwaitForElement('#siguienteButton', '.Msg');
  await b.screenshot('Step4-passOk-backOk');
  expect(await b.getUrl()).toBe('/crearPasswordWizard4');

  // Vuelve a home
  await b.click('#siguienteButton');
  expect(await b.getUrl()).toBe('/home');
  await b.screenshot('Terminó en home');
}
