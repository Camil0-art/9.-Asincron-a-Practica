# Documentación Técnica del Sistema

## 1. Módulo Principal (`app.js`)

* **Propósito:** Controlar el flujo de ejecución interactivo mediante consola (CLI) desplegando un menú reutilizable.
* **Variables y Propósito:**
  * `rl`: Objeto instanciado de `readline.createInterface`. Inmutable (`const`). Controla la entrada/salida de la terminal.
  * `opcion`: Cadena de texto (`string`). Inmutable (`const`). Almacena la selección ingresada por el usuario.
* **Parámetros:** Ninguno.
* **Retornos:** `Promise<void>`.
* **Funciones Empleadas & Justificación:**
  * `readline.createInterface()`: Inicializa el flujo de lectura interactivo.
  * `rl.question()`: Lee la entrada del usuario de forma asíncrona.
* **Estructuras de Control:**
  * `switch (opcion.trim())`: Dirige el flujo hacia el ejercicio correspondiente (Casos `"1"` al `"5"`).
  * `default`: Captura opciones inválidas y vuelve a invocar `menu()` recursivamente.
* **Manejo de Errores & Ciclo de Vida:**
  * `.catch()`: Captura excepciones globales no controladas.
  * `.finally()`: Ejecuta `rl.close()` para asegurar la liberación del proceso en terminal.


---


## 2. Archivo Barril (`index.js`)

* **Propósito:** Centralizar e interconectar las exportaciones nombradas de todos los módulos alojados en `/modules`, exponiendo una interfaz unificada para `app.js`.

---

## 3. Ejercicio 1: Tareas Pendientes (`modules/TareasPendientes.js`)

* **Firma:** `export function TareasPendientes()`
* **Parámetros:** Ninguno.
* **Retorno:** `void` (indefinido).
* **Variables y Propósito:**
  * `response`: Objeto `Response` HTTP de la petición `fetch`.
  * `todos`: Arreglo de objetos (`Array<Object>`) con las tareas devueltas por la API.
  * `usuarioActual`: Identificador numérico o `null` (`number|null`). Mutable (`let`). Controla el cambio de sección por usuario.
  * `tarea`: Objeto individual de la lista durante la iteración.
  * `error`: Objeto `Error` capturado en la falla de la promesa.
* **Tipos de Datos de Entrada:** Petición HTTP GET a `https://jsonplaceholder.typicode.com/todos` de la cual se procesa un JSON array de objetos con las propiedades `{ userId: number, id: number, title: string, completed: boolean }`.
* **Validaciones:**
  * `if (!tarea.completed)`: Evalúa que la tarea no esté completada.
  * `if (tarea.userId !== usuarioActual)`: Detecta el cambio de id de usuario para imprimir el encabezado correspondiente.
* **Ciclos & Procesos:** `.forEach()` para iterar la lista secuencialmente.
* **Mutabilidad/Inmutabilidad:** `todos` es tratado como inmutable; `usuarioActual` es mutable para registrar los cambios de estado del agrupador.
* **Funciones & Justificación:** `fetch()` para consumo HTTP asíncrono; `.then()` y `.catch()` para encadenamiento de promesas.

---

## 4. Ejercicio 2: Usuarios y Álbumes (`modules/UsuarioAlbumes.js`)

* **Firma:** `export async function UsuarioAlbumes(rl)`
* **Parámetros:** `rl` (Objeto de interfaz Readline).
* **Retorno:** `Promise<void>`.
* **Variables y Propósito:**
  * `username`: Texto (`string`). Inmutable (`const`). Almacena la entrada ingresada.
  * `respuestaUsuario`, `respuestaAlbumes`: Objetos `Response` HTTP.
  * `users`, `albums`, `fotos`: Arreglos de objetos obtenidos en JSON.
  * `usuario`: Objeto individual extraído (`users[0]`).
  * `peticionesFotos`: Arreglo de promesas (`Array<Promise>`) generado para consultar fotos en paralelo.
  * `albumesConFotos`: Resultado de resolver `Promise.all(peticionesFotos)`.
