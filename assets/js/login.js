const botonLogin = document.getElementById("botonLogin");
const mensajeError = document.getElementById("mensajeError");
const mensajeErrorContrasenas = document.getElementById(
  "mensajeErrorContrasenas"
);

const loginPeticion = () => {
  const url = enviroments.urlBase + "/api/autenticacion/login";

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
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
      spiner.classList.remove("spin-activo");
      console.log(data);

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
      nombreUsuario.innerHTML = name;
      window.location.href = "https://techcode.tech";
    })
    .catch((error) => {
      mensajeError.classList.remove("ocultar-mensaje-error");
      spiner.classList.remove("spin-activo");

      setTimeout(() => {
        mensajeError.classList.add("ocultar-mensaje-error");
      }, 5000);
    });
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

document
  .getElementById("password")
  .addEventListener("input", verificarFormulario);
document.getElementById("email").addEventListener("input", verificarFormulario);

botonLogin.addEventListener("click", (event) => {
  event.preventDefault();

  loginPeticion();
});
