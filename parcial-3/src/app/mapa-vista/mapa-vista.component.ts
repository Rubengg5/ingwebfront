import { Component, OnInit } from '@angular/core';
import { Ubicacion } from '../models/ubicacion';
import { GeocodingService } from '../services/geocoding.service';

@Component({
  selector: 'app-mapa-vista',
  templateUrl: './mapa-vista.component.html',
  styleUrls: ['./mapa-vista.component.css']
})
export class MapaVistaComponent implements OnInit {
latitud : number = 40.4165000
longitud : number =  -3.7025600
calle : any = ""
ubicacion : Ubicacion = {latitud:0, longitud:0}


  constructor(private geocodingService: GeocodingService) { }

  ngOnInit(): void {
    this.actualizarCalle()
  }

  actualizarCalle(){
    console.log("actualizarCalle")
    this.geocodingService.getCalleFromCoordenadas(this.latitud,this.longitud).subscribe(data =>
      {
        console.log("Data:" ,data)
        this.calle = data
        this.calle = this.calle["display_name"]
      }
      )
    }
  
    actualizarCoordenadas(){
      console.log("actualizarCoordenadas")
      this.geocodingService.getCoordenadasFromCalle(this.calle).subscribe(data =>
        {
          console.log("Data:" ,data)
          this.ubicacion = data
          console.log("Ubicacion",this.ubicacion)
          console.log("Ubicacion_lat",this.ubicacion.latitud)
          this.latitud = this.ubicacion.latitud
          this.longitud = this.ubicacion.longitud
          console.log("latitud",this.latitud)
          console.log("longitd",this.longitud)
        }
        )
      }
}