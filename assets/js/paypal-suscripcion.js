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
      modalSistemaAdmin.classList.add("ocultar-modal");
      modalSistemaAdmin.classList.remove("mostrar-modal");
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
