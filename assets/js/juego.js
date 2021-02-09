
// 2C = Two of Clubs
// 2D = Two of Diamonds
// 2H = Two of Hearts
// 2S = Two of Spades

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];
let puntosJugador = 0, puntosComputadora = 0;

//Referencias HTML
const btnNuevo = document.querySelector('#btn_nuevo');
const btnPedir = document.querySelector('#btn_pedir');
const btnDetener = document.querySelector('#btn_detener');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');
const elmPuntosJugador = document.querySelectorAll('small');

const crearDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }

    for (let tipo of tipos) {
        for (let esp of especiales) {
            deck.push(esp + tipo);
        }
    }

    // console.log(deck);
    deck = _.shuffle(deck);
    return deck;
}

crearDeck();

// Función para pedir carta
const pedirCarta = () => {
    // Evitar deck vacío
    if (deck.length === 0) throw ('No hay más cartas');

    const carta = deck.pop();

    return carta;
}

// pedirCarta();

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);

    return puntos = (isNaN(valor) ? (valor === 'A' ? 11 : 10) : (valor * 1));
}

// Turno de la computadora
const turnoComputadora = (puntosMin) => {
    do {
        const carta = pedirCarta();

        puntosComputadora = puntosComputadora + valorCarta(carta);


        elmPuntosJugador[1].innerText = puntosComputadora;

        // <!-- <img class="carta" src="assets/cartas/2S.png"> -->
        const imgCarta = document.createElement('img');

        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');

        divCartasComputadora.append(imgCarta);

        if (puntosMin > 21) { break; }

    } while (puntosComputadora < puntosMin && puntosMin <= 21);

    if (puntosComputadora === puntosMin) {
        console.info('Empatados...! :(');
    } else if (puntosMin > 21) {
        console.info('Perdiste contra la computadora...!');
    } else if (puntosMin > puntosComputadora) {
        console.info('Ganaste...!');
    } else if (puntosComputadora > 21) {
        console.info('Ganaste...! XD');
    } else { console.info('Perdiste contra la computadora...!'); }
}

const nuevoJuego = () => {
    // Inicializar el Deck
    deck = [];
    deck = crearDeck();
    puntosJugador = 0;
    puntosComputadora = 0;
    elmPuntosJugador[0].innerText = 0;
    elmPuntosJugador[1].innerText = 0;
    // Limpiar cartas
    divCartasJugador.innerHTML = '';
    divCartasComputadora.innerHTML = '';
    // Habilitar botones
    btnPedir.disabled = false;
    btnDetener.disabled = false;
}

//Eventos
btnNuevo.addEventListener('click', () => {
    nuevoJuego();
});

btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);

    elmPuntosJugador[0].innerText = puntosJugador;

    // <!-- <img class="carta" src="assets/cartas/2S.png"> -->
    const imgCarta = document.createElement('img');

    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');

    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21) {
        console.warn('Perdiste..!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
        console.info('Ganaste..!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
    }
});

btnDetener.addEventListener('click', () => {
    // const puntos = (document.querySelectorAll('small')[0].innerText *1);

    btnPedir.disabled = true;
    btnDetener.disabled = true;
    // turnoComputadora(puntos)
    turnoComputadora(puntosJugador);
});