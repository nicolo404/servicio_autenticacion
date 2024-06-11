export const validarUsuario = (usuario) => {
  const error = [];
  if (!usuario.name) {
    error.push("El nombre es obligatorio");
  }
  if (!usuario.email) {
    error.push("El email es obligatorio");
  }
  if (!usuario.password || usuario.password.length < 6) {
    error.push(
      "La contraseña es obligatoria y debe tener al menos 6 caracteres"
    );
  }
  return error;
};

export const validarLogin = (usuario) => {
  const error = [];
  if (!usuario.email) {
    error.push("El email es obligatorio");
  }
  if (!usuario.password || usuario.password.length < 6) {
    error.push("La contraseña es obligatoria");
  }
  return error;
};
