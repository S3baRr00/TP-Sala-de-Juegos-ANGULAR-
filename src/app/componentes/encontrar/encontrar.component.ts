import { Component, OnInit, OnDestroy } from '@angular/core';
import { Encontrar } from '../../clases/juego-encontrar';
import { ResultadosService } from '../../servicios/resultados.service';
import { AuthService } from '../../servicios/auth.service';
import { Resultados } from '../../clases/resultados.model';
import { ImagenesService } from '../../servicios/imagenes.service';

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
	public cartas: Array<any> = [];
	sub;

	constructor(private resSrv: ResultadosService, private user: AuthService, public imagenes:ImagenesService) { }

	ngOnInit(): void {
		this.traerCartas().then(cartaArr => this.cartas = [...cartaArr]);
		this.nuevoJuego = new Encontrar(this.cartas);
		this.ocultarVerificar = true;
		this.obtenerLista();
	}

	public NuevoJuego() {
		this.nuevoJuego.inicializar(this.cartas);
		this.ocultarVerificar = false;
		this.nuevoJuego.gano = null;
	}

	public async traerCartas() {
    let imagenArr: Array<any> = [];
    let aux: Array<any> = [];
    await this.imagenes.traerEncontrar().then(snap => {
      imagenArr = snap.data().imagenes;
      imagenArr.forEach(x => {
        let nombre: string = x.nombre.split('.')[0];
        let valor: number = 0;
        let img: string = x.url;
        if (x[0] === '1') {
          valor = 10;
        } else if (x[0] >= '2' && x[0] <= '9') {
          valor = parseInt(x[0]);
        } else if (x[0] === 'g') {
          valor = 0;
        } else {
          valor = 11;
        }
        aux.push({ nombre: nombre, img: img, valor: valor });
      });
    });
    return aux;
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
	
	public voltearCarta(nombre: string) {
		this.nuevoJuego.voltear(nombre);
		this.verificar();
	}

	public verificar() {
		if (this.nuevoJuego.encontroAs()) {
			this.resultado = 'Victoria';
			this.detalle = 'encontro el as de diamante';
			this.ocultarVerificar = true;
			this.generarResultado();
		} else if (this.nuevoJuego.encontroPicas()) {
			this.resultado = 'Derrota';
			this.detalle = 'encontro una carta de picas';
			this.ocultarVerificar = true;
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
