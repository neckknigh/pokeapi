Hints
- Esta aplicación está escrita en NodeJS.
- Organización de código inspirada en DDD y Clean Architecture centrada en la escalabilidad de la base de código.
- Usa Nodemon para recargar automáticamente el servidor después de un cambio de archivo cuando esté en modo de desarrollo, lo que hace que el desarrollo sea más rápido y fácil.
- Usa Express para el enrutamiento de solicitudes y middlewares. Hay algunos middlewares esenciales para las API web que ya están configuradas, como body-parser, compresión, CORS y método-override.
- El conjunto de pruebas utiliza Mocha / Chai y está preparado para ejecutar pruebas unitarias.

En lugar de las carpetas clásicas de controladores / modelos / servicios, ahora tenemos capas dentro de la carpeta src. Cada una de las capas de la carpeta está definida por un espacio de nombres con respecto a la preocupación de lo que trata (como pokemons, errors, etc.):

Estructura de carpetas:

Input interfaces layer (interfaces folder):

Esta carpeta contiene todos los puntos de entrada para la aplicación. Desde el principio, aquí es donde estarán los controladores (dentro de la carpeta interfaces / http).

Application layer (app folder):

La capa de aplicación es responsable de mediar entre las interfaces de entrada y su dominio.

Domain layer (domain folder):

Aquí definirá las clases del dominio, funciones y servicios que componen el modelo de dominio. Todas las reglas de negocio deben declararse en esta capa para que la capa de aplicación pueda usarla para componer sus casos de uso.

Infrastructure layer (infra folder):

Esta es la más baja de las capas. En la capa infra, tendrá la comunicación con lo que está fuera de la aplicación, como la base de datos, servicios de correo y comunicación directa con frameworks.

Comandos:

- npm run dev: ejecutar la aplicación en modo desarrollo
- npm start: ejecutar la aplicación en producción.
- npm run test:unit : ejecutar el set de pruebas unitarias.

Endpoints:

/api/pokemons: 

- Muestra el listado de pokemones publicado en la pokeapi.
- Se utiliza un wrapper que garantiza la "fair use policy" utilizando caching con el objetivo de evitar el baneo de IP.
- Se muestran todos los pokemones disponibles.

/api/newspaper/pokemonfights/lastresult

- Muestra el ultimo resultado de batallas pokemon
- Esta api deberia ser externa. Deberia ser del newspaper. Pero para efectos de la prueba se integra en la aplicación.

/api/pokemonfights/minimumfights 

/api/pokemonfights/minimumfights?pokemonresultlist=squirtle,bulbasaur,charmander,caterpie,weedle,pidgey,kakuna,beedrill

- Permite obtener el minimo número de peleas necesarias para llegar al resultado pasado como query parameter al api, o en caso que no, se utiliza el publicado en /api/newspaper/pokemonfights/lastresult.

- En caso que el resultado no cumpla con las reglas, se mostrará un mensaje de error.





