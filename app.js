// Importación de módulos desde el archivo barril (Index.js) //
import { index1, index2, index3, index4, index5 } from "./index.js";

// Archivo Principal (app.js) (Punto de Entrada) //

// Importación de módulos desde el archivo barril //

// Importacion de libreria externa //
import readline from "readline";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Creacion de la funcion menu (Principal) Para elegir el ejercicio //
function menu() {
  console.log(`
Seleccione el ejercicio:
1. Ejercicio 1
2. Ejercicio 2
3. Ejercicio 3
4. Ejercicio 4
5. Ejercicio 5
  `);

  // muestra la consulta escribiéndola en la salida
  rl.question("Opción: ", (opcion) => {
    switch (opcion.trim()) {
      case "1":
        index1();
        rl.close();
        break;
      case "2":
        index2();
        rl.close();
        break;
      case "3":
        index3();
        rl.close();
        break;
      case "4":
        index4();
        rl.close();
        break;
      case "5":
        index5();
        rl.close();
        break;
      default:
        console.log("\nOpción inválida, vuelva a seleccionar un ejercicio.");
        menu(); // Vuelve a pedir la opción si es inválida
        break;
    }
  });
}

menu();