import { Juego } from "./juego";

export class Tateti extends Juego {
  public movsJugador: number[];
  public movsAi: number[];
  public movsGanadores: number[][];
  public celdasLibres: any[];
  public figuraJugador: string;
  public figuraAi: string;

  constructor(nombre?: string, gano?: boolean, jugador?: string) {
    super("Ta-Te-Ti", gano, jugador);
    this.movsAi = [];
    this.movsJugador = [];
    this.celdasLibres = []
    this.movsGanadores = [
      [1, 2, 3],
      [1, 5, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [4, 5, 6],
      [7, 8, 9],
      [7, 5, 3]
    ];
  }

  public asignarCelda(listaMovs: number[], celda: number) {
    let index = this.celdasLibres.indexOf(celda);
    if (index != -1) {
      listaMovs.push(celda);
      this.celdasLibres.splice(index, 1, '');
    }
  }

  public movAi() {
    let val = this.celdasLibres.filter(x => x != '');
    let mejorMov = 0;
    let arrIndicesJugadas = [0, 0, 0, 0, 0, 0, 0, 0];
    this.movsAi.forEach(valor => {
      this.movsGanadores.forEach(jugada => {
        let indiceJugada = this.movsGanadores.indexOf(jugada);
        if ((indiceJugada != 1 || indiceJugada != undefined) && jugada.includes(valor)) {
          arrIndicesJugadas.splice(indiceJugada, 1, arrIndicesJugadas[indiceJugada] + 1);
        }
      });
    });
    for (let coinc of arrIndicesJugadas) {
      if (coinc == 2) {
        let indice;
        for (let x of this.movsGanadores[arrIndicesJugadas.indexOf(coinc)]) {    
          if (val.includes(x)) {
            indice = x;
            break;
          }
        }
        if (val.includes(indice)) {
          if (indice !== -1 || indice !== undefined) {
            if (mejorMov == 0) {
              this.asignarCelda(this.movsAi, indice);
              mejorMov = 1;
            }
            break;
          }
        }
      }
    }
    if (mejorMov == 0) {
      let celdaAi = this.aleatorio(0, val.length - 1);
      this.asignarCelda(this.movsAi, val[celdaAi]);
    }
  }

  public ganoJugador(): boolean {
    let verdadero;
    for (let jugada of this.movsGanadores) {
      verdadero = jugada.every(valor => this.movsJugador.includes(valor));
      if (verdadero) {
        break;
      }
    }
    if (verdadero) {
      this.gano = true;
      return true;
    }
    return false;
  }

  public ganoAi(): boolean {
    let verdadero;
    for (let jugada of this.movsGanadores) {
      verdadero = jugada.every(valor => this.movsAi.includes(valor));
      if (verdadero) {
        break;
      }
    }
    if (verdadero) {
      this.gano = false;
      return true;
    }
    return false;
  }

  public empate(): boolean {
    if (this.celdasLibres.every(x => x === '') && !this.ganoJugador() && !this.ganoAi()) {
      this.gano = false;
      return true;
    }
    return false;
  }

  public verificar() {
    if (true) {
      this.gano = true;
    } else {
      this.gano = false;
    }
    return this.gano
  }

  private aleatorio(a, b) {
    return Math.round(Math.random() * (b - a) + a);
  }
}
