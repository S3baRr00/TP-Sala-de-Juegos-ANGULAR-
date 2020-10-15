import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { AdivinaElNumeroComponent } from "./componentes/adivina-el-numero/adivina-el-numero.component";
import { ListadoDeResultadosComponent } from "./componentes/listado-de-resultados/listado-de-resultados.component";
import { LoginComponent } from "./componentes/login/login.component";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";
import { MiHttpService } from "./servicios/mi-http/mi-http.service";
import { PaisesService } from "./servicios/paises.service";
import { JugadoresService } from "./servicios/jugadores.service";
import { ImagenesService } from "./servicios/imagenes.service";
import { ErrorComponent } from "./componentes/error/error.component";
import { PrincipalComponent } from "./componentes/principal/principal.component";
import { AgilidadAritmeticaComponent } from "./componentes/agilidad-aritmetica/agilidad-aritmetica.component";
import { MenuComponent } from "./componentes/menu/menu.component";
import { RuteandoModule } from "./ruteando/ruteando.module";
import { ListadoComponent } from "./componentes/listado/listado.component";
import { JugadoresListadoComponent } from "./componentes/jugadores-listado/jugadores-listado.component";
import { JuegoServiceService } from "./servicios/juego-service.service";
import { ListadosComponent } from "./componentes/listados/listados.component";
import { JuegosComponent } from "./componentes/juegos/juegos.component";
import { RegistroComponent } from "./componentes/registro/registro.component";
import { MenuCardComponent } from "./componentes/menu-card/menu-card.component";
import { CabeceraComponent } from "./componentes/cabecera/cabecera.component";
import { QuienSoyComponent } from "./componentes/quien-soy/quien-soy.component";
import { AnagramaComponent } from "./componentes/anagrama/anagrama.component";
import { ListadoDePaisesComponent } from "./componentes/listado-de-paises/listado-de-paises.component";
import { MapaDeGoogleComponent } from "./componentes/mapa-de-google/mapa-de-google.component";
import { AgmCoreModule } from "@agm/core";
import { InputJugadoresComponent } from "./componentes/input-jugadores/input-jugadores.component";
import { SexoPipe } from "./pipes/sexo.pipe";
import { PiedraPapelOTijeraComponent } from "./componentes/piedra-papel-o-tijera/piedra-papel-o-tijera.component";
import { EncontrarComponent } from "./componentes/encontrar/encontrar.component";
import { TatetiComponent } from "./componentes/tateti/tateti.component";
import { MemotestComponent } from './componentes/memotest/memotest.component';
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from "../environments/environment";
import { JuegosMasListadosComponent } from './componentes/juegos-mas-listados/juegos-mas-listados.component';

@NgModule({
    declarations: [
        AppComponent,
        AdivinaElNumeroComponent,
        ListadoDeResultadosComponent,
        ErrorComponent,
        PrincipalComponent,
        LoginComponent,
        AgilidadAritmeticaComponent,
        MenuComponent,
        ListadoComponent,
        ListadosComponent,
        JuegosComponent,
        RegistroComponent,
        MenuCardComponent,
        CabeceraComponent,
        QuienSoyComponent,
        AnagramaComponent,
        ListadoDePaisesComponent,
        MapaDeGoogleComponent,
        JugadoresListadoComponent,
        InputJugadoresComponent,
        SexoPipe,
        PiedraPapelOTijeraComponent,
        EncontrarComponent,
        TatetiComponent,
        JuegosMasListadosComponent,
        MemotestComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RuteandoModule,
        HttpClientModule,
        AgmCoreModule.forRoot({
            apiKey: "AIzaSyB6f8x4IjRlesQ3oETc6BXYQHVRTOlY3Ys"
        }),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        NoopAnimationsModule
    ],
    providers: [
        JuegoServiceService,
        MiHttpService,
        PaisesService,
        ImagenesService,
        JugadoresService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
