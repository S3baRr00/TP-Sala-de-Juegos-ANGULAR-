import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription, BehaviorSubject } from "rxjs";
import { AuthService } from "../../servicios/auth.service";
import { User } from "firebase";
import { ImagenesService } from '../../servicios/imagenes.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  private subscription: Subscription;
  public usuario = "";
  public clave = "";
  public user: User;
  public error: boolean;
  public mensajeError: string;
  public imgLogin:string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public imagenes: ImagenesService
  ) { }

  ngOnInit() {
    this.imagenes.traerGeneral().then(snap =>{
      this.imgLogin = snap.data().imagenes.find(x => x.nombre === 'login.png').url;
    });
  }

  public Entrar() {
    this.authService.login(this.usuario, this.clave).then(() => {
      this.error = false;
      this.router.navigate(["Principal"]);
    }).catch(err => {
      switch (err.code) {
        case "auth/invalid-email":
          this.mensajeError = 'este email no es valido';
          break;
        case "auth/user-disabled":
          this.mensajeError = 'este usario no esta habilitado';
          break;
        case "auth/user-not-found":
          this.mensajeError = 'no existe este usuario';
          break;
        case "auth/wrong-password":
          this.mensajeError = 'contraseña incorrecta';
          break;
      }
      console.log(this.mensajeError);
      this.error = true;
    });
  }
}
