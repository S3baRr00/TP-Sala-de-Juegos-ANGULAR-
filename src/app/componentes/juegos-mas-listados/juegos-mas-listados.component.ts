import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultadosService } from "../../servicios/resultados.service";
import { Resultados } from "../../clases/resultados.model";

@Component({
	selector: 'app-juegos-mas-listados',
	templateUrl: './juegos-mas-listados.component.html',
	styleUrls: ['./juegos-mas-listados.component.css']
})
export class JuegosMasListadosComponent implements OnInit, OnDestroy {
	public juego: string;
	public listadoParaCompartir: Array<any>;
	public nuevo;
	sub;

	constructor(private route: ActivatedRoute, private router: Router, private resultadoSrv: ResultadosService) {
		this.router.routeReuseStrategy.shouldReuseRoute = function() {
			return false;
		}
		this.juego = route.snapshot.paramMap.get('juego');
		this.listadoParaCompartir = new Array<any>();
		this.sub= this.resultadoSrv.resultados.subscribe(listado =>{
			this.listadoParaCompartir = listado;
			this.filtrarListaJuego();
		});
	}

	filtrarListaJuego() {
		let filtro;
		switch (this.juego) {
			case "AdivinaMasListado":
				filtro = 'Adivina el número';
				break;
			case "AgilidadMasListado":
				filtro = 'Agilidad Matematica';
				break;
			case "PptMasListado":
				filtro = 'Piedra, Papel o Tijera';
				break;
			case "AnagramaMasListado":
				filtro = 'Anagrama';
				break;
			case "TatetiMasListado":
				filtro = 'Ta-Te-Ti';
				break;
			case "EncontrarMasListado":
				filtro = 'Encontrar el Diamante';
				break;
				case "MemotestMasListado":
				filtro = 'Memotest';
				break;
		}
		this.listadoParaCompartir = this.listadoParaCompartir.filter(resultados => resultados.juego === filtro);
	}

	ngOnInit(): void {
	}

	ngOnDestroy(){
		this.sub.unsubscribe();
	}
}
