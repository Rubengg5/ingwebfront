import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Aparcamiento } from '../models/aparcamiento';


@Injectable({
  providedIn: 'root'
})
export class AparcamientoService {

  constructor(private http: HttpClient) { 
    
  }

  getAparcamientos(){
    return this.http.get<Aparcamiento[]>(environment.baseURL+"/api/Aparcamientos");
  }

  createAparcamiento(Aparcamiento: Aparcamiento){
    return this.http.post(environment.baseURL+"/api/Aparcamientos", Aparcamiento);
  }

  getAparcamientoById(id: string){
    return this.http.get<Aparcamiento>(environment.baseURL+"/api/Aparcamientos/"+id);
  }

  getAparcamientosContainingString(String: string){
    return this.http.get<Aparcamiento[]>(environment.baseURL+"/api/Aparcamientos/getContainingString/"+String);
  }

  updateAparcamiento(Aparcamiento: Aparcamiento){
    return this.http.put<Aparcamiento>(environment.baseURL+"/api/Aparcamientos/"+Aparcamiento._id, Aparcamiento);
  }

  deleteAparcamiento(id: string){
    return this.http.delete(environment.baseURL+"/api/Aparcamientos/"+id);
  }
}
