import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription, BehaviorSubject } from "rxjs";
import { AuthService } from "../../servicios/auth.service";
import { User } from "firebase";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  private subscription: Subscription;
  public usuario = "";
  public clave = "";
  public user:User;
  clase = "progress-bar progress-bar-info progress-bar-striped ";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  public Entrar(){
    this.authService.login(this.usuario,this.clave);
    this.router.navigate(["Principal"]);
  }
}
