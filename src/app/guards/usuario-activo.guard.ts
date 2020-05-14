import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class UsuarioActivoGuard implements CanActivate {

	constructor(public auth: AuthService, public router: Router) { }
	canActivate(): boolean {
		if (this.auth.isLoggedIn) {
			this.router.navigate(['/Principal']);
			return false;
		}
		return true;
	}

}
