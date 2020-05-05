import { Injectable } from '@angular/core';
import { ArchivosJugadoresService } from './archivos-jugadores.service'
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Jugador } from "../clases/jugador";

@Injectable()

export class JugadoresService {

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

}

