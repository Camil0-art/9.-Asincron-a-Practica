export const usuarioNombreYTelefono = () => {

  // Se realiza la Consulta de todos los usuarios de la API
  fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())

    // Recibimos los usuarios y creamos un nuevo arreglo
    .then((usuarios) => {
      const usuariosModificados = usuarios.map((usuario) => ({
        nombre: usuario.name,
        telefono: usuario.phone
      }));

      // Mostramos el nuevo arreglo
      console.log("  --- USUARIOS ---  ");
      console.log(usuariosModificados);
    })

    // Capturamos posibles errores de la petición
    .catch((error) => {
      console.log("Error al consultar los usuarios:", error);
    });
};


