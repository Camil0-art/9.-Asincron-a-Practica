# Matriz Detallada de Casos de Prueba por Ejercicio

## Ejercicio 1: Tareas Pendientes (`modules/TareasPendientes.js`)

### + Buen Camino (Camino Feliz)
* **Datos de prueba:** Petición exitosa a `https://jsonplaceholder.typicode.com/todos`.
* **Procedimiento:** Seleccionar opción `1` en el menú principal con red activa.
* **Resultado esperado:** Iteración limpia de las tareas con `completed: false`. Agrupación visual por `userId` mostrando `:) USUARIO X:` y sangría `;( titulo_tarea`.

### - Mal Camino (Escenarios de Fallo Controlado)
* **Caso 1.1: Falla de red / Desconexión.**
  * **Datos:** Red inactiva o caída de servidor.
  * **Procedimiento:** Desconectar la interfaz de red y seleccionar la opción `1`.
  * **Resultado esperado:** Captura mediante `.catch()`. Impresión limpia: `Error al obtener datos: TypeError: fetch failed`. La CLI no colapsa.
* **Caso 1.2: Endpoint alterado o corrupto (404/500).**
  * **Datos:** URL con estructura inválida (ej. `/todos_invalid`).
  * **Procedimiento:** Ejecutar la petición con el endpoint corrupto.
  * **Resultado esperado:** Captura en `.catch()` reportando el fallo HTTP o error de parseo JSON sin detener el menú `app.js`.

---

## Ejercicio 2: Usuarios y Álbumes (`modules/UsuarioAlbumes.js`)

### + Buen Camino (Camino Feliz)
* **Datos de prueba:** Username válido (ej. `Bret` o `Antonette`).
* **Procedimiento:** Seleccionar opción `2`, ingresar `Bret` y presionar Enter.
* **Resultado esperado:** Muestra encabezado del usuario (Nombre, Email, Compañía), lista los álbumes encontrados y un máximo de 3 fotos por álbum (`.slice(0, 3)`) con su título y URL.

### - Mal Camino (Escenarios de Fallo Controlado)
* **Caso 2.1: Usuario no existente.**
  * **Datos:** `UsuarioInexistente999` o `12345`.
  * **Procedimiento:** Ingresar un username que no exista en JSONPlaceholder.
  * **Resultado esperado:** Validación `if (users.length === 0)` activa. Retorna la respuesta limpia `"Usuario no encontrado."` y regresa al menú sin evaluar álbumes ni lanzar errores.
* **Caso 2.2: Entrada vacía o de solo espacios.**
  * **Datos:** `"   "` (Espacios en blanco) o presionar Enter directamente.
  * **Procedimiento:** Ingresar espacios al solicitar el username.
  * **Resultado esperado:** `.trim()` limpia la entrada resultando en cadena vacía `""`, la API retorna `[]` y se muestra `"Usuario no encontrado."` de forma controlada.
* **Caso 2.3: Falla de red durante la resolución de promesas paralelas.**
  * **Datos:** Desconexión de internet tras ingresar el username (o durante `Promise.all`).
  * **Procedimiento:** Simular latencia o corte de red al consultar fotos.
  * **Resultado esperado:** El bloque `try/catch` intercepta la falla en `Promise.all` e imprime `Error al consultar los datos: [Mensaje de error]`.

---

## Ejercicio 3: Búsqueda de Posts y Comentarios (`modules/BusquedaPosts.js`)

### + Buen Camino (Camino Feliz)
* **Datos de prueba:** Fragmento de texto válido (ej. `sunt` o `qui`).
* **Procedimiento:** Seleccionar opción `3`, ingresar el término y presionar Enter.
* **Resultado esperado:** Filtro mediante `.filter()` e `.includes()`. Imprime el título y contenido del post, seguido de la lista de comentarios asociados (Nombre, Email, Body).