* **Tipos de Datos de Entrada:** Entrada por consola (`string`) y consumo de las rutas `/users`, `/albums` y `/photos`.
* **Validaciones & Sanear Datos:**
  * `encodeURIComponent(username.trim())`: Previene inyecciones en la URL y elimina espacios externos.
  * `if (users.length === 0)`: Detiene la ejecución si el usuario no existe.
* **Ciclos & Procesos:**
  * `.map()`: Transforma la lista de álbumes en peticiones paralelas de fotos.
  * `Promise.all()`: Resuelve concurrentemente las imágenes.
  * `.slice(0, 3)`: Limita la salida a las primeras 3 fotos de cada álbum.
  * `.forEach()`: Muestra los resultados en consola.
* **Manejo de Errores:** Bloque `try/catch` para interceptar fallos de red o errores de lectura.

---

## 5. Ejercicio 3: Búsqueda de Posts (`modules/BusquedaPosts.js`)

* **Firma:** `export async function BusquedaPosts(rl)`
* **Parámetros:** `rl` (Objeto de interfaz Readline).
* **Retorno:** `Promise<void>`.
* **Variables y Propósito:**
  * `nombre`: Texto (`string`). Inmutable. Texto a filtrar.
  * `posts`, `comentarios`: Arreglos de objetos devueltos por la API.
  * `encontrados`: Arreglo filtrado de posts.
  * `post`: Objeto recorrido en el ciclo `for...of`.
* **Tipos de Datos de Entrada:** Texto libre ingresado por usuario y respuestas JSON de `/posts` y `/comments`.
* **Validaciones:**
  * `.toLowerCase().includes(...)`: Búsqueda insensible a mayúsculas/minúsculas.
  * `if (encontrados.length === 0)`: Valida la ausencia de coincidencias.
* **Ciclos & Procesos:**
  * `.filter()`: Filtra los títulos que coinciden con el término ingresado.
  * `for (const post of encontrados)`: Itera de forma asíncrona sobre cada post.
  * `comentarios.forEach()`: Recorre e imprime la información de comentarios.
* **Manejo de Errores:** Bloque `try/catch` que captura excepciones e imprime `error.message`.

---

## 6. Ejercicio 4: Nombre y Teléfono (`modules/usuarioNombreYTelefono.js`)

* **Firma:** `export const usuarioNombreYTelefono = () => ...`
* **Parámetros:** Ninguno.
* **Retorno:** `void`.
* **Variables y Propósito:**
  * `usuariosModificados`: Arreglo de objetos (`Array<{nombre: string, telefono: string}>`). Inmutable. Almacena la estructura simplificada.
* **Procesos:** `.map()` para transformar la estructura de datos original reduciéndola solo a los atributos `nombre` y `telefono`.
* **Manejo de Errores:** Bloque `.catch()` para captura de excepciones.

---

## 7. Ejercicio 5: Usuario Enriquecido (`modules/usuarioEnriquezido.js`)

* **Firma:** `export const usuarioEnriquezido = () => ...`
* **Parámetros:** Ninguno.
* **Retorno:** `void`.
* **Variables y Propósito:**
  * `consultasUsuarios`: Arreglo de promesas principal.
  * `promesaPosts`, `promesaAlbumes`: Promesas independientes de peticiones HTTP por usuario.
  * `usuariosCompletos`: Resultado final de resolver la jerarquía completa de promesas.
* **Procesos & Mutabilidad:**
  * Anidamiento jerárquico de `Promise.all()`.
  * Uso del operador spread (`...`) para preservar inmutabilidad al clonar y extender objetos (`{ ...post, comentarios }`, `{ ...album, fotos }`, `{ ...usuario, posts, albumes }`).
* **Manejo de Errores:** Bloque `.catch()` al final de la cadena de promesas.