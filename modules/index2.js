// exportacion del ejercicio 2 (index2.js)
export async function index2(rl) {
  console.log("\n=================================");
  console.log("   EJERCICIO 2: USUARIOS Y ÁLBUMES");
  console.log("=================================\n");

  try {
    // 1. Pedir el nombre de username al usuario
    const username = await rl.question(
      "Ingrese el username a buscar (ej. Bret, Antonette): "
    );

    // 2. Buscar al usuario en la API por su username
    const respuestaUsuario = await fetch( 
      `https://jsonplaceholder.typicode.com/users?username=${encodeURIComponent(username.trim())}`
    );

    
    const users = await respuestaUsuario.json();

    // Si el arreglo  viene vacío, el usuario no existe
    if (users.length === 0) {
      console.log("Usuario no encontrado.");
      return;
    }

    const usuario = users[0];

    // Mostrar información del usuario encontrado
    console.log(
      `\n- USUARIO ENCONTRADO: ${usuario.name} (@${usuario.username})`
    );

    console.log(
      `- Email: ${usuario.email} | - Compañía: ${usuario.company.name}`
    );

    // 3. Obtener los álbumes del usuario por medio de su ID
    const respuestaAlbumes = await fetch(
      `https://jsonplaceholder.typicode.com/users/${usuario.id}/albums`
    );

    const albums = await respuestaAlbumes.json();

    console.log(
      `\n==> ÁLBUMES Y FOTOS (${albums.length} álbumes encontrados):`
    );

    // 4. Crear las peticiones para obtener las fotos de cada álbum
    const peticionesFotos = albums.map((album) =>
      fetch(
        `https://jsonplaceholder.typicode.com/albums/${album.id}/photos`
      )
        .then((res) => res.json())
        .then((fotos) => ({ album, fotos }))
    );

    // Esperar a que se resuelvan las fotos de todos los álbumes
    const albumesConFotos = await Promise.all(peticionesFotos);

    // 5. Mostrar los álbumes con sus respectivas fotos
    albumesConFotos.forEach(({ album, fotos }) => {
      console.log(`\n  => Album: ${album.title}`);

      // Mostrar las primeras 3 fotos de cada álbum
      fotos.slice(0, 3).forEach((foto) => {
        console.log(`    => ${foto.title} (${foto.url})`);
      });
    });
  } catch (error) {
    console.error("Error al consultar los datos:", error);
  }
}