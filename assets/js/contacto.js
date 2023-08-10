const botonEnviar = document.getElementById("botonEnviar");
const mensajeCorrecto = document.getElementById("mensajeCorrecto");
const mensajeError = document.getElementById("mensajeError");

botonEnviar.addEventListener("click", function (event) {
  event.preventDefault();

  let nombre = document.getElementById("nombre").value;
  let correo = document.getElementById("correo").value;
  let telefono = document.getElementById("telefono").value;
  let mensaje = document.getElementById("mensaje").value;

  if (nombre && correo && mensaje) {
    const contactoForm = {
      nombre,
      correo,
      telefono,
      mensaje,
    };
    document.getElementById("nombre").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("mensaje").value = "";
    guardarContacto(contactoForm);
  }
});

const guardarContacto = (contactoForm) => {
  const url = "http://127.0.0.1:8000/api/contactos/guardar"; 

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contactoForm),
  })
    .then((response) => response.json())
    .then((data) => {
      mensajeCorrecto.classList.add("mostrar-mensaje-correcto")
      mensajeCorrecto.classList.remove("ocultar-mensaje-correcto")

      setTimeout(() => {
        mensajeCorrecto.classList.remove("mostrar-mensaje-correcto")
        mensajeCorrecto.classList.add("ocultar-mensaje-correcto")
      }, 5000);

    })
    .catch((error) => {
      mensajeError.classList.add("mostrar-mensaje-error")
      mensajeError.classList.remove("ocultar-mensaje-error")

      setTimeout(() => {
        mensajeError.classList.remove("mostrar-mensaje-error")
        mensajeError.classList.add("ocultar-mensaje-error")
      }, 5000);
    });
};
