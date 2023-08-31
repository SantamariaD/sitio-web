// MOSTRAR MODAL DE EXITO
const modalPagoCorrecto = document.getElementById("modalPagoCorrecto");
const cerrarModalPagoCorrecto = document.getElementById(
  "cerrarModalPagoCorrecto"
);

paypal
  .Buttons({
    // Estilo de los botones
    style: {
      color: "blue",
      label: "pay",
      background: "white",
    },
    // Crea orden de transaccion
    createOrder: function (data, actions) {
      return fetch(enviroments.urlBase + "/api/paypal/generar-orden", {
        method: "get",
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (orderData) {
          return orderData.id;
        });
    },

    // Call your server to finalize the transaction
    onApprove: function (data, actions) {
      return fetch(
        enviroments.urlBase + "/api/paypal/guardar-orden/" + data.orderID,
        {
          method: "get",
        }
      )
        .then(function (res) {
          return res.json();
        })
        .then(function (orderData) {
          // Tres casos para manejar:
          // (1) INSTRUMENT_DECLINED recuperable -> llamar a actions.restart()
          // (2) Otros errores no recuperables -> Mostrar un mensaje de fallo
          // (3) Transacción exitosa -> Mostrar confirmación o agradecimiento

          // Este ejemplo lee una respuesta de captura de órdenes v2/checkout/orders, propagada desde el servidor.
          // Podrías utilizar una API o estructura diferente para tus 'orderData'.
          var detalleError =
            Array.isArray(orderData.details) && orderData.details[0];

          if (detalleError && detalleError.issue === "INSTRUMENT_DECLINED") {
            return actions.restart(); // Recoverable state, per:
            // https://developer.paypal.com/docs/checkout/integration-features/funding-failure/
          }

          if (detalleError) {
            var msg = "Lo sentimos, su transacción no pudo ser procesada.";
            if (detalleError.description)
              msg += "\n\n" + detalleError.description;
            if (orderData.debug_id) msg += " (" + orderData.debug_id + ")";
            return alert(msg); // Show a failure message (try to avoid alerts in production environments)
          }

          modalPagoCorrecto.classList.add("mostrar-modal");
          modalPagoCorrecto.classList.remove("ocultar-modal");
          // Obtén una referencia al elemento, por ejemplo:
          // const elemento = document.getElementById('paypal-button-container');
          // Vacía el contenido existente del elemento
          // elemento.innerHTML = '';
          // Agrega un nuevo contenido que muestre el mensaje de agradecimiento
          // elemento.innerHTML = '<h3>¡Gracias por tu pago!</h3>';
          // O ve a otra URL:  actions.redirect('gracias.html');
        });
    },
  })
  .render("#paypal-button-container");

// Funciones despues del pago
cerrarModalPagoCorrecto.addEventListener("click", () => {
  modalPagoCorrecto.classList.add("ocultar-modal");
  modalPagoCorrecto.classList.remove("mostrar-modal");
});
