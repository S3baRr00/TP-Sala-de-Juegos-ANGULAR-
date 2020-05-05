import { Component, OnInit, OnDestroy } from '@angular/core';
import { Encontrar } from '../../clases/juego-encontrar';
import { ResultadosService } from '../../servicios/resultados.service';
import { AuthService } from '../../servicios/auth.service';
import { Resultados } from '../../clases/resultados.model';

@Component({
	selector: 'app-encontrar',
	templateUrl: './encontrar.component.html',
	styleUrls: ['./encontrar.component.css']
})
export class EncontrarComponent implements OnInit, OnDestroy {
	public listadoParaCompartir: Array<any>
	public ocultarVerificar: boolean;
	public resultado: string;
	public detalle: string;
	public nuevoJuego: Encontrar;
	sub;

	constructor(private resSrv: ResultadosService, private user: AuthService) {
		this.nuevoJuego = new Encontrar();
		this.ocultarVerificar = true;
		this.obtenerLista();
	}

	ngOnInit(): void {
	}

	public NuevoJuego() {
		this.nuevoJuego.inicializar();
		this.ocultarVerificar = false;
		this.nuevoJuego.gano = null;
	}

	public voltearCarta(nombre: string) {
		this.nuevoJuego.voltear(nombre);
		this.verificar();
	}

	public verificar() {
		if (this.nuevoJuego.encontroAs()) {
			this.resultado = 'Victoria';
			this.detalle = 'encontro el as de diamante';
			this.generarResultado();
			this.ocultarVerificar = true;
		} else if (this.nuevoJuego.encontroPicas()) {
			this.resultado = 'Derrota';
			this.detalle = 'encontro una carta de picas';
			this.generarResultado();
			this.ocultarVerificar = true;
		}
	}

	public obtenerLista() {
		this.sub = this.resSrv.getResultados().subscribe(data => {
			this.listadoParaCompartir = data.map(e => {
				const data = e.payload.doc.data() as Resultados;
				const id = e.payload.doc.id;
				data.id = id;
				return { ...data };
			});
		});
	}

	public generarResultado() {
		let existe = this.listadoParaCompartir.filter(resultados => resultados.juego === this.nuevoJuego.nombre).
			find(resultados => resultados.usuario === this.user.user.email);
		if (existe != undefined) {
			existe.resultado = this.resultado;
			existe.detalles = this.detalle;
			this.resSrv.updateResultado(existe);
		} else {
			let resultados: Resultados = {
				'id': '',
				'usuario': this.user.user.email,
				'juego': this.nuevoJuego.nombre,
				'resultado': this.resultado,
				'detalles': this.detalle
			}
			this.resSrv.createResultado(resultados);
		}
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

}
