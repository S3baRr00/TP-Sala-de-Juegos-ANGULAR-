import { Juego } from "./juego";
import { Cartas } from "./blackjack-cartas";
import { CARTAS } from "../../assets/mock/mock-blackjack";

export class Blackjack extends Juego {
  public InicialJugador: number = 100;
  public InicialBanca: number = 1000;
  public cartasNuevas: Cartas[];
  public cartasUsadas: Cartas[];
  public saldoTotalJugador: number;
  public saldoTotalBanca: number;
  public cartasJugador: Cartas[];
  public cartasBanca: Cartas[];
  public puntosJugador: number;
  public puntosBanca: number;

  constructor(nombre?: string, gano?: boolean, jugador?: string) {
    super("21 blackjack", gano, jugador);
  }

  public nuevaPartida() {
    this.saldoTotalJugador = this.InicialJugador;
    this.saldoTotalBanca = this.InicialBanca;
    this.cartasNuevas = this.shuffle(CARTAS);
  }

  public PrimeraMano(){
    while( this.cartasJugador.length != 2 && this.cartasBanca.length != 2){
      this.repartir(this.cartasJugador);
      this.repartir(this.cartasBanca);
    }
    this.puntosJugador= this.contarPuntos(this.cartasJugador);
    this.puntosBanca= this.contarPuntos(this.cartasBanca);
  }

  public repartir(arr:Cartas[]){
     arr.push(this.cartasNuevas.pop());
     this.puntosJugador= this.contarPuntos(arr);
  }

  public contarPuntos(arr:Cartas[]){
    return arr.reduce((acum , cartaActual) => (acum + cartaActual.valor),0);
  }

  public verificar() {
    if (
      this.saldoTotalJugador > this.InicialJugador ||
      this.saldoTotalBanca == 0
    ) {
      this.gano = true;
    }
    if (this.gano) {
      return true;
    } else {
      return false;
    }
  }

  public shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
}
