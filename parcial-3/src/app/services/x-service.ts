import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { x } from "../models/x";

@Injectable({
    providedIn: 'root'
  })
export class xService {
  
    constructor(private http: HttpClient) { }

    getx(){
        return this.http.get<x[]>(environment.baseURL+"/api/x");
      }
    
      createx(x: x){
        return this.http.post(environment.baseURL+"/api/x", x);
      }
    
      getxById(id: string){
        return this.http.get<x>(environment.baseURL+"/api/x/"+id);
      }
    
      updatex(id: string, x: x){
        let params = new HttpParams();
        params = params.append('id', id);
        return this.http.put<x>(environment.baseURL+"/api/x/"+id, x);
      }
    
      deletex(id: string){
        return this.http.delete(environment.baseURL+"/api/x/"+id);
      }

      getxByName(name:string){
        return this.http.get<x>(environment.baseURL+"/api/x/getByName"+name);
      }

}