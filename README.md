# Iniciar la aplicación

Ejecutar en el shell:

> npm install
> npm run start

# Testear

Ejecutar en otro shell:

> npm run test

Notas:

- Los test se lanzan secuencialmente y se enlazan con PlayWright, un bridge que maneja el navegador y permite ejecutar el programa como si fuera un usuario real en un navegador real.
- Se utiliza una librería intermedia llamada libs/MyBrowser de creación propia para abstraerse de PlayWright y simplificar algunas cosas.
- Se puede configurar el navegador con el que se quiere probar y la resolución en el /config/myBrowserConfig.json.

# Nomenclatura

Se ha intentado seguir el estilo del proyecto base.

Los componentes se importan al modo con {} para obligar que el nombre al importar coincida con el nombre del componente y evitar errores:

import { DocPrueba } from './views/DocPrueba';

Las páginas llevan el sufijo 'Page'.

# Componentes

Normalmente se habría utilizado alguna librería de componentes como Material UI, etc, pero para el proposito de la prueba se han evitado.