### - Mal Camino (Escenarios de Fallo Controlado)
* **Caso 3.1: Término de búsqueda sin coincidencias.**
  * **Datos:** `TextoInexistenteXYZ_999`.
  * **Procedimiento:** Buscar un término que no exista en ningún título de post.
  * **Resultado esperado:** Validación `if (encontrados.length === 0)` activa. Imprime `"- No se encontró ningún post con ese nombre."` y retorna al menú.
* **Caso 3.2: Entrada con caracteres especiales.**
  * **Datos:** `!@#$%^&*()`.
  * **Procedimiento:** Ingresar símbolos especiales en la entrada.
  * **Resultado esperado:** El filtro `.includes()` evalúa la cadena sin romper la ejecución, retornando 0 coincidencias y saliendo limpiamente.
* **Caso 3.3: Caída de red durante el ciclo asíncrono `for...of`.**
  * **Datos:** Corte de conexión mientras se iteran los comentarios del post N.
  * **Procedimiento:** Interrumpir la red a mitad de las peticiones.
  * **Resultado esperado:** El bloque `try/catch` captura el error en la iteración actual e imprime `"- Error al consultar los datos: fetch failed"`.

---

## Ejercicio 4: Nombre y Teléfono (`modules/usuarioNombreYTelefono.js`)

### + Buen Camino (Camino Feliz)
* **Datos de prueba:** Petición HTTP a `https://jsonplaceholder.typicode.com/users`.
* **Procedimiento:** Seleccionar opción `4` en el menú.
* **Resultado esperado:** Transformación inmutable mediante `.map()`. Imprime en consola un arreglo de objetos simplificado únicamente con las propiedades `{ nombre, telefono }`.

### - Mal Camino (Escenarios de Fallo Controlado)
* **Caso 4.1: Falla de red en consumo inicial.**
  * **Datos:** Sin conexión a internet.
  * **Procedimiento:** Ejecutar la opción `4` en modo offline.
  * **Resultado esperado:** Intercepción mediante `.catch()`. Muestra en consola `Error al consultar los usuarios: TypeError: fetch failed`.
* **Caso 4.2: Estructura de respuesta inesperada (Respuesta nula o `undefined`).**
  * **Datos:** Alteración del formato JSON devuelto por el servidor.
  * **Procedimiento:** Simular una respuesta que no sea un arreglo.
  * **Resultado esperado:** El encadenamiento de promesas atrapa la falla de ejecución dentro del bloque `.catch()`.

---

## Ejercicio 5: Usuario Enriquecido (`modules/usuarioEnriquezido.js`)

### + Buen Camino (Camino Feliz)
* **Datos de prueba:** Peticiones compuestas a `/users`, `/posts`, `/comments`, `/albums` y `/photos`.
* **Procedimiento:** Seleccionar opción `5` en el menú.
* **Resultado esperado:** Resolución jerárquica paralela usando `Promise.all()`. Retorna e imprime el arreglo de usuarios enriquecidos con la estructura deeply nested (posts con sus comentarios, y albumes con sus fotos).

### - Mal Camino (Escenarios de Fallo Controlado)
* **Caso 5.1: Falla parcial en peticiones anidadas por falta de red.**
  * **Datos:** Desconexión de internet durante la resolución de promesas anidadas.
  * **Procedimiento:** Ejecutar la opción `5` sin conexión.
  * **Resultado esperado:** El `.catch()` final de la cadena atrapa la falla de cualquiera de los sub-niveles de `Promise.all()` e imprime `Error al consultar los datos: TypeError: fetch failed`. Se evita el error global `UnhandledPromiseRejection`.
* **Caso 5.2: Timeout por saturación de peticiones concurrentes.**
  * **Datos:** Red inestable o con alto porcentaje de pérdida de paquetes.
  * **Procedimiento:** Ejecutar las múltiples peticiones en paralelo con conexión deficiente.
  * **Resultado esperado:** Si alguna de las promesas de fotos o comentarios falla, el `Promise.all` se rechaza inmediatamente de forma controlada y el error es absorbido por el `.catch()` de la función.