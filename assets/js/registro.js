const botonRegistrar = document.getElementById("botonRegistrar");
const mensajeCorrecto = document.getElementById("mensajeCorrecto");
const mensajeError = document.getElementById("mensajeError");
const mensajeErrorContrasenas = document.getElementById(
  "mensajeErrorContrasenas"
);

const registrarUsuario = () => {
  const url = "http://127.0.0.1:8000/api/autenticacion/registrar-usuario";

  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const nombreUsuario = document.getElementById("nombreUsuario").value;
  const contrasena = document.getElementById("contrasena").value;
  const spiner = document.getElementById("spiner");

  spiner.classList.add("spin-activo");

  const contactoForm = {
    name: nombre,
    email: correo,
    username: nombreUsuario,
    password: contrasena,
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contactoForm),
  })
    .then((response) => response.json())
    .then((data) => {
      mensajeCorrecto.classList.add("mostrar-mensaje-correcto");
      mensajeCorrecto.classList.remove("ocultar-mensaje-correcto");
      document.getElementById("nombre").value = "";
      document.getElementById("correo").value = "";
      document.getElementById("nombreUsuario").value = "";
      document.getElementById("contrasena").value = "";
      document.getElementById("contrasenaRepetir").value = "";
      spiner.classList.remove("spin-activo");
      setTimeout(() => {
        mensajeCorrecto.classList.remove("mostrar-mensaje-correcto");
        mensajeCorrecto.classList.add("ocultar-mensaje-correcto");
      }, 5000);
    })
    .catch((error) => {
      mensajeError.classList.add("mostrar-mensaje-error-contra");
      mensajeError.classList.remove("ocultar-mensaje-error");
      spiner.classList.remove("spin-activo");

      setTimeout(() => {
        mensajeError.classList.remove("mostrar-mensaje-error-contra");
        mensajeError.classList.add("ocultar-mensaje-error");
      }, 5000);
    });
};

const verificarContrasenas = () => {
  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const nombreUsuario = document.getElementById("nombreUsuario").value;
  const contrasena = document.getElementById("contrasena").value;
  const contrasenaRepetir = document.getElementById("contrasenaRepetir").value;

  if (contrasena === contrasenaRepetir) {
    mensajeErrorContrasenas.classList.remove("mostrar-mensaje-error-contra");

    if (nombre && correo && nombreUsuario) {
      botonRegistrar.removeAttribute("disabled");
      botonRegistrar.classList.remove("boton-desactivado");
      botonRegistrar.classList.add("primary-btn3");
    }
  } else {
    botonRegistrar.setAttribute("disabled", "true");
    mensajeErrorContrasenas.classList.add("mostrar-mensaje-error-contra");
    botonRegistrar.classList.add("boton-desactivado");
    botonRegistrar.classList.remove("primary-btn3");
  }
};

const verificarFormulario = () => {
  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const nombreUsuario = document.getElementById("nombreUsuario").value;
  const contrasena = document.getElementById("contrasena").value;
  const contrasenaRepetir = document.getElementById("contrasenaRepetir").value;

  if (nombre && correo && nombreUsuario && contrasena && contrasenaRepetir) {
    botonRegistrar.removeAttribute("disabled");
    botonRegistrar.classList.remove("boton-desactivado");
    botonRegistrar.classList.add("primary-btn3");
  } else {
    botonRegistrar.setAttribute("disabled", "true");
    botonRegistrar.classList.add("boton-desactivado");
    botonRegistrar.classList.remove("primary-btn3");
  }
};

document
  .getElementById("contrasena")
  .addEventListener("input", verificarContrasenas);
document
  .getElementById("contrasenaRepetir")
  .addEventListener("input", verificarContrasenas);
document
  .getElementById("nombre")
  .addEventListener("input", verificarFormulario);
document
  .getElementById("correo")
  .addEventListener("input", verificarFormulario);
document
  .getElementById("nombreUsuario")
  .addEventListener("input", verificarFormulario);

botonRegistrar.addEventListener("click", (event) => {
  event.preventDefault();

  registrarUsuario();
});
