import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Aparcamiento } from '../models/aparcamiento';
import { Ubicacion } from '../models/ubicacion';
import { GeocodingService } from '../services/geocoding.service';
import { AparcamientoService } from '../services/aparcamiento.service';
import { ImagenService } from '../services/imagen.service';

@Component({
  selector: 'app-aparcamientos',
  templateUrl: './aparcamientos.component.html',
  styleUrls: ['./aparcamientos.component.css']
})
export class AparcamientosComponent {
  aparcamientosList: Aparcamiento[] = [];
  legitimo: Boolean = false;
  aparcamiento: Aparcamiento;
  aparcamientoContent: any;
  isHover: boolean = false;
  aparcamientoImage: string;

  lat : number = 40.4165000;
  lon : number = -3.7025600;
  calle : string ;
  ubicaciones: Ubicacion[] = [];

  ubicacion:Ubicacion = {
    lat: 20.4165000,
    lon: -2.7025600
  }

  constructor(private route: ActivatedRoute, private imagenService: ImagenService, private aparcamientosService: AparcamientoService, private geocodingService: GeocodingService) { }

  ngOnInit(): void {
    // const id = String(this.route.snapshot.paramMap.get('id'));
    this.legitimo = null != localStorage.getItem("id");

    this.aparcamientosService.getAparcamientos()
      .subscribe(data => {
        this.aparcamientosList = data;

        this.aparcamientosList.forEach(aparcamiento => {
          this.ubicacion.lat = aparcamiento.latitud;
          this.ubicacion.lon = aparcamiento.longitud;
          this.ubicaciones.push(this.ubicacion);
          console.log("Aparcamientos", this.ubicaciones);
        });
      });
  }

  showMessageContent(id: number) {
    this.imagenService.getImagenByIdAparcamiento(id)
      .subscribe(data => {
        this.aparcamientoImage = data.imagen;
      });
  }

    actualizarMapa(){
      console.log("Actualizar mapa", this.ubicaciones);
      this.aparcamientosService.getAparcamientosContainingString(this.calle).subscribe(data => 
      {
        //UNA CHINCHETA
        this.aparcamiento = data[0];
        console.log(this.aparcamiento);
        this.lat= this.aparcamiento.latitud;
        this.lon= this.aparcamiento.longitud;

        //MUCHAS CHINCHETAS
        // console.log(this.ubicaciones);
        
        // this.ubicaciones = [];

        // this.ubicaciones.push();

        //PARA CREAR O ACTUALIZAR
        // this.newAparcamiento.ubicacion = data
      })
    }

    // actualizarMapaForm(){
    //   console.log("Actualizar mapa", this.ubicaciones, this.ubicacion);
    //   if(this.ubicacion){
    //     this.ubicaciones.push(this.ubicacion);
    //   }
    // }
}
