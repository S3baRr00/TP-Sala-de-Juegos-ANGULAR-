import { Component, OnInit } from '@angular/core';
import { JuegoAnagrama } from '../../clases/juego-anagrama';

@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.css']
})
export class AnagramaComponent implements OnInit {

  ocultarVerificar;
  nuevoJuego:JuegoAnagrama;

  constructor() {
    this.ocultarVerificar= true;
    this.nuevoJuego= new JuegoAnagrama();
   }

  ngOnInit() {
  }

  NuevoJuego(){
    this.ocultarVerificar= false;
    this.nuevoJuego.gano = null;
    this.nuevoJuego.jugar();
  }

  verificar(){
    this.nuevoJuego.verificar();
    this.ocultarVerificar= true;
  }

}
