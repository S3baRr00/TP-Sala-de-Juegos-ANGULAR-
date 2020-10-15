import { Component, OnInit } from '@angular/core';
import { ImagenesService } from '../../servicios/imagenes.service';

@Component({
	selector: 'app-principal',
	templateUrl: './principal.component.html',
	styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
	public status: any = {
		isFirstOpen: true,
		isFirstDisabled: false
	};
	public imgSaladejuegos: string;
	public imgListado: string;
	public imgConfiguracionnueva: string;
	public imgJugadores: string;
	public general: Array<any> = [];
	constructor(public imagenes: ImagenesService) {}
	ngOnInit() {
		this.imagenes.traerGeneral().then(snap => {
			this.general = snap.data().imagenes;
			this.imgSaladejuegos = this.general.find(x => x.nombre === 'saladejuegosnueva.png').url;
			this.imgListado = this.general.find(x => x.nombre === 'listado.png').url;
			this.imgConfiguracionnueva = this.general.find(x => x.nombre === 'configuracionnueva.png').url;
			this.imgJugadores = this.general.find(x => x.nombre === 'jugadores.png').url;
		});
	}



}
