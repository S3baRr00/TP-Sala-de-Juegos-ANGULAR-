import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import * as firebase from "firebase/app";
import { Jugador } from "../clases/jugador";

@Injectable()

export class JugadoresService {
  public db = firebase.firestore();

  constructor(private firestore: AngularFirestore) { }

  getJugadores() {
    return this.firestore.collection("jugadores").snapshotChanges();
  }

  createJugador(res: Jugador) {
    return this.firestore.collection('jugadores').doc(res.uid).set(res);
  }

  updateJugador(res: Jugador) {
    this.firestore.collection("jugadores").doc(res.uid).update(res);
  }

  deleteJugador(resId: Jugador) {
    this.firestore.collection("jugadores").doc(resId.uid).delete();
  }

  async actualizarGano(nombreJugador : string){
    let resultados;
    let resultadosGano;
    let jugador:any= '';
    await this.db.collection('jugadores').where('usuario','==',nombreJugador).get().then(snap =>{
      console.log(snap.docs[0].data());
      jugador = snap.docs[0].data() as Jugador;
    });
    await this.db.collection('resultados').where('usuario','==',nombreJugador).get().then(snap =>{
      resultados = snap.size;
    });
    await this.db.collection('resultados').where('usuario','==',nombreJugador).where('resultado','==','Victoria').get().then(snap =>{
      resultadosGano = snap.size;
    });
    let porcentaje = resultadosGano / resultados;
        if (porcentaje >= 0.5) {
          jugador.gano = 'Ganador';
        }
        else {
          jugador.gano = 'Perdedor';
        }
        console.log(jugador);
        this.updateJugador(jugador);
  }
}

