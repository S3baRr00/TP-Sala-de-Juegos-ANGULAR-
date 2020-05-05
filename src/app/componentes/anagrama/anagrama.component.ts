import { Component, OnInit, OnDestroy } from '@angular/core';
import { JuegoAnagrama } from '../../clases/juego-anagrama';
import { ResultadosService } from '../../servicios/resultados.service';
import { AuthService } from '../../servicios/auth.service'
import { Resultados } from "../../clases/resultados.model";

@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.css']
})
export class AnagramaComponent implements OnInit, OnDestroy {

  ocultarVerificar;
  nuevoJuego: JuegoAnagrama;
  listadoParaCompartir: Array<any>;
  sub;
  detalle: string;
  resultado: string;

  constructor(private resSrv: ResultadosService, private user: AuthService) {
    this.ocultarVerificar = true;
    this.nuevoJuego = new JuegoAnagrama();
    this.obtenerLista();
  }

  ngOnInit() {
  }

  NuevoJuego() {
    this.ocultarVerificar = false;
    this.nuevoJuego.gano = null;
    this.nuevoJuego.jugar();
    console.log('palabra: ' + this.nuevoJuego.palabra);
  }

  verificar() {
    if (this.nuevoJuego.verificar()) {
      this.detalle = 'descifro la palabra ' + this.nuevoJuego.palabra;
      this.resultado = 'Victoria';
    } else {
      this.detalle = 'no descifro la palabra ' + this.nuevoJuego.palabra;
      this.resultado = 'Derrota';
    }
    if (this.user.isLoggedIn) {
      this.generarResultado();
    }
    this.ocultarVerificar = true;
  }

  obtenerLista() {
   this.sub= this.resSrv.getResultados().subscribe(data => {
      this.listadoParaCompartir = data.map(e => {
        const data = e.payload.doc.data() as Resultados;
        const id = e.payload.doc.id;
        data.id = id;
        return { ...data };
      });
    });
  }

  generarResultado() {
    let existe = this.listadoParaCompartir.filter(resultados => resultados.juego === this.nuevoJuego.nombre).
      find(resultados => resultados.usuario === this.user.user.email);
    if (existe != undefined) {
      existe.resultado = this.resultado;
      existe.detalles = this.detalle;
      this.resSrv.updateResultado(existe);
    } else {
      let resultados: Resultados = {
        'id': '',
        'usuario': this.user.user.email,
        'juego': this.nuevoJuego.nombre,
        'resultado': this.resultado,
        'detalles': this.detalle
      }
      this.resSrv.createResultado(resultados);
    }
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}

