import { Component, OnInit, OnDestroy } from '@angular/core';
import { Memotest } from '../../clases/juego-memotest';
import { ResultadosService } from '../../servicios/resultados.service';
import { AuthService } from '../../servicios/auth.service';
import { Resultados } from '../../clases/resultados.model';
import { ImagenesService } from '../../servicios/imagenes.service';

@Component({
	selector: 'app-memotest',
	templateUrl: './memotest.component.html',
	styleUrls: ['./memotest.component.css']
})
export class MemotestComponent implements OnInit, OnDestroy {
	public listadoParaCompartir: Array<any>
	public ocultarVerificar: boolean;
	public errores: number = 0;
	public resultado: string;
	public detalle: string;
	public nuevoJuego: Memotest;
	public figuras:Array<any>= [];
	sub;

	constructor(private resSrv: ResultadosService, private user: AuthService, private imagenes: ImagenesService) { }

	ngOnInit(): void {
		this.traerCartas().then(cartaArr => this.figuras = [...cartaArr]);
		this.nuevoJuego = new Memotest(this.figuras);
		this.ocultarVerificar = true;
		this.obtenerLista();
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

	public NuevoJuego() {
		this.nuevoJuego.inicializar(this.figuras);
		this.ocultarVerificar = false;
		this.nuevoJuego.gano = null;
	}


	public async traerCartas() {
		let imagenArr: Array<any> = [];
		let aux: Array<any> = [];
		await this.imagenes.traerMemotest().then(snap => {
			imagenArr = snap.data().imagenes;
			imagenArr.forEach(x => {
				let nombre: string = x.nombre.split('.')[0];
				let valor: number = 0;
				let img: string = x.url;
				if (nombre !== 'desconocido') {
					valor = parseInt(nombre);
					aux.push({ nombre: nombre + '_1', img: img, valor: valor, volteada: false });
					aux.push({ nombre: nombre + '_2', img: img, valor: valor, volteada: false });
				} else {
					aux.push({ nombre: "back", img: img, valor: 0, volteada: true });
				}
			});
		});
		return aux;
	}

	public voltearCarta(nombre: string) {
		if (this.nuevoJuego.parFiguras.length < 2) {
			this.nuevoJuego.voltear(nombre);
			console.log(this.nuevoJuego.parFiguras);
			if (this.nuevoJuego.parFiguras.length === 2) {
				if (!this.nuevoJuego.sonIguales()) {
					this.errores++;
					setTimeout(() => {
						this.nuevoJuego.devolverFiguras();
					}, 2000);
				}
			}
			this.verificar();
		}
	}

	public verificar() {
		if (this.nuevoJuego.listaFiguras.filter(figura => figura.volteada === true).length === this.nuevoJuego.listaFiguras.length &&
			this.errores < 25) {
			this.resultado = 'Victoria';
			this.detalle = 'encontro todos los pares cometiendo ' + this.errores + ' errores';
			this.ocultarVerificar = true;
			this.nuevoJuego.gano = true;
			this.generarResultado();
		} else if (this.errores >= 25) {
			this.resultado = 'Derrota';
			this.detalle = 'cometio 25 errores';
			this.ocultarVerificar = true;
			this.nuevoJuego.gano = false;
			this.generarResultado();
		}
	}


	public generarResultado() {
		if (this.user.isLoggedIn) {
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
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

}
