import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Resultados } from "../clases/resultados.model";
import { JugadoresService } from "./jugadores.service"
import { Jugador } from "../clases/jugador";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ResultadosService {

  private resultadosCollection: AngularFirestoreCollection<Resultados>;
  resultados: Observable<Resultados[]>;

  constructor(private firestore: AngularFirestore, private jugadorSrv: JugadoresService) {
    this.resultadosCollection = firestore.collection<Resultados>('resultados');

    this.resultados = this.resultadosCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Resultados;
        data.id = a.payload.doc.id;
        return { ...data }
      }))
    );
  }

  getResultados() {
    return this.firestore.collection("resultados").snapshotChanges();
  }

  createResultado(res: Resultados) {
    return this.firestore.collection('resultados').add(res).then( ref =>{
        this.jugadorSrv.actualizarGano(res.usuario);
    });
  }

  updateResultado(res: Resultados) {
    this.firestore.collection("resultados").doc(res.id).update(res);
  }

  deleteResultado(resId: Resultados) {
    this.firestore.collection("resultados").doc(resId.id).delete();
  }
}
