import { Component, OnInit } from '@angular/core';
import { ImagenesService } from '../../servicios/imagenes.service';
@Component({
  selector: 'app-quien-soy',
  templateUrl: './quien-soy.component.html',
  styleUrls: ['./quien-soy.component.css']
})
export class QuienSoyComponent implements OnInit {
	public imgQuiensoy: string;
	public imgQuiensoy1: string;
	public imgQuiensoy2: string;
	public imgQuiensoy3: string;
  constructor(public imagenes: ImagenesService) { }

  ngOnInit() {
  	this.imagenes.traerGeneral().then(snap =>{
      this.imgQuiensoy = snap.data().imagenes.find(x => x.nombre === 'quiensoy.jpg').url;
      this.imgQuiensoy1 = snap.data().imagenes.find(x => x.nombre === 'quiensoy1.png').url;
      this.imgQuiensoy2 = snap.data().imagenes.find(x => x.nombre === 'quiensoy2.jpg').url;
      this.imgQuiensoy3 = snap.data().imagenes.find(x => x.nombre === 'quiensoy3.png').url;
    });
  }

}
