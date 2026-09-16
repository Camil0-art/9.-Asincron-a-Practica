// exportacion del ejercicio 3 (index3.js)
export async function BusquedaPosts(rl) { // Recibe rl como parámetro para poder hacer preguntas al usuario

  console.log("\n==========================================");
  console.log("       EJERCICIO 3: POSTS Y COMENTARIOS");
  console.log("==========================================\n");

  try {

    // 1. Pedimos al usuario el nombre o una parte del nombre del post
    // rl.question() es una función que permite hacer preguntas al usuario y esperar su respuesta de manera asíncrona
    const nombre = await rl.question( 
      "Ingrese el nombre del post que desea buscar: "
    );

    // 2. Consultamos todos los posts disponibles en la API
    const respuesta = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    );

    // Convertimos la respuesta de la API a un arreglo de JavaScript
    const posts = await respuesta.json();

    // 3. Filtramos los posts comparando lo que escribió el usuario
    // con el título de cada post
    const encontrados = posts.filter(post =>
      post.title.toLowerCase().includes(nombre.toLowerCase())
    );

    // 4. Verificamos si no encontramos ningún post
    if (encontrados.length === 0) {
      console.log("\n- No se encontró ningún post con ese nombre.");
      return;
    }

    console.log("\n==========================================");
    console.log(`        ${encontrados.length} POST(S) ENCONTRADO(S)`);
    console.log("==========================================");

    // 5. Recorremos cada post que encontramos
    for (const post of encontrados) {

      // 6. Consultamos los comentarios relacionados con el ID del post
      const respuestaComentarios = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`
      );

      // Convertimos los comentarios recibidos en un arreglo
      const comentarios = await respuestaComentarios.json();

      // 7. Mostramos la información principal del post
      console.log("\n------------------------------------------");
      console.log(`===>> POST #${post.id}`);
      console.log("------------------------------------------");
      console.log(`Título: ${post.title}`);
      console.log(`Contenido: ${post.body}`);

      // 8. Mostramos los comentarios encontrados para ese post
      console.log(`\n=> COMENTARIOS (${comentarios.length})`);
      console.log("------------------------------------------");

      comentarios.forEach((comentario, indice) => {
        console.log(`\nComentario ${indice + 1}`);
        console.log(` => Nombre: ${comentario.name}`);
        console.log(` => Email: ${comentario.email}`);
        console.log(`=> ${comentario.body}`);
      });
    }

  } catch (error) {

    // Si ocurre algún problema con la conexión o la API,
    // mostramos el mensaje de error
    console.log("\n- Error al consultar los datos:", error.message);
  }
}