import { Component, OnInit } from '@angular/core';
import { GeocodingService } from '../services/geocoding.service';
import { ParadaService } from '../services/parada-service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  isLoggedIn: boolean = false;
  userId: any = localStorage.getItem('id');
  paradas: any;
  linea: any;
  sentido: any;

  constructor(private geocodingService: GeocodingService, paradaService: ParadaService) {}

  ngOnInit(): void {
    if (this.userId != null) this.isLoggedIn = true;
    else this.isLoggedIn = false;
  }

  selectLineaYSentido(): void {
    // paradaService.getParadasByLineaYSentido(this.linea, this.sentido);
  }

  // actualizarMapa(){
  //   console.log("Actualizar mapa", this.calle)
  //   this.geocodingService.getCoordenadasFromCalle(this.calle).subscribe(data =>
  //   {
  //     this.ubicacionCalle.latitud= data.latitud;
  //     this.ubicacionCalle.longitud= data.longitud;
  //     this.newx.ubicacion = data
  //   })
  //   }
}
