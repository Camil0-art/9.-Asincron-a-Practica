/* Importación de módulos desde el archivo barril (Index.js) */
import { TareasPendientes, UsuarioAlbumes, BusquedaPosts, usuarioNombreYTelefono, usuarioEnriquezido } from "./index.js";

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
      await TareasPendientes(rl);
      break;

    case "2":
      await UsuarioAlbumes(rl);
      break;

    case "3":
      await BusquedaPosts(rl);
      break;

    case "4":
      await usuarioNombreYTelefono(rl);
      break;

    case "5":
      await usuarioEnriquezido(rl);
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