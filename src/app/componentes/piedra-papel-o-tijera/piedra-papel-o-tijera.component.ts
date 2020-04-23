import { Component, OnInit } from "@angular/core";
import { JuegoPiedraPapelTijera } from "../../clases/juego-piedra-papel-tijera";

@Component({
  selector: "app-piedra-papel-o-tijera",
  templateUrl: "./piedra-papel-o-tijera.component.html",
  styleUrls: ["./piedra-papel-o-tijera.component.css"],
})
export class PiedraPapelOTijeraComponent implements OnInit {
  nuevoJuego: JuegoPiedraPapelTijera;
  empate=null;
  ocultarVerificar: boolean;
  constructor() {
    this.ocultarVerificar = true;
    this.nuevoJuego = new JuegoPiedraPapelTijera();
    console.info("Inicio PPT");
  }

  obtenerValor(valor: string){
    this.nuevoJuego.figuraJugador = parseInt(valor);
    console.log(valor);
  }

  ngOnInit(): void {}

  NuevoJuego() {
    this.ocultarVerificar = false;
    this.empate= null;
    this.nuevoJuego.gano = null;
  }

  verificar() {
    this.nuevoJuego.jugar();
    console.log('jugador rival:'+ this.nuevoJuego.figuraRival);
    console.log('jugador:'+ this.nuevoJuego.figuraJugador);
    if (!this.nuevoJuego.verificar()) {
      if (this.nuevoJuego.figuraJugador === this.nuevoJuego.figuraRival) {
        this.empate = true;
        this.nuevoJuego.figuraJugador = null;
      } else {
        this.empate = false;
        this.ocultarVerificar = true;
        this.nuevoJuego.figuraJugador = null;
      }
    } else{
      this.ocultarVerificar = true;
      this.nuevoJuego.figuraJugador = null;
    }
  }
}
