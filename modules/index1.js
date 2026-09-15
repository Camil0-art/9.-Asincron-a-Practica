// exportacion del ejercicio 1 (index1.js)
export function index1() {

    console.log("Usted se encuentra en el Ejercicio 1");
    // Lista de tareas pendientes de los usuarios del 1 al 10

         // Hacemos la petición a la API de JSONPlaceholder para obtener las tareas
        fetch('https://jsonplaceholder.typicode.com/todos')
    .then((response) => response.json())
    .then((todos) => {
      let usuarioActual = null; // Variable para llevar un seguimiento del usuario actual

      // Recorremos el arreglo de tareas de los usuarios del 1 al 10
      todos.forEach((tarea) => {
        if (!tarea.completed) { // Solo mostramos las que NO están completadas
          // Si cambiamos de usuario, imprimimos un título de sección
          if (tarea.userId !== usuarioActual) {
            usuarioActual = tarea.userId;
            console.log(`\n:) USUARIO ${usuarioActual}:`);
          }
          // Imprimimos la tarea con sangría
          console.log(`     ;( ${tarea.title}`);
        }
      });
    })
    .catch((error) => // .catch nos ayuda a capturar errores en caso de que la petición falle
        console.error("Error al obtener datos:", error));
}