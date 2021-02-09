// Patrón módulo: encapsular mis variables JS para que no se usen en consola.
// Se empieza creando una función anónima o función de flecha
// para que se ejecute la función encerramos entre parentesis la función de flecha
(
    () => {
        'use strict'

        let deck = [];
        const tipos = ['C', 'D', 'H', 'S'], especiales = ['A', 'J', 'Q', 'K'];
        // let puntosJugador = 0, puntosComputadora = 0;
        let puntosJugadores = [];

        //Referencias HTML
        const btnNuevo = document.querySelector('#btn_nuevo'),
            btnPedir = document.querySelector('#btn_pedir'),
            btnDetener = document.querySelector('#btn_detener'),
            divCartas = document.querySelectorAll('.divCartas'),
            elmPuntosJugador = document.querySelectorAll('small');

        const nuevoJuego = (numeroJugadores = 2) => {
            // Inicializar el Deck
            deck = crearDeck();

            for (let i = 0; i < numeroJugadores; i++) { puntosJugadores[i] = 0; }

            // puntosJugador = 0;
            // puntosComputadora = 0;
            elmPuntosJugador[0].innerText = 0;
            elmPuntosJugador[1].innerText = 0;
            // Limpiar cartas
            // divCartasJugador.innerHTML = '';
            // divCartasComputadora.innerHTML = '';
            // Habilitar botones
            btnPedir.disabled = false;
            btnDetener.disabled = false;
        }

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
            return _.shuffle(deck);
        }

        crearDeck();

        // Función para pedir carta
        const pedirCarta = () => {
            // Evitar deck vacío
            if (deck.length === 0) throw ('No hay más cartas');

            return deck.pop();
        }

        // pedirCarta();

        const valorCarta = (carta) => {
            const valor = carta.substring(0, carta.length - 1);

            return (isNaN(valor) ? (valor === 'A' ? 11 : 10) : (valor * 1));
        }

        // turno:
        // 0: Primer jugador
        // ultimo: computadora
        const acumularPuntos = (carta, turno) => {
            // acumular
            puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
            // Mostrar en HTML
            elmPuntosJugador[turno].innerText = puntosJugadores[turno];

            return puntosJugadores[turno];
        }

        const crearCarta = (carta, turno) => {
            const imgCarta = document.createElement('img');

            imgCarta.src = `assets/cartas/${carta}.png`;
            imgCarta.classList.add('carta');

            divCartas[turno].append(imgCarta);
        }

        // Turno de la computadora
        const turnoComputadora = (puntosMin) => {
            let puntosComputadora = 0;

            do {
                const carta = pedirCarta(), turno = (puntosJugadores.length - 1);

                puntosComputadora = acumularPuntos(carta, turno);
                crearCarta(carta, turno);

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

        //Eventos
        btnNuevo.addEventListener('click', () => {
            nuevoJuego();
        });

        btnPedir.addEventListener('click', () => {
            const carta = pedirCarta() ,turno = 0,
                  puntosJugador = acumularPuntos(carta, turno);

            crearCarta(carta, turno);

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
    }
)();

