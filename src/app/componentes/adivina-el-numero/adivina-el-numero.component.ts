import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { JuegoAdivina } from '../../clases/juego-adivina';
import { ResultadosService } from '../../servicios/resultados.service';
import { AuthService } from '../../servicios/auth.service'
import { Resultados } from "../../clases/resultados.model";

@Component({
  selector: 'app-adivina-el-numero',
  templateUrl: './adivina-el-numero.component.html',
  styleUrls: ['./adivina-el-numero.component.css']
})
export class AdivinaElNumeroComponent implements OnInit, OnDestroy {
  @Output() enviarJuego: EventEmitter<any> = new EventEmitter<any>();

  nuevoJuego: JuegoAdivina;
  Mensajes: string;
  contador: number;
  ocultarVerificar: boolean;
  sub;
  listadoParaCompartir: Array<any>;
  detalle: string;
  resultado: string;

  constructor(private resSrv: ResultadosService, private user: AuthService) {
    this.nuevoJuego = new JuegoAdivina();
    console.info("numero Secreto:", this.nuevoJuego.numeroSecreto);
    this.ocultarVerificar = false;
    this.obtenerLista();
  }

  ngOnInit() {
  }

  generarnumero() {
    this.nuevoJuego.generarnumero();
    this.contador = 0;
  }

  verificar() {
    this.contador++;
    this.ocultarVerificar = true;
    console.info("numero Secreto:", this.nuevoJuego.gano);
    if (this.nuevoJuego.verificar()) {

      this.enviarJuego.emit(this.nuevoJuego);
      this.MostarMensaje("Sos un Genio!!!", true);
      this.nuevoJuego.numeroSecreto = 0;
      this.detalle = 'le tomo ' + this.contador + ' intentos';
      this.resultado = 'Victoria';
      if (this.user.isLoggedIn) {
        this.generarResultado();
      }
    } else if (!(this.nuevoJuego.verificar()) && this.contador > 10) {
      this.MostarMensaje("perdiste! Te tomo demasiados intentos");
      this.nuevoJuego.numeroSecreto = 0;
      this.detalle = 'le tomo mas de 10 intentos';
      this.resultado = 'Derrota';
      if (this.user.isLoggedIn) {
        this.generarResultado();
      }
    } else {
      let mensaje: string;
      switch (this.contador) {
        case 1:
          mensaje = "No, intento fallido, animo";
          break;
        case 2:
          mensaje = "No,Te estaras Acercando???";
          break;
        case 3:
          mensaje = "No es, Yo crei que la tercera era la vencida.";
          break;
        case 4:
          mensaje = "No era el  " + this.nuevoJuego.numeroIngresado;
          break;
        case 5:
          mensaje = " intentos y nada.";
          break;
        case 6:
          mensaje = "Afortunado en el amor";
          break;

        default:
          mensaje = "Ya le erraste " + this.contador + " veces";
          break;
      }
      this.MostarMensaje("#" + this.contador + " " + mensaje + " ayuda :" + this.nuevoJuego.retornarAyuda());
    }
    console.info("numero Secreto:", this.nuevoJuego.gano);
  }

  MostarMensaje(mensaje: string = "este es el mensaje", ganador: boolean = false) {
    this.Mensajes = mensaje;
    var x = document.getElementById("snackbar");
    if (ganador) {
      x.className = "show Ganador";
    } else {
      x.className = "show Perdedor";
    }
    var modelo = this;
    setTimeout(function() {
      x.className = x.className.replace("show", "");
      modelo.ocultarVerificar = false;
    }, 3000);
    console.info("objeto", x);
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
          'detalles': 'le tomo ' + this.contador + ' intentos'
        }
        this.resSrv.createResultado(resultados);
      }
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
