import { Component, OnInit } from '@angular/core';
import { ImagenesService } from '../../servicios/imagenes.service';
@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
	public imgError: string;
  constructor(public imagenes: ImagenesService) { }

  ngOnInit() {
   this.imagenes.traerGeneral().then(snap =>{
      this.imgError = snap.data().imagenes.find(x => x.nombre === 'error.png').url;
    });
  }

}
