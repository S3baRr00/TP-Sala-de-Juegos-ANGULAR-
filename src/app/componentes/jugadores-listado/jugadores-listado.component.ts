import { Component, OnInit } from '@angular/core';
import { JugadoresService } from '../../servicios/jugadores.service';
import { ResultadosService } from "../../servicios/resultados.service";
import { Resultados } from "../../clases/resultados.model";
import { Jugador } from "../../clases/jugador";


@Component({
  selector: 'app-jugadores-listado',
  templateUrl: './jugadores-listado.component.html',
  styleUrls: ['./jugadores-listado.component.css']
})
export class JugadoresListadoComponent implements OnInit {
  listado: Array<any>;
  listadoResultados: Array<any>
  flag: number;
  subJug;
  subRes;

  constructor(private JugadoresSrv: JugadoresService, private resServ: ResultadosService) {
    this.flag = 0;
    this.filtrar('Todas');
  }

  ngOnInit(): void {
  }

  public filtrar(filtro: string) {
    this.subJug = this.JugadoresSrv.getJugadores().subscribe(data => {
      this.listado = data.map(e => {
        const data = e.payload.doc.data() as Jugador;
        data.uid = e.payload.doc.id;
        return { ...data };
      });
      console.log(filtro);
      if (filtro !== 'Todas') {
        this.listado = data.map(e => {
          const data = e.payload.doc.data() as Jugador;
          data.uid = e.payload.doc.id;
          if (data.gano === filtro) {
            return { ...data };
          } else{
            return null;
          }
        });
      }
      if (filtro === 'Todas') {
        this.listado = data.map(e => {
          const data = e.payload.doc.data() as Jugador;
          data.uid = e.payload.doc.id;
          return { ...data };
        });
      }
      if (this.flag == 0) {
        this.actualizarJugadores();
        this.flag = 1;
      }
      console.log(this.listado);
    });
  }

  public actualizarJugadores() {
    this.subRes = this.resServ.getResultados().subscribe(data => {
      this.listadoResultados = data.map(e => {
        const data = e.payload.doc.data() as Resultados;
        data.id = e.payload.doc.id;
        return { ...data };
      });
      this.listado.forEach(jugador => {
        let total = this.listadoResultados.filter(resultado => resultado.usuario === jugador.usuario).length;
        let cumple = this.listadoResultados.filter(resultado => {
          if (resultado.usuario === jugador.usuario && resultado.resultado === 'Victoria') {
            return true;
          } else {
            return false;
          }
        }).length;
        let porcentaje = cumple / total;
        if (porcentaje >= 0.5) {
          jugador.gano = 'Ganador';
        }
        else {
          jugador.gano = 'Perdedor';
        }
        this.JugadoresSrv.updateJugador(jugador);
      });
    });
    this.subRes.unsubscribe();
  }

  ngOnDestroy() {
    this.subJug.unsubscribe();
  }

}
