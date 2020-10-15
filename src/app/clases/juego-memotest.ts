import { Juego } from "./juego";
import { Figura } from "./memotest";

export class Memotest extends Juego {
  public listaFiguras: Array<Figura> = null;
  public figuraSecreta: any = null;
  public parFiguras: Array<any>;

  constructor(figuras:Array<Figura>, nombre?: string, gano?: boolean, jugador?: string) {
    super("Memotest", gano, jugador);
    this.inicializar(figuras);
  }

  public inicializar(figuras:Array<Figura>) {
    this.gano = null;
    this.listaFiguras = [...figuras];
    let x = this.listaFiguras.findIndex(y => y.nombre === 'back');
    let y = this.listaFiguras.splice(x, 1)[0]
    this.figuraSecreta = y;
    this.listaFiguras.forEach(x => x.volteada = false);
    this.parFiguras = [];
    this.shuffle(this.listaFiguras);
  }

  public voltear(nombre: string) {
    if (this.parFiguras.length < 2) {
      let indiceFigura = this.listaFiguras.findIndex(figura => figura.nombre === nombre);
      if (indiceFigura != -1 && this.listaFiguras[indiceFigura].volteada !== true) {
        this.listaFiguras[indiceFigura].volteada = true;
        this.parFiguras.push([this.listaFiguras[indiceFigura], indiceFigura]);
      }
    }
  }

  public sonIguales() {
    if (this.parFiguras[0][0].valor === this.parFiguras[1][0].valor) {
      this.parFiguras.splice(0, this.parFiguras.length);
      return true;
    } else {
      return false;
    }
  }
  public devolverFiguras() {
    this.listaFiguras[this.parFiguras[0][1]].volteada = false;
    this.listaFiguras[this.parFiguras[1][1]].volteada = false;
    this.parFiguras.splice(0, this.parFiguras.length);
  }

  public verificar() {
    return true;
  }

  public shuffle(array: Array<Figura>) {
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
}

