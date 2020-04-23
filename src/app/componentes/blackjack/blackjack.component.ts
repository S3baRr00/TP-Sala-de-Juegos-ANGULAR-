import { Component, OnInit } from '@angular/core';
import { Blackjack } from '../../clases/juego-blackjack';

@Component({
  selector: 'app-blackjack',
  templateUrl: './blackjack.component.html',
  styleUrls: ['./blackjack.component.css']
})
export class BlackjackComponent implements OnInit {
  public nuevoJuego: Blackjack;
  public ocultarVerificar:boolean;
  public cartaOcultaModal:boolean;
  public veintiunoModal:boolean;
  public abrirseModal:boolean;
  constructor() { 
    this.nuevoJuego = new Blackjack();
    this.ocultarVerificar = true;
    this.cartaOcultaModal = false;
    this.veintiunoModal = false;
    this.abrirseModal = false;
  }

  ngOnInit(): void {
  }

  NuevoJuego(){
    this.nuevoJuego.nuevaPartida();
    this.nuevoJuego.PrimeraMano();
    switch(this.nuevoJuego.puntosJugador)
    {
      case 21:
        this.veintiunoModal = true;
        break;
        case 9:
        case 10: 
        case 11:
          this.cartaOcultaModal = true;
        break;
        default:
          //condicion para modal de abrirse
          break;
    }
  }

}
