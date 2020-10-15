import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../servicios/auth.service";

@Component({
	selector: 'app-cabecera',
	templateUrl: './cabecera.component.html',
	styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

	constructor(public authService: AuthService, public router: Router) { }

	ngOnInit() {
	}
	public Salir() {
		this.authService.logout().then(() => {
			this.router.navigate(["Login"]);
		});
	}

}
