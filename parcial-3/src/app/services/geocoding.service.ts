import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Ubicacion } from '../models/ubicacion';
import { ListenOptions } from 'net';

const httpOptionsPlain = {
  headers: new HttpHeaders({
    'Accept': 'text/plain',
    'Content-Type': 'text/plain'
  }),
  'responseType': 'text'
};

@Injectable({
  providedIn: 'root'
})

export class GeocodingService {

  constructor(private http: HttpClient) { }

  getCoordenadasFromCalle(calle: string){
    var ubicacion = this.http.get<Ubicacion>(environment.baseURL+"/forward/"+calle);
    return ubicacion;
  }

  getCalleFromCoordenadas(lat: number, lon: number){
    console.log("Buscando calle para",lat,"/",lon)
    var calle = this.http.get<string>(environment.baseURL+"/reverse/"+lat+"/"+lon);
    console.log("calle", calle)
    return calle
  }
}