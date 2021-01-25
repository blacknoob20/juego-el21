
// 2C = Two of Clubs
// 2D = Two of Diamonds
// 2H = Two of Hearts
// 2S = Two of Spades

let deck = [];
const tipos = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];
let puntosJugador =0, puntosComputadora =0;

//Referencias HTML
const btnPedir = document.querySelector('#btn_pedir');
const elmPuntosJugador = document.querySelectorAll('small');

const crearDeck = () => {
    for(let i=2; i<= 10; i++){
        for(let tipo of tipos){
            deck.push(i+tipo);
        }
    }

    for(let tipo of tipos){
        for(let esp of especiales){
            deck.push(esp+tipo);
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
    if(deck.length === 0) throw('No hay más cartas');

    const carta = deck.pop();
    
    return carta;
}

// pedirCarta();

const valorCarta = (carta) => {
    const valor = carta.substring(0,carta.length -1);
    
    return puntos = (isNaN(valor)? (valor === 'A' ? 11:10) : (valor *1));
}

//Eventos
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);

    console.log({carta,puntosJugador});

    elmPuntosJugador[0].innerText = puntosJugador;
});