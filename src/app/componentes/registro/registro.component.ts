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
  nuevoSexo: string = 'F';
  sub;

  constructor(public authService: AuthService, private router: Router, private ppe: SexoPipe) {
  }

  ngOnInit() { }

  generarNuevoUsuario() {
    if (this.nuevaPass === this.passRepetir) {
      let data:string[] = [];
       data['usuario']= this.nuevoMail;
       data['sexo']=this.nuevoSexo;
       data['cuit']=this.nuevoCuit;
       data['gano']='-';
      this.authService.register(this.nuevoMail, this.nuevaPass, data);
      this.router.navigate(["Principal"]);
    } else {
      alert("por favor escriba las contraseñas correctamente");
    }
  }

  public change(valor: string){
    this.nuevoSexo = this.ppe. transform(valor);
  }
}
