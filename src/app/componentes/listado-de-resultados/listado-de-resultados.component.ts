import { Component, OnInit, Input, EventEmitter } from "@angular/core";
import { ResultadosService } from "../../servicios/resultados.service";
import { Resultados } from "../../clases/resultados.model";

@Component({
  selector: "app-listado-de-resultados",
  templateUrl: "./listado-de-resultados.component.html",
  styleUrls: ["./listado-de-resultados.component.css"]
})

export class ListadoDeResultadosComponent implements OnInit {
  @Input() listado: Array<any>;

  constructor(private resultadoSrv: ResultadosService) {
  }

  ngOnInit() {}

  public ver() {
    console.info(this.listado);
  }
}
