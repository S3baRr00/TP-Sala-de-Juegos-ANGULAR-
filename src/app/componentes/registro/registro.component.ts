import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { AuthService } from "../../servicios/auth.service";
import { SexoPipe } from '../../pipes/sexo.pipe'

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.css"],
  providers: [SexoPipe]
})
export class RegistroComponent implements OnInit {
  nuevoMail: string;
  nuevaPass: string;
  passRepetir: string;
  nuevoCuit: string;
  nuevoSexo: string = 'señorita';
  error: boolean = false;
  mensajeError: string='';
  sub;

  constructor(public authService: AuthService, private router: Router, private ppe: SexoPipe) {
  }

  ngOnInit() { }

  generarNuevoUsuario() {
    if (this.nuevaPass === this.passRepetir) {
      let data: string[] = [];
      data['usuario'] = this.nuevoMail;
      data['sexo'] = this.nuevoSexo;
      data['cuit'] = this.nuevoCuit;
      data['gano'] = '-';
      this.authService.register(this.nuevoMail, this.nuevaPass, data).then(() => {
        this.error = false;
        this.router.navigate(["Principal"]);
      }).catch(err => {
        switch (err.code) {
          case "auth/email-already-in-use":
            this.mensajeError = 'este email ya esta en uso por otro usuario';
            break;
          case "auth/invalid-email":
            this.mensajeError = 'este email no tiene un formato valido';
            break;
          case "auth/weak-password":
            this.mensajeError = 'esta contraseña no es fuerte';
            break;
        }
        console.log(this.mensajeError);
        this.error = true;
      });
    } else {
      alert("por favor escriba las contraseñas correctamente");
    }
  }

  public change(valor: string) {
    this.nuevoSexo = valor;
  }
}
