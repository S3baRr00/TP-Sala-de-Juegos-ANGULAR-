import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
	providedIn: 'root'
})
export class ImagenesService {
	public general:Array<any>;
	public encontrarDiamante:Array<any>;
	public memotest:Array<any>;
	public ppt:Array<any>;
	public tateti:Array<any>;
	constructor(private storage: AngularFireStorage, private firestore: AngularFirestore) {
	}

	async traerGeneral(){
		return await this.firestore.collection('imagenes').doc('general').get().toPromise();
	}

	async traerEncontrar(){
		return await this.firestore.collection('imagenes').doc('encontrar-diamante').get().toPromise();
	}

	async traerMemotest(){
		return await this.firestore.collection('imagenes').doc('memotest').get().toPromise();
	}

	async traerPpt(){
		return await this.firestore.collection('imagenes').doc('ppt').get().toPromise();
	}

	async traerTateti(){
		return await this.firestore.collection('imagenes').doc('tateti').get().toPromise();
	}
}
