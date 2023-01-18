import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Imagen } from '../models/imagen';


@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  constructor(private http: HttpClient) { 
    
  }

  getImagens(){
    return this.http.get<Imagen[]>(environment.baseURL+"/api/Imagenes");
  }

  createImagen(Imagen: Imagen){
    return this.http.post(environment.baseURL+"/api/Imagenes", Imagen);
  }

  getImagenById(id: number){
    return this.http.get<Imagen>(environment.baseURL+"/api/Imagenes/"+id);
  }

  getImagenByIdAparcamiento(id: number){
    return this.http.get<Imagen>(environment.baseURL+"/api/Imagenes/getByAparcamiento/"+id);
  }

  updateImagen(Imagen: Imagen){
    return this.http.put<Imagen>(environment.baseURL+"/api/Imagenes/"+Imagen._id, Imagen);
  }

  deleteImagen(id: string){
    return this.http.delete(environment.baseURL+"/api/Imagenes/"+id);
  }
}
