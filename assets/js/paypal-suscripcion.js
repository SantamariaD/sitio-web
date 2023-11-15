paypal
  .Buttons({
    style: {
      color: "blue",
      label: "pay",
      background: "white",
    },
    createSubscription: function (data, actions) {
      return actions.subscription.create({
        plan_id: idSuscripcion,
      });
    },
    onApprove: function (data, actions) {
      modalPago.classList.add("mostrar-modal");
      modalPago.classList.remove("ocultar-modal");
      spin.classList.add("mostrar-modal");
      spin.classList.remove("ocultar-modal");
      infoPago.classList.add("ocultar-modal");
      infoPago.classList.remove("mostrar-modal");
      modalSistemaAdmin.classList.add("ocultar-modal");
      modalSistemaAdmin.classList.remove("mostrar-modal");
      crearBase(data);
    },
  })
  .render("#paypal-button-container");

const crearBase = (infoPago) => {
  fetch(enviroments.urlBaseAutenticacion + "/api/registrar-base", {
    method: "post",
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (base) {
      const fechas = obtenerFechas();
      const token = localStorage.getItem('token');

      const requestCrearAdministrador = {
        idUsuario: localStorage.getItem("id"),
        subscriptionID: infoPago.subscriptionID,
        idTipoSuscripcion: tipoSuscripcion,
        uuidBD: base.payload.uuidBD,
        fechaInicio: fechas.fechaInicio,
        fechaFin: fechas.fechaFin,
        facilitatorAccessToken: infoPago.facilitatorAccessToken,
        orderID: infoPago.orderID,
        paymentSource: infoPago.paymentSource,
        token: token,
        correo: localStorage.getItem("correo")
      };

      crearSuscripcion(requestCrearAdministrador);
    });
};

const crearSuscripcion = (request) => {
  fetch(enviroments.urlBaseAutenticacion + "/api/registrar-suscripcion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (respuestaSuscripcion) {
      spin.classList.add("ocultar-modal");
      spin.classList.remove("mostrar-modal");
      infoPago.classList.add("mostrar-modal");
      infoPago.classList.remove("ocultar-modal");
    })
    .catch((error) => console.log(error));
};

const obtenerFechas = () => {
  var today = new Date();

  var day = today.getDate();
  var month = today.getMonth() + 1;
  var year = today.getFullYear();

  var formattedDate =
    (day < 10 ? "0" : "") +
    day +
    "-" +
    (month < 10 ? "0" : "") +
    month +
    "-" +
    year;

  var nextYear = year + 1;

  var formattedNextYearDate =
    (day < 10 ? "0" : "") +
    day +
    "-" +
    (month < 10 ? "0" : "") +
    month +
    "-" +
    nextYear;

  return {
    fechaInicio: formattedDate,
    fechaFin: formattedNextYearDate,
  };
};
