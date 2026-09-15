// Exportamos la función index5 para modularizar el ejercicio en la aplicación.
export const index5 = () => {

  // Solicitamos todos los usuarios en una única petición inicial para obtener la lista base.
  fetch('https://jsonplaceholder.typicode.com/users')

    // Transformamos la respuesta HTTP inicial a formato JSON para procesar los datos como objetos JS.
    .then((response) => response.json())

    // Recibimos el arreglo base de usuarios para enriquecer cada elemento con sus datos relacionados.
    .then((usuarios) => {

      // Mapeamos el arreglo de usuarios generando un arreglo de promesas para procesar a cada usuario de forma independiente.
      const consultasUsuarios = usuarios.map((usuario) => {

        // Construimos la petición para obtener únicamente los posts pertenecientes al ID del usuario actual.
        const promesaPosts = fetch(`https://jsonplaceholder.typicode.com/posts?userId=${usuario.id}`)

          // Convertimos la respuesta de la petición de posts a JSON.
          .then((response) => response.json())

          // Recibimos los posts del usuario para consultar los comentarios de cada uno.
          .then((posts) => {

            // Ejecutamos en paralelo las peticiones de comentarios para todos los posts del usuario mediante Promise.all.
            return Promise.all(
              posts.map((post) =>

                // Consultamos los comentarios específicos asignados al ID del post actual.
                fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)

                  // Convertimos la respuesta de los comentarios a JSON.
                  .then((response) => response.json())

                  // Retornamos una copia del post integrando la propiedad 'comentarios' con sus datos correspondientes.
                  .then((comentarios) => ({
                    ...post,
                    comentarios
                  }))
              )
            );
          });

        // Construimos la petición para obtener únicamente los álbumes pertenecientes al ID del usuario actual.
        const promesaAlbumes = fetch(`https://jsonplaceholder.typicode.com/albums?userId=${usuario.id}`)

          // Convertimos la respuesta de la petición de álbumes a JSON.
          .then((response) => response.json())

          // Recibimos los álbumes del usuario para consultar las fotos de cada uno.
          .then((albumes) => {

            // Ejecutamos en paralelo las peticiones de fotos para todos los álbumes del usuario mediante Promise.all.
            return Promise.all(
              albumes.map((album) =>

                // Consultamos las fotografías asociadas al ID del álbum actual.
                fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${album.id}`)

                  // Convertimos la respuesta de las fotos a JSON.
                  .then((response) => response.json())

                  // Retornamos una copia del álbum integrando la propiedad 'fotos' con sus datos correspondientes.
                  .then((fotos) => ({
                    ...album,
                    fotos
                  }))
              )
            );
          });

        // Resolvemos en paralelo las promesas de posts y álbumes del usuario para no perder el contexto de ninguna de las dos variables.
        return Promise.all([promesaPosts, promesaAlbumes])

          // Desestructuramos los resultados obtenidos para asignar posts y álbumes al objeto usuario final.
          .then(([postsCompletos, albumesCompletos]) => ({
            ...usuario,
            posts: postsCompletos,
            albumes: albumesCompletos
          }));
      });

      // Resolvemos todas las consultas de todos los usuarios de forma simultánea antes de entregar la respuesta final.
      return Promise.all(consultasUsuarios);
    })

    // Imprimimos en consola la estructura de datos anidada requerida una vez resueltas todas las promesas.
    .then((usuariosCompletos) => {
      console.log("--- USUARIOS COMPLETOS ---");
      console.log(usuariosCompletos);
    })

    // Atrapamos cualquier falla de red o de parseo que ocurra en cualquiera de los niveles de la cadena.
    .catch((error) => {
      console.log("Error al consultar los datos:", error);
    });
};