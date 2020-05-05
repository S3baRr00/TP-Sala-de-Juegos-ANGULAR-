import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ResultadosService } from "../../servicios/resultados.service";
import { Resultados } from "../../clases/resultados.model";

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})

export class ListadoComponent implements OnInit, OnDestroy {
  public listadoParaCompartir: Array<any>;
  public listadoAux: Array<any>;
  public filtroResultado: string = 'Todas';
  public filtroJuego: string = '';
  public filtroJugador: string = '';
  sub;

  constructor(private resultadoSrv: ResultadosService) {
    this.filtrar();
  }

  ngOnInit(): void { }

  public filtrar() {
    this.sub = this.resultadoSrv.getResultados().subscribe(data => {
      this.listadoParaCompartir = data.map(e => {
        const data = e.payload.doc.data() as Resultados;
        data.id = e.payload.doc.id;
        return { ...data };
      });
      if (this.filtroResultado !== 'Todas') {
        this.listadoParaCompartir = this.listadoParaCompartir.filter(r => r.resultado === this.filtroResultado);
      }
      if (this.filtroJuego !== '') {
        this.listadoParaCompartir = this.listadoParaCompartir.filter(r => r.juego === this.filtroJuego);
      }
      if (this.filtroJugador !== '') {
        this.listadoParaCompartir = this.listadoParaCompartir.filter(r => r.usuario === this.filtroJugador);
      }
      if (this.filtroResultado === 'Todas' && this.filtroJugador === '' && this.filtroJuego === '') {
        this.listadoParaCompartir = data.map(e => {
          const data = e.payload.doc.data() as Resultados;
          data.id = e.payload.doc.id;
          return { ...data };
        });
      }
    });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
