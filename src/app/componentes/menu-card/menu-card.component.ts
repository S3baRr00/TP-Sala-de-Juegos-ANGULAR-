import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ImagenesService } from '../../servicios/imagenes.service';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.css']
})
export class MenuCardComponent implements OnInit {
  public general:Array<any> = [];
  public imgCerebro:string;
  public imgPpt:string;
  public imgAdivina:string;
  public imgAnagrama:string;
  public imgTateti:string;
  public imgMemotest:string;
  public imgHonor_diamond:string;

  constructor(private route: ActivatedRoute,
    private router: Router, public imagenes: ImagenesService) { }
  
  ngOnInit() {
    this.imagenes.traerGeneral().then(snap => {
      this.general = snap.data().imagenes;
      this.imgCerebro = this.general.find(x => x.nombre === 'cerebro.png').url;
      this.imgPpt = this.general.find(x => x.nombre === 'ppt.png').url;
      this.imgAdivina = this.general.find(x => x.nombre === 'adivina.png').url;
      this.imgAnagrama = this.general.find(x => x.nombre === 'anagrama.png').url;
      this.imgTateti = this.general.find(x => x.nombre === 'tateti.png').url;
      this.imgMemotest = this.general.find(x => x.nombre === 'memotest.png').url;
      this.imgHonor_diamond = this.general.find(x => x.nombre === 'honor_diamond.png').url;
    });
  }

  Juego(tipo: string) {
    switch (tipo) {
      case 'Anagrama':
        this.router.navigate(['/Juegos/Anagrama']);
        break;
      case 'Adivina':
        this.router.navigate(['/Juegos/Adivina']);
        break;
      case 'Agilidad':
        this.router.navigate(['/Juegos/Agilidad']);
        break;
      case 'AdivinaMasListado':
        this.router.navigate(['/Juegos/AdivinaMasListado']);
        break;
      case 'AgilidadaMasListado':
        this.router.navigate(['/Juegos/AgilidadaMasListado']);
        break;
      case 'PPT':
        this.router.navigate(['/Juegos/PiedraPapelTijera']);
        break;
      case 'Tateti':
        this.router.navigate(['/Juegos/Tateti']);
        break;
      case 'Memotest':
        this.router.navigate(['/Juegos/Memotest']);
        break;
      case 'Encontrar':
        this.router.navigate(['/Juegos/Encontrar']);
        break;
    }
  }
}
