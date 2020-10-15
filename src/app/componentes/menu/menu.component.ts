import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { AuthService } from "../../servicios/auth.service";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]
})
export class MenuComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  public Salir() {
    this.authService.logout().then(() => {
      this.router.navigate(["Login"]);
    });
  }

  public Juego(tipo: string) {
    switch (tipo) {
      case "Adivina":
        this.router.navigate(["/Juegos/Adivina"]);
        break;
      case "Agilidad":
        this.router.navigate(["/Juegos/Agilidad"]);
        break;
      case "Ppt":
        this.router.navigate(["/Juegos/PiedraPapelTijera"]);
        break;
      case "Anagrama":
        this.router.navigate(["/Juegos/Anagrama"]);
        break;
      case "Tateti":
        this.router.navigate(["/Juegos/Tateti"]);
        break;
      case "Memotest":
        this.router.navigate(["/Juegos/Memotest"]);
        break;
      case "Encontrar":
        this.router.navigate(["/Juegos/Encontrar"]);
        break;
      default:
        this.router.navigate(["/Juegos/juegosMasListado", tipo]);
        break;
    }
  }
}
