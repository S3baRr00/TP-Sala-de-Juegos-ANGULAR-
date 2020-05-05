import { Component, OnInit, OnDestroy } from "@angular/core";
import { Tateti } from "../../clases/juego-tateti";
import { ResultadosService } from '../../servicios/resultados.service';
import { AuthService } from '../../servicios/auth.service'
import { Resultados } from "../../clases/resultados.model";

@Component({
  selector: "app-tateti",
  templateUrl: "./tateti.component.html",
  styleUrls: ["./tateti.component.css"],
})
export class TatetiComponent implements OnInit, OnDestroy {
  public nuevoJuego: Tateti;
  public ocultarModal: boolean;
  public ocultarVerificar: boolean;
  public empate: boolean = false;
  listadoParaCompartir: Array<any>;
  sub;
  detalle: string;
  resultado: string;

  constructor(private resSrv: ResultadosService, private user: AuthService) {
    this.nuevoJuego = new Tateti();
    this.obtenerLista();
  }

  ngOnInit(): void {
    this.ocultarVerificar = true;
    this.ocultarModal = true;
  }

  public NuevoJuego() {

    this.nuevoJuego.celdasLibres = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    if (this.nuevoJuego.movsJugador.length != 0) {
      this.nuevoJuego.movsJugador.splice(0);
    }
    if (this.nuevoJuego.movsAi.length != 0) {
      this.nuevoJuego.movsAi.splice(0);
    }
    this.ocultarModal = false;
  }

  public elegirFigura(valor: Number) {
    if (valor == 1) {
      this.nuevoJuego.figuraJugador = './assets/imagenes/tateti-circulo.png';
      this.nuevoJuego.figuraAi = './assets/imagenes/tateti-cruz.png';
    } else {
      this.nuevoJuego.figuraJugador = './assets/imagenes/tateti-cruz.png';
      this.nuevoJuego.figuraAi = './assets/imagenes/tateti-circulo.png';
    }
    this.ocultarModal = true;
    this.ocultarVerificar = false;
    console.log('celdasLibres: ' + this.nuevoJuego.celdasLibres);
  }

  public asignarMov(num: number) {
    this.nuevoJuego.asignarCelda(this.nuevoJuego.movsJugador, num);
    if(!this.verificar()){
    let algo = setTimeout(() => {
      this.nuevoJuego.movAi();
      this.verificar();
    }, 1000);
  }
  }

  public verificar():boolean {
    if(this.nuevoJuego.ganoJugador()) {
      this.ocultarVerificar = true;
      this.detalle = 'gano contra la Ai';
      this.resultado = 'Victoria';
      if (this.user.isLoggedIn) {
        this.generarResultado();
      }
      return true;
    }
    if(this.nuevoJuego.ganoAi()) {
      this.ocultarVerificar = true;
      this.empate = false;
      this.detalle = 'perdio contra la Ai';
      this.resultado = 'Derrota';
      if (this.user.isLoggedIn) {
        this.generarResultado();
      }
      return true;
    }
    if(this.nuevoJuego.empate()) {
      this.empate = true;
      this.ocultarVerificar = true;
      this.detalle = 'empato con la Ai';
      this.resultado = 'Empate';
      if (this.user.isLoggedIn) {
        this.generarResultado();
      }
      return true;
    }
    return false;
  }


  obtenerLista() {
     this.sub = this.resSrv.getResultados().subscribe(data => {
        this.listadoParaCompartir = data.map(e => {
           const data = e.payload.doc.data() as Resultados;
           data.id = e.payload.doc.id;
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
        console.log(existe);
     } else {
        let resultados: Resultados = {
           'id': '',
           'usuario': this.user.user.email,
           'juego': this.nuevoJuego.nombre,
           'resultado': this.resultado,
           'detalles': this.detalle
        }
        this.resSrv.createResultado(resultados);
        console.log(resultados);
     }
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
