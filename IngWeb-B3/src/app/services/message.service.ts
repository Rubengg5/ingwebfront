import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Message } from '../models/message';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { 
    
  }

  getMessages(){
    return this.http.get<Message[]>(environment.baseURL+"/api/Messages");
  }

  createMessage(Message: Message){
    return this.http.post(environment.baseURL+"/api/Messages", Message);
  }

  getMessageById(id: string){
    return this.http.get<Message>(environment.baseURL+"/api/Messages/"+id);
  }

  updateMessage(Message: Message){
    return this.http.put<Message>(environment.baseURL+"/api/Messages/"+Message.id, Message);
  }

  deleteMessage(id: string){
    return this.http.delete(environment.baseURL+"/api/Messages/"+id);
  }

  getMessagesByRemitente(id: string){
    return this.http.get<Message[]>(environment.baseURL+"/api/Messages/getByRemitente/"+id);
  }

  getMessagesByDestinatario(id: string){
    return this.http.get<Message[]>(environment.baseURL+"/api/Messages/getByDestinatario/"+id);
  }

  getCabecerasByUserDesc(idUser?: string){
    return this.http.get<Message[]>(environment.baseURL+"/api/Messages/getCabecerasByUserDesc/"+idUser);
  }
}
