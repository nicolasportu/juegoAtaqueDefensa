const sectionReiniciar = document.getElementById("reiniciar");
const btnMascotaJugador = document.getElementById("btn-mascota");
const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");

const botonReinicio = document.getElementById("btn-reiniciar");

const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota");
const spanMascotaJugador = document.getElementById("mascota-jugador");

const spanMascotaEnemigo = document.getElementById("mascota-enemigo");

const spanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasEnemigo = document.getElementById("vidas-enemigo");

const sectionMensajes = document.getElementById("resultado");
const ataquesDelJugador = document.getElementById("ataques-del-jugador");
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo");
const contenedorTarjetas = document.getElementById('contenedorTarjetas');
const contenedorAtaques = document.getElementById('contenedorAtaques');

const sectionVerMapa = document.getElementById('ver-mapa');
const mapa = document.getElementById('mapa');

let caballeros = []
let ataqueJugador;
let ataqueEnemigo = [];
let opcionDeCaballeros;
let inputLeo;
let inputFenix;
let inputSeiya;
let caballeroJugador;
let ataquesCaballero;
let ataquesCaballerosEnemigo;
let botonFuego;
let botonAgua;
let botonAire;
let botones = [];
let ataquePlayer = [];
let indexAtaqueJugador;
let indexAtaqueEnemigo;
let victoriasJugador = 0;
let victoriasEnemigo = 0;
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
  { nombre: '🔥', id: 'btn-fuego' },
  { nombre: '🔥', id: 'btn-fuego' },
  { nombre: '🔥', id: 'btn-fuego' },
  { nombre: '💧', id: 'btn-agua' },
  { nombre: '🌪', id: 'btn-aire' },
);

fenix.ataques.push(
  { nombre: '🌪', id: 'btn-aire' },
  { nombre: '🌪', id: 'btn-aire' },
  { nombre: '🌪', id: 'btn-aire' },
  { nombre: '💧', id: 'btn-agua' },
  { nombre: '🔥', id: 'btn-fuego' },
);

seiya.ataques.push(
  { nombre: '💧', id: 'btn-agua' },
  { nombre: '💧', id: 'btn-agua' },
  { nombre: '💧', id: 'btn-agua' },
  { nombre: '🔥', id: 'btn-fuego' },
  { nombre: '🌪', id: 'btn-aire' },
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

  botonReinicio.addEventListener("click", botonReiniciarJuego);
}

function SeleccionarMascotaJugador() {
  sectionSeleccionarMascota.style.display = "none";

  sectionSeleccionarAtaque.style.display = "flex";


  if (inputLeo.checked) {
    spanMascotaJugador.innerHTML = inputLeo.id;
    caballeroJugador = inputLeo.id;
  } else if (inputFenix.checked) {
    spanMascotaJugador.innerHTML = inputFenix.id;
    caballeroJugador = inputFenix.id;
  } else if (inputSeiya.checked) {
    spanMascotaJugador.innerHTML = inputSeiya.id;
    caballeroJugador = inputSeiya.id;
  } else {
    alert("Tenes que seleccionar una mascota");

  }

  extraerAtaques(caballeroJugador);
  SeleccionarMascotaEnemigo();

}

function extraerAtaques(caballeroJugador) {
  let ataques
  for (let i = 0; i < caballeros.length; i++) {
    if (caballeroJugador == caballeros[i].nombre) {
      ataques = caballeros[i].ataques;
    }
  }

  mostrarAtaques(ataques);
}

function mostrarAtaques(ataques) {
  ataques.forEach((ataque) => {
    ataquesCaballero = `<button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>`

    contenedorAtaques.innerHTML += ataquesCaballero
  })

  botonFuego = document.getElementById("btn-fuego");
  botonAgua = document.getElementById("btn-agua");
  botonAire = document.getElementById("btn-aire");
  botones = document.querySelectorAll('.BAtaque');

}

function secuenciaDeAtaques() {
  botones.forEach((boton) => {
    boton.addEventListener('click', (e) => {
      if (e.target.textContent === '🔥') {
        ataquePlayer.push('FUEGO')
        console.log(ataquePlayer)
        boton.style.background = '#EB1D36';
        boton.style.display = 'none';
      } else if (e.target.textContent === '💧') {
        ataquePlayer.push('AGUA')
        console.log(ataquePlayer)
        boton.style.background = '#EB1D36';
        boton.style.display = 'none';
      } else {
        ataquePlayer.push('AIRE')
        console.log(ataquePlayer)
        boton.style.background = '#EB1D36';
        boton.style.display = 'none';
      }
      ataqueRandomEnemigo();
    })
  })
}

function SeleccionarMascotaEnemigo() {
  let aleatorioEnemigo = aleatorio(0, caballeros.length - 1);

  spanMascotaEnemigo.innerHTML = caballeros[aleatorioEnemigo].nombre
  ataquesCaballerosEnemigo = caballeros[aleatorioEnemigo].ataques
  secuenciaDeAtaques();
}

function ataqueRandomEnemigo() {
  let ataqueAleatorio = aleatorio(0, ataquesCaballerosEnemigo.length - 1);

  if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
    ataqueEnemigo.push('FUEGO');
  } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
    ataqueEnemigo.push('AGUA');
  } else {
    ataqueEnemigo.push('AIRE');
  }

  console.log(ataqueEnemigo)
  iniciarCombate()
}

function iniciarCombate() {
  if (ataquePlayer.length === 5) {
    combateSpace();
  }
}

function indexAmbosOponentes(jugador, enemigo) {
  indexAtaqueJugador = ataquePlayer[jugador]
  indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combateSpace() {
  for (let index = 0; index < ataquePlayer.length; index++) {
    if (ataquePlayer[index] === ataqueEnemigo[index]) {
      indexAmbosOponentes(index, index)
      crearMensaje("EMPATE");
    } else if (ataquePlayer[index] == 'FUEGO' && ataqueEnemigo[index] == 'AIRE') {
      indexAmbosOponentes(index, index)
      crearMensaje("GANASTE")
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador;
    } else if (ataquePlayer[index] == 'AGUA' && ataqueEnemigo[index] == 'FUEGO') {
      indexAmbosOponentes(index, index)
      crearMensaje("GANASTE")
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador;
    } else if (ataquePlayer[index] == 'AIRE' && ataqueEnemigo[index] == 'AGUA') {
      indexAmbosOponentes(index, index)
      crearMensaje("GANASTE")
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador;
    } else {
      indexAmbosOponentes(index, index)
      crearMensaje("PERDISTE")
      victoriasEnemigo++
      spanVidasEnemigo.innerHTML = victoriasEnemigo;
    }

  }

  resultadoVidas();
}

function resultadoVidas() {
  if (victoriasJugador === victoriasEnemigo) {
    crearMensajeFinal("PARTIDA EMPATADA");
  } else if (victoriasJugador > victoriasEnemigo) {
    crearMensajeFinal("FELICITACIONES, GANASTE!!");
  } else {
    crearMensajeFinal("PERDISTE LA PARTIDA");
  }
}

function crearMensaje(resultado) {
  let nuevoAtaqueDelJugador = document.createElement("p");
  let nuevoAtaqueDelEnemigo = document.createElement("p");

  sectionMensajes.innerHTML = resultado;
  nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador;
  nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo;

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
