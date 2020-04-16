import { Juego } from "../clases/juego";

export class JuegoAgilidad extends Juego {
  public operador;
  public numeroUno;
  public numeroDos;
  public respuesta;
  public respuestaIngresada;
  public gano;

  constructor(nombre?: string, gano?: boolean, jugador?: string)
  {
    super("Adivina el número", gano, jugador);
  }
  public verificar()
  {
    if (this.respuesta == parseInt(this.respuestaIngresada)) {
      this.gano = true;
    }
    if (this.gano) {
      return true;
    } else {
      return false;
    }
  }

  public generarOperacion() {
      let operadores = ['+','-','*','/'];
      this.operador = operadores[this.aleatorio(0,3)];

      this.numeroUno = this.aleatorio(0,10);
      if(this.operador === '/')
      {
        this.numeroDos = this.aleatorio(1,this.numeroUno);
      } 
      else if(this.operador === '*')
      {
        this.numeroDos = this.aleatorio(0,this.numeroUno);
      }
      else{
          this.numeroDos = this.aleatorio(0,10);
      }
      this.respuesta = eval(this.numeroUno + this.operador + this.numeroDos);
      this.gano = false;
  }

    private aleatorio(a,b) 
    {
        return Math.round(Math.random()*(b-a)+a);
    }
}
