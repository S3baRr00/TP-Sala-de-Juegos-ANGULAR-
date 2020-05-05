import { Juego } from "./juego";
import { Cartas } from "./encuentra-cartas";
import { cartas } from "../../assets/mock/mock-encontrar";

export class Encontrar extends Juego {
  public listaLibres: Cartas[];
  public aux: Cartas[];
  public listaDescubiertos: Cartas[];
  public cartaSecreta: Cartas;
  public scopeCarta:Cartas;

  constructor(nombre?: string, gano?: boolean, jugador?: string) {
    super("Encontrar el Diamante", gano, jugador);
    this.listaLibres= [];
    this.listaDescubiertos = [];
    this.aux = [];
    this.gano = null;
    this.scopeCarta = null;
    this.inicializar();
  }

  public inicializar() {
    this.listaLibres= [];
    this.listaDescubiertos = [];
    this.aux = [];
    this.gano = null;
    this.scopeCarta = null;
    this.listaLibres = [...cartas];
    this.listaLibres = this.shuffle(this.listaLibres);
    this.aux = [...this.listaLibres];
    this.cartaSecreta = { nombre: "back", img: "./assets/imagenes/encontrar cartas/gray_back.png", valor: 0 }
  }

  public voltear(nombre: string) {
    let indiceCarta = this.listaLibres.findIndex(carta => carta.nombre === nombre);
    if (indiceCarta != -1) {
      let carta = this.listaLibres.splice(indiceCarta, 1)[0];
      this.scopeCarta = carta;     
      this.listaDescubiertos.push(carta);
    }
  }

  public encontroPicas(){
    let hayPicas = this.listaDescubiertos.find(carta => carta.nombre.includes('S'));
    if (hayPicas) {
      this.gano = false;
      return true;
    }
    return false;
  }

  public encontroAs(){
    let asDiamanteIndice = this.listaDescubiertos.find(carta => carta.nombre === 'AD');
    if (asDiamanteIndice) {
      this.gano = true;
      return true;
    } 
    return false;
  }

  public verificar(){
    return true;
  }

  public shuffle(array: Array<Cartas>) {
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

  public incluyeNombre(nombre: string) {
    let verdadero;
    for (let carta of this.listaLibres) {
      if (carta.nombre === nombre) {
        verdadero = true;
        break;
      }
    }
    if (verdadero) {
      return true;
    }
    return false;
  }
}