import { Component, OnInit } from '@angular/core';
import { Imagen } from '../models/imagen';
import { Ubicacion } from '../models/ubicacion';
import { ImagenService } from '../services/imagen.service';
import {v4 as uuidv4} from 'uuid';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MapaComponent } from '../mapa/mapa.component';
import { GeocodingService } from '../services/geocoding.service';
import axios from "axios";
import { strict } from 'assert';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-imagen-imagen',
  templateUrl: './aparcamientos-create.component.html',
  styleUrls: ['./aparcamientos-create.component.css']
})


export class AparcamientosCreateComponent implements OnInit {

  ubicacion: Ubicacion = {
    lat: 0,
    lon: 0
  }
  lat : number = 40.4165000;
  lon : number = -3.7025600;
  calle : string ;
  prueba : any;
  datos : unknown = "-1";
  lista = ['Alava','Albacete','Alicante','Almería','Asturias','Avila','Badajoz','Barcelona','Burgos','Cáceres',
  'Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Granada','Guadalajara',
  'Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra',
  'Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
  'Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza'];

  newImagen: Imagen = {
    _id:0,
    idAparcamiento:0,
    imagen:""
  }

  responseOK: boolean = false;

  constructor(private geocodingService: GeocodingService, private imagensService: ImagenService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
  }

  createImagen(){
    this.newImagen._id = Math.floor(100000 + Math.random() * 900000);

    this.imagensService.createImagen(this.newImagen).subscribe(data => 
    {
        this.responseOK = (data !== null);
        console.log(this.responseOK)
        if(this.responseOK){
          this.router.navigate(['/aparcamientos'])
        }
    });


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
        var nombreArchivo=""
        const payload = { "file" : data , "api_key": "714814147251835", "upload_preset": "ontg4fqa" };
        console.log(payload)
        axios.post(environment.cloudinaryApiUrl, payload).then((response) => {
          console.log(response.data);
          nombreArchivo = response.data["url"]
          this.newImagen.imagen=nombreArchivo
      }).catch((error) => {
          console.error(error);
      });
      }
  }
