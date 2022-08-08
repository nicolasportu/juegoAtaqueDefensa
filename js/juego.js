let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;

function iniciarJuego() {
  let sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
  sectionSeleccionarAtaque.style.display = "none";

  let sectionReiniciar = document.getElementById("reiniciar");
  sectionReiniciar.style.display = "none";

  let btnMascotaJugador = document.getElementById("btn-mascota");
  btnMascotaJugador.addEventListener("click", SeleccionarMascotaJugador);

  let botonFuego = document.getElementById("btn-fuego");
  botonFuego.addEventListener("click", ataqueFuego);
  let botonAgua = document.getElementById("btn-agua");
  botonAgua.addEventListener("click", ataqueAgua);
  let botonAire = document.getElementById("btn-aire");
  botonAire.addEventListener("click", ataqueAire);
  let botonReinicio = document.getElementById("btn-reiniciar");
  botonReinicio.addEventListener("click", botonReiniciarJuego);
}

function SeleccionarMascotaJugador() {
  let sectionSeleccionarMascota = document.getElementById("seleccionar-mascota");
  sectionSeleccionarMascota.style.display = "none";

  let sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
  sectionSeleccionarAtaque.style.display = "flex";

  let inputLeo = document.getElementById("leo");
  let inputFenix = document.getElementById("fenix");
  let inputSeiya = document.getElementById("seiya");
  let spanMascotaJugador = document.getElementById("mascota-jugador");
  let comenzarJuego = 1;

  if (inputLeo.checked) {
    spanMascotaJugador.innerHTML = "Aioria de Leo";
  } else if (inputFenix.checked) {
    spanMascotaJugador.innerHTML = "Ikki de Fenix";
  } else if (inputSeiya.checked) {
    spanMascotaJugador.innerHTML = "Seiya de Pegaso";
  } else {
    alert("Tenes que seleccionar una mascota");
    comenzarJuego = 0;
  }

  if (comenzarJuego == 1) {
    SeleccionarMascotaEnemigo();
  }
}

function SeleccionarMascotaEnemigo() {
  let aleatorioEnemigo = aleatorio(1, 3);
  let spanMascotaEnemigo = document.getElementById("mascota-enemigo");

  if (aleatorioEnemigo == 1) {
    spanMascotaEnemigo.innerHTML = "Aioria de Leo";
  } else if (aleatorioEnemigo == 2) {
    spanMascotaEnemigo.innerHTML = "Ikki de Fenix";
  } else {
    spanMascotaEnemigo.innerHTML = "Seiya de Pegaso";
  }
}

function ataqueFuego() {
  ataqueJugador = "FUEGO";
  ataqueRandomEnemigo();
}

function ataqueAgua() {
  ataqueJugador = "AGUA";
  ataqueRandomEnemigo();
}

function ataqueAire() {
  ataqueJugador = "AIRE";
  ataqueRandomEnemigo();
}

function ataqueRandomEnemigo() {
  let ataqueAleatorio = aleatorio(1, 3);

  if (ataqueAleatorio == 1) {
    ataqueEnemigo = "FUEGO";
  } else if (ataqueAleatorio == 2) {
    ataqueEnemigo = "AGUA";
  } else {
    ataqueEnemigo = "AIRE";
  }

  combateSpace();
}

function combateSpace() {
  let spanVidasJugador = document.getElementById("vidas-jugador");
  let spanVidasEnemigo = document.getElementById("vidas-enemigo");

  if (ataqueEnemigo == ataqueJugador) {
    crearMensaje("EMPATE");
  } else if ((ataqueJugador == "FUEGO" && ataqueEnemigo == "AIRE") || (ataqueJugador == "AGUA" && ataqueEnemigo == "FUEGO") || (ataqueJugador == "AIRE" && ataqueEnemigo == "AGUA")) {
    crearMensaje("GANASTE");
    vidasEnemigo--;
    spanVidasEnemigo.innerHTML = vidasEnemigo;
  } else {
    crearMensaje("PERDISTE");
    vidasJugador--;
    spanVidasJugador.innerHTML = vidasJugador;
  }

  resultadoVidas();
}

function resultadoVidas() {
  if (vidasEnemigo == 0) {
    crearMensajeFinal("JUEGO GANADO");
  } else if (vidasJugador == 0) {
    crearMensajeFinal("JUEGO PERDIDO");
  }
}

function crearMensaje(resultado) {
  let sectionMensajes = document.getElementById("resultado");
  let ataquesDelJugador = document.getElementById("ataques-del-jugador");
  let ataquesDelEnemigo = document.getElementById("ataques-del-enemigo");

  let nuevoAtaqueDelJugador = document.createElement('p');
  let nuevoAtaqueDelEnemigo = document.createElement('p');

  sectionMensajes.innerHTML = resultado;
  nuevoAtaqueDelJugador.innerHTML = ataqueJugador;
  nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo;

  
  ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
  ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal) {
  let sectionMensajes = document.getElementById("resultado");

  sectionMensajes.innerHTML = resultadoFinal;

  let btnMascotaJugador = document.getElementById("btn-mascota");
  btnMascotaJugador.disabled = true;
  let botonFuego = document.getElementById("btn-fuego");
  botonFuego.disabled = true;
  let botonAgua = document.getElementById("btn-agua");
  botonAgua.disabled = true;
  let botonAire = document.getElementById("btn-aire");
  botonAire.disabled = true;

  let sectionReiniciar = document.getElementById("reiniciar");
  sectionReiniciar.style.display = "block";
}

function botonReiniciarJuego() {
  location.reload();
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", iniciarJuego);
