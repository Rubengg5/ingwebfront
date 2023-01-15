import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Log } from '../models/log';


@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private http: HttpClient) { 
    
  }

  getLogs(){
    return this.http.get<Log[]>(environment.baseURL+"/api/Log");
  }

  createLog(log: Log){
    return this.http.post(environment.baseURL+"/api/Log", log);
  }

  // getLogById(id: string){
  //   return this.http.get<Log>(environment.baseURL+"/api/Logs/"+id);
  // }

  // updateLog(Log: Log){
  //   return this.http.put<Log>(environment.baseURL+"/api/Logs/"+Log.id, Log);
  // }

  // deleteLog(id: string){
  //   return this.http.delete(environment.baseURL+"/api/Logs/"+id);
  // }
}
