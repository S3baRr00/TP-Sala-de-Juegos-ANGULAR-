import { Component, OnInit, OnDestroy } from "@angular/core";
import { JuegoPiedraPapelTijera } from "../../clases/juego-piedra-papel-tijera";
import { ResultadosService } from '../../servicios/resultados.service';
import { AuthService } from '../../servicios/auth.service'
import { Resultados } from "../../clases/resultados.model";
import { ImagenesService } from '../../servicios/imagenes.service';

@Component({
  selector: "app-piedra-papel-o-tijera",
  templateUrl: "./piedra-papel-o-tijera.component.html",
  styleUrls: ["./piedra-papel-o-tijera.component.css"],
})
export class PiedraPapelOTijeraComponent implements OnInit, OnDestroy {
  nuevoJuego: JuegoPiedraPapelTijera;
  empate = null;
  ocultarVerificar: boolean;
  sub;
  listadoParaCompartir: Array<any>;
  detalle: string;
  resultado: string;
  public imgPptPiedra: string;
  public imgPptPapel: string;
  public imgPptTijera: string;

  constructor(private resSrv: ResultadosService, private user: AuthService, public imagenes: ImagenesService) {
    this.ocultarVerificar = true;
    this.nuevoJuego = new JuegoPiedraPapelTijera();
    console.info("Inicio PPT");
    this.obtenerLista();
  }

  obtenerValor(valor: string) {
    this.nuevoJuego.figuraJugador = parseInt(valor);
    console.log(valor);
  }

  ngOnInit(): void {
    this.imagenes.traerPpt().then(snap =>{
      this.imgPptPiedra = snap.data().imagenes.find(x => x.nombre === 'ppt-piedra.png').url;
      this.imgPptPapel = snap.data().imagenes.find(x => x.nombre === 'ppt-papel.png').url;
      this.imgPptTijera = snap.data().imagenes.find(x => x.nombre === 'ppt-tijera.png').url;
    });
  }

  NuevoJuego() {
    this.ocultarVerificar = false;
    this.empate = null;
    this.nuevoJuego.gano = null;
  }

  verificar() {
    this.nuevoJuego.jugar();
    console.log('jugador rival:' + this.nuevoJuego.figuraRival);
    console.log('jugador:' + this.nuevoJuego.figuraJugador);
    if (!this.nuevoJuego.verificar()) {
      if (this.nuevoJuego.figuraJugador === this.nuevoJuego.figuraRival) {
        this.empate = true;
        this.detalle = 'ambos usaron ' + this.nuevoJuego.figuraJugador;
        this.resultado = 'Empate';
        this.nuevoJuego.figuraJugador = null;
      } else {
        this.empate = false;
        this.detalle = 'uso ' + this.nuevoJuego.figuraJugador + ' contra ' + this.nuevoJuego.figuraRival;
        this.resultado = 'Derrota';
        this.ocultarVerificar = true;
        this.nuevoJuego.figuraJugador = null;
      }
    } else {
      this.ocultarVerificar = true;
      this.detalle = 'uso ' + this.nuevoJuego.figuraJugador + ' contra ' + this.nuevoJuego.figuraRival;
      this.resultado = 'Victoria';
      this.nuevoJuego.figuraJugador = null;
    }
    if (this.user.isLoggedIn) {
      this.generarResultado();
    }
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
    if (this.user.isLoggedIn) {
      let existe = this.listadoParaCompartir.filter(resultados => resultados.juego === this.nuevoJuego.nombre).
        find(resultados => resultados.usuario === this.user.user.email);
      console.log(existe);
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
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}

