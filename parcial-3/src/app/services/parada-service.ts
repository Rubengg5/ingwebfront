import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { parada } from "../models/parada";

@Injectable({
  providedIn: 'root'
})
export class ParadaService {

  constructor(private http: HttpClient) { }

  getParadas() {
    return this.http.get<parada[]>(environment.baseURL + "/api/Parada");
  }

  createParada(x: parada) {
    return this.http.post(environment.baseURL + "/api/Parada", x);
  }

  getParadaByCodParada(id: string) {
    return this.http.get<parada>(environment.baseURL + "/api/Parada/" + id);
  }

  updateParada(codParada: string, p: parada) {
    let params = new HttpParams();
    params = params.append('codParada', codParada);
    return this.http.put<parada>(environment.baseURL + "/api/Parada/" + codParada, p);
  }

  deletex(codParada: string) {
    return this.http.delete(environment.baseURL + "/api/Parada/" + codParada);
  }

  getParadasByLineaYSentido(linea: string, sentido: string) {
    return this.http.get<parada[]>(environment.baseURL + "/api/Parada/" + linea + "/" + sentido);
  }

  // getxByName(name: string) {
  //   return this.http.get<x>(environment.baseURL + "/api/x/getByName/" + name);
  // }

  // getxByUsuario(usuario: string) {
  //   return this.http.get<x[]>(environment.baseURL + "/api/x/getByUsuario/" + usuario);
  // }

}
