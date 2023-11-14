var paquete1 = document.getElementById("paquete1");
var paquete2 = document.getElementById("paquete2");
var paquete3 = document.getElementById("paquete3");
var modalSistemaAdmin = document.getElementById("modalSistemaAdmin");
var modalPago = document.getElementById("modalPago");
var spin = document.getElementById("spin");
var infoPago = document.getElementById("infoPago");
var cerrarModalPagado = document.getElementById("cerrarModalPagado");
var cerrarModalSistema = document.getElementById("cerrarModalSistema");
var iniciarSistema = document.getElementById("iniciarSistema");
var tipoSuscripcion = "";
var idSuscripcion = "";

paquete1.addEventListener("click", () => {
  if (localStorage.getItem("id")) {
    modalSistemaAdmin.classList.add("mostrar-modal");
    modalSistemaAdmin.classList.remove("ocultar-modal");
    idSuscripcion = "P-8E8705556J216210KMTYCDPA";
    tipoSuscripcion = 1;
  } else {
    window.location.href = enviroments.urlBaseFron + "/login.html";
  }
});

paquete2.addEventListener("click", () => {
  if (localStorage.getItem("id")) {
    modalSistemaAdmin.classList.add("mostrar-modal");
    modalSistemaAdmin.classList.remove("ocultar-modal");
    idSuscripcion = "P-1AB98616PM676542VMTYC7RA";
    tipoSuscripcion = 2;
  } else {
    window.location.href = enviroments.urlBaseFron + "/login.html";
  }
});

paquete3.addEventListener("click", () => {
  if (localStorage.getItem("id")) {
    modalSistemaAdmin.classList.add("mostrar-modal");
    modalSistemaAdmin.classList.remove("ocultar-modal");
    idSuscripcion = "P-2GX582532E415602JMTYDB7I";
    tipoSuscripcion = 3;
  } else {
    window.location.href = enviroments.urlBaseFron + "/login.html";
  }
});

cerrarModalSistema?.addEventListener("click", () => {
  modalSistemaAdmin.classList.add("ocultar-modal");
  modalSistemaAdmin.classList.remove("mostrar-modal");
});

cerrarModalPagado?.addEventListener("click", () => {
  modalPago.classList.add("ocultar-modal");
  modalPago.classList.remove("mostrar-modal");
});
