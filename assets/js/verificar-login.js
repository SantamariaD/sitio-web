const login = document.getElementById("loginBoton");
const registro = document.getElementById("registroBoton");
const nombreUsuario = document.getElementById("nombreUsuario");

const verificarLogin = () => {
  const idUsuario = localStorage.getItem("id");

  if (idUsuario) {
    login.classList.add("ocultar-autenticacion");
    registro.classList.add("ocultar-autenticacion");
    nombreUsuario.classList.add("mostrar-nombre-usuario");
    nombreUsuario.innerHTML = "#"+localStorage.getItem("username");
  } else {
    login.classList.remove("ocultar-autenticacion");
    registro.classList.remove("ocultar-autenticacion");
    nombreUsuario.classList.remove("mostrar-nombre-usuario");
  }
};

verificarLogin();
