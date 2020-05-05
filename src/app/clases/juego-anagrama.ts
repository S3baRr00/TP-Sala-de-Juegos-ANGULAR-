import { Juego } from "./juego";
import { PALABRAS } from '../../assets/mock/mock-anagrama';

export class JuegoAnagrama extends Juego {
  public anagrama: string;
  public palabra: string;
  public respuesta: string;

  constructor(nombre?: string, gano?: boolean, jugador?: string) {
    super("Anagrama", gano, jugador);
  }

  public jugar(){
    this.palabra =PALABRAS[this.aleatorio(0,PALABRAS.length)];
    this.anagrama = this.desordenar(this.palabra);
    this.respuesta = "";
  }

  public verificar() {
    if (this.respuesta === this.palabra) {
      this.gano = true;
    }
     else {
      this.gano = false;
    }
    return this.gano;
  }

  private desordenar(palabra) {
    let arr:string[] = palabra.split("");
    arr = this.shuffle(arr);
    return arr.join('');
  }

  private aleatorio(a, b) {
    return Math.round(Math.random() * (b - a) + a);
  }

  public shuffle(array) {
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
