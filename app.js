/* Importación de módulos desde el archivo barril (Index.js) */
import { index1, index2, index3, index4, index5 } from "./index.js";

// Importación de la librería readline/promises
import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

// Creación de una única interfaz para toda la aplicación
const rl = readline.createInterface({
  input,
  output
});


// Creación de la función menu (Principal)
async function menu() {
  console.log(`
Seleccione el ejercicio:
1. Ejercicio 1
2. Ejercicio 2
3. Ejercicio 3
4. Ejercicio 4
5. Ejercicio 5
  `);

  // Pedimos la opción al usuario y esperamos su respuesta
  const opcion = await rl.question("Opción: ");

  switch (opcion.trim()) {
    case "1":
      await index1(rl);
      break;

    case "2":
      await index2(rl);
      break;

    case "3":
      await index3(rl);
      break;

    case "4":
      await index4(rl);
      break;

    case "5":
      await index5(rl);
      break;

    default:
      console.log("\nOpción inválida, vuelva a seleccionar un ejercicio.");
      await menu();
      break;
  }
}

// Ejecutamos el menú y cerramos readline al finalizar
menu()
  .catch((error) => {
    console.error("Error en la aplicación:", error);
  })
  .finally(() => {
    rl.close();
  });