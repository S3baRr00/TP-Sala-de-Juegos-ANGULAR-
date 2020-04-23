import { Juego } from "../clases/juego";

export class JuegoPiedraPapelTijera extends Juego {
  public figuras = ["Piedra", "Papel", "Tijera"];
  public figuraRival;
  public figuraJugador;
  public gano;

  constructor(nombre?: string, gano?: boolean, jugador?: string) {
    super("Piedra, Papel o Tijera", gano, jugador);
  }

  jugar(){
      this.figuraJugador = this.figuras[this.figuraJugador];
      this.figuraRival = this.figuras[Math.round(Math.random()*(2-0)+0)];
  }

  verificar(){
      if((this.figuraJugador === 'Piedra' && this.figuraRival === 'Tijera') ||
       (this.figuraJugador === 'Tijera' && this.figuraRival === 'Papel') ||
       (this.figuraJugador === 'Papel' && this.figuraRival === 'Piedra')){
            this.gano= true;
       }
       else{
           this.gano= false;
       }
       return this.gano;
  }
}
