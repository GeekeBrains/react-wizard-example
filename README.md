# Iniciar la aplicación

Ejecutar en el shell:

> npm install
> npm run start

# Testear

Ejecutar en otro shell:

> npm run test

Notas:

- Los test se lanzan secuencialmente con PlayWright, bridge que permite ejecutar el programa como si fuera un usuario real contra una navegador real.
- Utilizo una librería intermedia llamada libs/MyBrowser qye he creado yo mismo para abstraerme de PlayWright y simplificar algunas cosas.
- Se puede configurar el navegador con el que se quiere probar y la resolución en el /config/myBrowserConfig.json.

# Nomenclatura

He intentado seguir el estilo del proyecto base.

Los componentes se importan al modo con {} para obligar que el nombre al importar coincida con el nombre del componente y evitar errores:

import { DocPrueba } from './views/DocPrueba';

Las páginas llevan el sufijo 'Page'.

# Componentes

Normalmente utilizaría laguna librería de componentes como Material UI, etc, pero entendí que para el proposito de la prueba no tenia sentido.
