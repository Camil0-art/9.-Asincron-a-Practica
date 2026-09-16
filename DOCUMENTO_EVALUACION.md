# Documento de Evaluación y Plan de Pruebas de Resiliencia

Este documento detalla el procedimiento, los escenarios de prueba, la justificación de los datos seleccionados y las matrices de resultados esperados (éxito y fallos controlados mediante `try/catch`).

---

## 1. Procedimiento de Evaluación

1. Abrir la terminal de comandos e iniciar el programa mediante `node app.js`.
2. Verificar la navegación por cada opción del menú (1 al 5).
3. Evaluar comportamiento en **Camino Feliz** (Red activa y datos correctos).
4. Evaluar comportamiento ante **Búsquedas Vacías / Entradas Inválidas**.
5. Simular **Fallo de Conexión / Red** desactivando la tarjeta de red del sistema.

---

## 2. Matriz de Casos de Prueba

### CASO 1: Ejecución Correcta de Consultas (Camino Feliz)
* **Propósito:** Verificar el correcto procesamiento asíncrono y renderizado de datos.
* **Datos de Prueba Utilizados:**
  * Ejercicio 2: `Bret` (Username válido existente).
  * Ejercicio 3: `sunt` (Fragmento de texto presente en títulos de posts).
* **Razón de Elección:** Son registros garantizados dentro de la base de datos simulada de JSONPlaceholder.
* **Resultado Esperado (Éxito):**
  * Ejercicio 1: Lista de tareas pendientes formateadas con caritas y sangría visual.
  * Ejercicio 2: Muestra datos del usuario, sus álbumes y un máximo de 3 fotos por álbum.
  * Ejercicio 3: Despliega los posts filtrados junto con su lista de comentarios.
  * Ejercicio 4: Muestra el arreglo mapeado conteniendo solo `nombre` y `telefono`.
  * Ejercicio 5: Imprime la estructura JSON anidada completa.

---

### CASO 2: Búsqueda Sin Coincidencias / Entradas No Existentes
* **Propósito:** Evaluar que el programa no colapse ni muestre errores no controlados (*undefined*) cuando la API no retorna resultados.
* **Datos de Prueba Utilizados:**
  * Ejercicio 2: `UsuarioInexistente999`
  * Ejercicio 3: `TextoImposibleDeEncontrarEnUnPost12345`
* **Razón de Elección:** Garantiza que la respuesta HTTP sea un arreglo vacío `[]`.
* **Resultado Esperado (Control de Flujo):**
  * Ejercicio 2: Muestra en consola `"Usuario no encontrado."` y finaliza la función limpiamente.
  * Ejercicio 3: Muestra en consola `"- No se encontró ningún post con ese nombre."` y retorna al menú.

---

### CASO 3: Fallo de Conexión a Internet / Red (Error Controlado)
* **Propósito:** Validar la captura de excepciones mediante bloques `try/catch` o `.catch()` sin detener la ejecución de `app.js`.
* **Procedimiento:** Desconectar la conexión Wi-Fi/Ethernet y seleccionar cualquier ejercicio del menú.
* **Razón de Elección:** Simular caídas de servidor, time-outs o pérdida del enlace local de red.
* **Resultado Esperado (Fallo Controlado mediante `try/catch`):**
  El sistema captura la excepción de red de forma limpia e imprime el mensaje correspondiente según el módulo:
  * En funciones con `.catch()`:
    ```text
    Error al obtener datos: TypeError: fetch failed
    ```
  * En funciones con `try/catch`:
    ```text
    Error al consultar los datos: fetch failed
    ```
  * El programa **no lanza excepciones no capturadas** (*UnhandledPromiseRejection*) ni interrumpe abruptamente la CLI.