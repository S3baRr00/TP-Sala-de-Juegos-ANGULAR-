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

  constructor(private JugadoresSrv: JugadoresService, private resServ: ResultadosService) {
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
      console.log(this.listado);
    });
  }

  ngOnDestroy() {
    this.subJug.unsubscribe();
  }

}
