const botonLogin = document.getElementById("botonLogin");
const mensajeError = document.getElementById("mensajeError");
const cerrarSesion = document.getElementById("cerrar-sesion");
const mensajeErrorContrasenas = document.getElementById(
  "mensajeErrorContrasenas"
);

const loginPeticion = () => {
  const url = enviroments.urlBaseAutenticacion + "/api/autenticacion/login";

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const spiner = document.getElementById("spiner");

  spiner.classList.add("spin-activo");

  const loginRequest = {
    email,
    password,
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginRequest),
  })
    .then((response) => {
      if (!response.ok) {
        mensajeError.classList.remove("mostrar-mensaje-error-contra");
        mensajeError.classList.add("ocultar-mensaje-error");
        throw new Error(
          `Error en la solicitud: ${response.status} intentar nuevamente`
        );
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
      spiner.classList.remove("spin-activo");

      const idUsuario = data.usuario.id;
      const rol = data.usuario.rol;
      const idRol = data.usuario.idRol;
      const username = data.usuario.username;
      const name = data.usuario.name;
      const token = data.token;

      localStorage.setItem("id", idUsuario);
      localStorage.setItem("rol", rol);
      localStorage.setItem("idRol", idRol);
      localStorage.setItem("username", username);
      localStorage.setItem("nombre", name);
      localStorage.setItem("token", token);

      login.classList.add("ocultar-autenticacion");
      registro.classList.add("ocultar-autenticacion");
      nombreUsuario.classList.add("mostrar-nombre-usuario");
      nombreUsuario.classList.remove("ocultar-nombre-usuario");
      nombreUsuario.innerHTML = "#" + username;
      window.location.href = enviroments.urlBaseFron;
    })
    .catch((error) => {
      mensajeError.classList.remove("ocultar-mensaje-error");
      spiner.classList.remove("spin-activo");

      setTimeout(() => {
        mensajeError.classList.add("ocultar-mensaje-error");
      }, 5000);
    });
};

const cerrarSesionPeticion = () => {
  const url = enviroments.urlBaseAutenticacion + "/api/autenticacion/logout";
  const token = localStorage.getItem("token");

  if (token) {
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          mensajeError.classList.remove("mostrar-mensaje-error-contra");
          mensajeError.classList.add("ocultar-mensaje-error");
          throw new Error(
            `Error en la solicitud: ${response.status} intentar nuevamente`
          );
        }
        return response.json();
      })
      .then((data) => {
        localStorage.removeItem("id");
        localStorage.removeItem("rol");
        localStorage.removeItem("idRol");
        localStorage.removeItem("username");
        localStorage.removeItem("nombre");
        localStorage.removeItem("token");

        login.classList.remove("ocultar-autenticacion");
        registro.classList.remove("ocultar-autenticacion");
        nombreUsuario.classList.remove("mostrar-nombre-usuario");
        nombreUsuario.classList.add("ocultar-nombre-usuario");
        nombreUsuario.innerHTML = "";
      })
      .catch((error) => console.log(error));
  }
};

const verificarFormulario = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (password && email) {
    botonLogin.removeAttribute("disabled");
    botonLogin.classList.remove("boton-desactivado");
    botonLogin.classList.add("primary-btn3");
  } else {
    botonLogin.setAttribute("disabled", "true");
    botonLogin.classList.add("boton-desactivado");
    botonLogin.classList.remove("primary-btn3");
  }
};

// EVENTOS

/**
 * @Evento Verifivan si las contraseñas son corretas
 */
document
  .getElementById("password")
  ?.addEventListener("input", verificarFormulario);
document
  .getElementById("email")
  ?.addEventListener("input", verificarFormulario);

/**
 * @Evento boton para iniciar sesión y hacer la peticion
 */
botonLogin?.addEventListener("click", (event) => {
  event.preventDefault();

  loginPeticion();
});

/**
 * @Evento click en cerrar sesión de la barra de navegacion
 */
cerrarSesion?.addEventListener("click", (event) => {
  event.preventDefault();

  cerrarSesionPeticion();
});
