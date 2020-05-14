import { Injectable, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { JugadoresService } from './jugadores.service';
import { Jugador } from '../clases/jugador';
import { User } from "firebase";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  public user: User;
  public sub: any;
  public jugador: Jugador;

  constructor(public afAuth: AngularFireAuth, private jugSrv: JugadoresService) {
    this.sub = this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem("user", JSON.stringify(this.user));
      } else {
        localStorage.setItem("user", null);
      }
    });
  }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password).then(user =>{
      localStorage.setItem("user", JSON.stringify(user.user));
    });
  }

  register(email: string, password: string, data: string[]) {
    return this.afAuth.createUserWithEmailAndPassword(email, password).then(user => {
      this.jugador = {
        uid: user.user.uid,
        usuario: data['usuario'],
        cuit: data['cuit'],
        sexo: data['sexo'],
        gano: data['gano']
      }
      this.jugSrv.createJugador(this.jugador);
      localStorage.setItem("user", JSON.stringify(user.user));
    });
  }

  async logout() {
    await this.afAuth.signOut();
    localStorage.removeItem("user");
    this.sub.unsubscribe();
  }

  public get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("user"));
    return user !== null;
  }
}
