// iniciarJuego
const sectionReiniciar = document.getElementById("reiniciar");
const btnMascotaJugador = document.getElementById("btn-mascota");
const botonFuego = document.getElementById("btn-fuego");
const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
const botonAgua = document.getElementById("btn-agua");
const botonAire = document.getElementById("btn-aire");
const botonReinicio = document.getElementById("btn-reiniciar");

//SeleccionarMascotaJugador
const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota");
const spanMascotaJugador = document.getElementById("mascota-jugador");

//SeleccionarMascotaEnemigo
const spanMascotaEnemigo = document.getElementById("mascota-enemigo");

//combateSpace
const spanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasEnemigo = document.getElementById("vidas-enemigo");

//crearMensaje
const sectionMensajes = document.getElementById("resultado");
const ataquesDelJugador = document.getElementById("ataques-del-jugador");
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo");
const contenedorTarjetas = document.getElementById('contenedorTarjetas');

let caballeros = []
let ataqueJugador;
let ataqueEnemigo;
let opcionDeCaballeros;
let inputLeo;
let inputFenix;
let inputSeiya;
let vidasJugador = 3;
let vidasEnemigo = 3;

class Zodiaco {
  constructor(nombre, foto, vida) {
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = []
  }
}

let leo = new Zodiaco('Aioria', './assets/aioriaDeLeo-removebg-preview.png', 5);

let fenix = new Zodiaco('Ikki', './assets/fenix-removebg-preview.png', 5);

let seiya = new Zodiaco('Seiya', './assets/seiya-removebg-preview.png', 5);

leo.ataques.push(
  {nombre: '🔥', id: 'btn-fuego'},
  {nombre: '🔥', id: 'btn-fuego'},
  {nombre: '🔥', id: 'btn-fuego'},
  {nombre: '💧', id: 'btn-agua'},
  {nombre: '🌪', id: 'btn-aire'},
);

fenix.ataques.push(
  {nombre: '🌪', id: 'btn-aire'},
  {nombre: '🌪', id: 'btn-aire'},
  {nombre: '🌪', id: 'btn-aire'},
  {nombre: '💧', id: 'btn-agua'},
  {nombre: '🔥', id: 'btn-fuego'},
);

seiya.ataques.push(
  {nombre: '💧', id: 'btn-agua'},
  {nombre: '💧', id: 'btn-agua'},
  {nombre: '💧', id: 'btn-agua'},
  {nombre: '🔥', id: 'btn-fuego'},
  {nombre: '🌪', id: 'btn-aire'},
); 

caballeros.push(leo, fenix, seiya);

function iniciarJuego() {
  sectionSeleccionarAtaque.style.display = "none";
  sectionReiniciar.style.display = "none";

  caballeros.forEach((caballero) => {
    opcionDeCaballeros = `
    <input type="radio" name="mascota" id=${caballero.nombre} />
    <label class="tarjeta" for=${caballero.nombre}>
        <p>${caballero.nombre}</p>
        <img src=${caballero.foto} alt=${caballero.nombre} />
    </label>
    `

    contenedorTarjetas.innerHTML += opcionDeCaballeros;

    inputLeo = document.getElementById("Aioria");
    inputFenix = document.getElementById("Ikki");
    inputSeiya = document.getElementById("Seiya");
  })

  btnMascotaJugador.addEventListener("click", SeleccionarMascotaJugador);
  botonFuego.addEventListener("click", ataqueFuego);
  botonAgua.addEventListener("click", ataqueAgua);
  botonAire.addEventListener("click", ataqueAire);
  botonReinicio.addEventListener("click", botonReiniciarJuego);
}

function SeleccionarMascotaJugador() {
  sectionSeleccionarMascota.style.display = "none";

  sectionSeleccionarAtaque.style.display = "flex";

  let comenzarJuego = 1;

  if (inputLeo.checked) {
    spanMascotaJugador.innerHTML = inputLeo.id;
  } else if (inputFenix.checked) {
    spanMascotaJugador.innerHTML = inputFenix.id;
  } else if (inputSeiya.checked) {
    spanMascotaJugador.innerHTML = inputSeiya.id;
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

  if (aleatorioEnemigo == 1) {
    spanMascotaEnemigo.innerHTML = "Aioria";
  } else if (aleatorioEnemigo == 2) {
    spanMascotaEnemigo.innerHTML = "Ikki";
  } else {
    spanMascotaEnemigo.innerHTML = "Seiya";
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
  if (ataqueEnemigo == ataqueJugador) {
    crearMensaje("EMPATE");
  } else if (
    (ataqueJugador == "FUEGO" && ataqueEnemigo == "AIRE") ||
    (ataqueJugador == "AGUA" && ataqueEnemigo == "FUEGO") ||
    (ataqueJugador == "AIRE" && ataqueEnemigo == "AGUA")
  ) {
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
  let nuevoAtaqueDelJugador = document.createElement("p");
  let nuevoAtaqueDelEnemigo = document.createElement("p");

  sectionMensajes.innerHTML = resultado;
  nuevoAtaqueDelJugador.innerHTML = ataqueJugador;
  nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo;

  ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
  ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal) {
  sectionMensajes.innerHTML = resultadoFinal;

  btnMascotaJugador.disabled = true;

  botonFuego.disabled = true;

  botonAgua.disabled = true;

  botonAire.disabled = true;

  sectionReiniciar.style.display = "block";
}

function botonReiniciarJuego() {
  location.reload();
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", iniciarJuego);
