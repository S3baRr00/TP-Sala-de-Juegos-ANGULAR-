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

  constructor(public afAuth: AngularFireAuth,private jugSrv: JugadoresService ) {
    this.sub = this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem("user", JSON.stringify(this.user));
      } else {
        localStorage.setItem("user", null);
      }
    });
  }

  async login(email: string, password: string) {
    try {
      var result = await this.afAuth.signInWithEmailAndPassword(email, password);
    } catch (e) {
      console.log('error de login:' + e.message);
    }
  }

  async register(email: string, password: string, data: string[]) {
    try {
      var result = await this.afAuth.createUserWithEmailAndPassword(email, password).then(user => {
        this.jugador= {
          uid: user.user.uid,
          usuario: data['usuario'],
          cuit: data['cuit'],
          sexo: data['sexo'],
          gano: data['gano']
        }
        this.jugSrv.createJugador(this.jugador);
      });
    } catch (e) {
      console.log("error al registrarse" + e.message);
    }
  }

  async logout() {
    try {
      await this.afAuth.signOut();
      localStorage.removeItem("user");
      this.sub.unsubscribe();
    } catch (e) {
      console.log("error al salir" + e.message);
    }
  }

  public get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("user"));
    return user !== null;
  }
}
