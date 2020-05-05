import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
// importo del module principal
import { RouterModule, Routes } from "@angular/router";
import { AdivinaElNumeroComponent } from "../componentes/adivina-el-numero/adivina-el-numero.component";
import { ListadoDeResultadosComponent } from "../componentes/listado-de-resultados/listado-de-resultados.component";
import { LoginComponent } from "../componentes/login/login.component";
import { ErrorComponent } from "../componentes/error/error.component";
import { PrincipalComponent } from "../componentes/principal/principal.component";
import { AgilidadAritmeticaComponent } from "../componentes/agilidad-aritmetica/agilidad-aritmetica.component";
import { MenuComponent } from "../componentes/menu/menu.component";
import { ListadoComponent } from "../componentes/listado/listado.component";
import { ListadosComponent } from "../componentes/listados/listados.component";
import { JuegosComponent } from "../componentes/juegos/juegos.component";
import { RegistroComponent } from "../componentes/registro/registro.component";
import { MenuCardComponent } from "../componentes/menu-card/menu-card.component";
import { CabeceraComponent } from "../componentes/cabecera/cabecera.component";
import { QuienSoyComponent } from "../componentes/quien-soy/quien-soy.component";
import { ListadoDePaisesComponent } from "../componentes/listado-de-paises/listado-de-paises.component";
import { MapaDeGoogleComponent } from "../componentes/mapa-de-google/mapa-de-google.component";
import { JugadoresListadoComponent } from "../componentes/jugadores-listado/jugadores-listado.component";
import { PiedraPapelOTijeraComponent } from "../componentes/piedra-papel-o-tijera/piedra-papel-o-tijera.component";
import { AnagramaComponent } from "../componentes/anagrama/anagrama.component";
import { TatetiComponent } from "../componentes/tateti/tateti.component";
import { EncontrarComponent } from '../componentes/encontrar/encontrar.component';
import { JuegosMasListadosComponent } from '../componentes/juegos-mas-listados/juegos-mas-listados.component';


// declaro donde quiero que se dirija
const MiRuteo = [
  { path: "", component: PrincipalComponent },
  { path: "Login", component: LoginComponent },
  { path: "Jugadores", component: JugadoresListadoComponent },
  { path: "QuienSoy", component: QuienSoyComponent },
  { path: "Registro", component: RegistroComponent },
  { path: "Principal", component: PrincipalComponent },
  { path: "Listado", component: ListadoComponent },
  { path: "Paises", component: ListadoDePaisesComponent },
  { path: "Mapa", component: MapaDeGoogleComponent },
  {
    path: "Juegos",
    component: JuegosComponent,
    children: [
      { path: "", component: MenuCardComponent },
      { path: "Anagrama", component: AnagramaComponent },
      { path: "Adivina", component: AdivinaElNumeroComponent },
      { path: "Agilidad", component: AgilidadAritmeticaComponent },
      { path: "PiedraPapelTijera", component: PiedraPapelOTijeraComponent },
      { path: "Tateti", component: TatetiComponent },
      { path: "Encontrar", component: EncontrarComponent },
      { path: "juegosMasListado/:juego", component: JuegosMasListadosComponent },
    ],
  },
  { path: "**", component: ErrorComponent },
  { path: "error", component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(MiRuteo)],
  exports: [RouterModule],
})
export class RuteandoModule {}
