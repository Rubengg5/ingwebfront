import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { x } from '../models/x';
import {v4 as uuidv4} from 'uuid';

import { xService } from '../services/x-service';
import { environment } from 'src/environments/environment.prod';
import axios from 'axios';
import { Ubicacion } from '../models/ubicacion';
import { GeocodingService } from '../services/geocoding.service';

@Component({
  selector: 'app-x-create',
  templateUrl: './x-create.component.html',
  styleUrls: ['./x-create.component.css']
})
export class XCreateComponent implements OnInit {
  ubicacion: Ubicacion = {
    latitud: 0,
    longitud: 0
  }
  ubicacionCalle: Ubicacion ={
    latitud: 40.4165000,
    longitud: -3.7025600
  }

  responseOK: boolean = false;
  loggedUser = localStorage.getItem("id")?.toString();
  datos : unknown;
  calle : string ="";
  newx: x = {
    id: "",
    name: "",
    mg:0,
    usuario: this.loggedUser,
    urlImagen: "",
    ubicacion: this.ubicacion
  }
  
  constructor(private geocodingService: GeocodingService, private route: ActivatedRoute, private xService: xService, private router: Router) { }

  ngOnInit(): void {
  }

  createx(){

    console.log(this.newx);
    this.newx.id = uuidv4();
    this.xService.createx(this.newx).subscribe(data => {
      this.responseOK = data !== null;
    });

    if(this.responseOK){
      this.router.navigate(['/x', this.newx.id])
    }
  }

  async capturarFile($event: Event) {
    const target = $event.target as HTMLInputElement
    if (target.files !== null){
      let file = (target.files[0]);
      this.datos = await this.encodeImageFileAsURL(file)
      this.mandarAPI(this.datos)
    }
    }
    encodeImageFileAsURL(element: File | null) {
      return new Promise(resolve=>{
      if (element !== null) {
        var file = element
        var reader = new FileReader();
        reader.onloadend = function() {
          resolve(reader.result)
      }
      reader.readAsDataURL(file);
      }
    })
    }

    mandarAPI(data: unknown){
        var urlImagenCloud=""
        const payload = { "file" : data , "api_key": environment.cloudinaryApiKey, "upload_preset": environment.cloudinaryUploadPreset };
        console.log(payload)
        axios.post(environment.cloudinaryApiUrl, payload).then((response) => {
          console.log(response.data);
          urlImagenCloud = response.data["url"]
          //Ya se ha subido a cloudinary
          this.newx.urlImagen=urlImagenCloud
      }).catch((error) => {
          console.error(error);
      });
      }

      actualizarMapa(){
        console.log("Actualizar mapa", this.calle)
        this.geocodingService.getCoordenadasFromCalle(this.calle).subscribe(data => 
        {
          this.ubicacionCalle.latitud= data.latitud;
          this.ubicacionCalle.longitud= data.longitud;
          this.newx.ubicacion = data
        })
        }

}


