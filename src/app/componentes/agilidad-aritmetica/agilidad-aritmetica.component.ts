import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from "@angular/core";
import { JuegoAgilidad } from "../../clases/juego-agilidad";
import { ResultadosService } from '../../servicios/resultados.service';
import { AuthService } from '../../servicios/auth.service'
import { Resultados } from "../../clases/resultados.model";

@Component({
  selector: "app-agilidad-aritmetica",
  templateUrl: "./agilidad-aritmetica.component.html",
  styleUrls: ["./agilidad-aritmetica.component.css"],
})
export class AgilidadAritmeticaComponent implements OnInit, OnDestroy {
  @Output()
  enviarJuego: EventEmitter<any> = new EventEmitter<any>();
  nuevoJuego: JuegoAgilidad;
  ocultarVerificar: boolean;
  Tiempo: number;
  repetidor: any;
  sub;
  listadoParaCompartir: Array<any>;
  detalle: string;
  resultado: string;

  ngOnInit() { }
  constructor(private resSrv: ResultadosService, private user: AuthService) {
    this.ocultarVerificar = true;
    this.Tiempo = 5;
    this.nuevoJuego = new JuegoAgilidad();
    console.info("Inicio agilidad");
    this.obtenerLista();
  }
  NuevoJuego() {
    this.ocultarVerificar = false;
    this.nuevoJuego.generarOperacion();
    this.repetidor = setInterval(() => {
      this.Tiempo--;
      console.log("llego", this.Tiempo);
      if (this.Tiempo == 0) {
        clearInterval(this.repetidor);
        this.verificar();
        this.ocultarVerificar = true;
        this.Tiempo = 5;
      }
    }, 1000);
  }
  verificar() {
    if (this.nuevoJuego.verificar()) {
      this.ocultarVerificar = false;
      this.detalle = 'resolvio el problema con ' + this.Tiempo + ' segundo/s de sobra';
      this.resultado = 'Victoria';
      clearInterval(this.repetidor);
    } else {
      this.detalle = 'no pudo resolver el problema a tiempo';
      this.resultado = 'Derrota';
      clearInterval(this.repetidor);
    }
    this.ocultarVerificar = true;
    if (this.user.isLoggedIn) {
      this.generarResultado();
    }
  }


  obtenerLista() {
    this.sub = this.resSrv.getResultados().subscribe(data => {
      this.listadoParaCompartir = data.map(e => {
        const data = e.payload.doc.data() as Resultados;
        const id = e.payload.doc.id;
        data.id = id;
        return { ...data };
      });
    });
  }


  generarResultado() {
    if (this.user.isLoggedIn) {
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
          'detalles': this.detalle,
        }
        this.resSrv.createResultado(resultados);
      }
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
