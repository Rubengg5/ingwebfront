import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Message } from '../models/message';
import { Ubicacion } from '../models/ubicacion';
import { GeocodingService } from '../services/geocoding.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  messagesList: Message[] = [];
  legitimo: Boolean = false;
  messageContent: any;
  isHover: boolean = false;
  message: Message;
  messageImage: string;

  //MAPA
  u1:Ubicacion = {
    lat: 40.4165000,
    lon: -3.7025600
  }

  u2:Ubicacion = {
    lat: 40.4165000,
    lon: -2.7025600
  }

  u3:Ubicacion = {
    lat: 30.4165000,
    lon: -3.7025600
  }

  u4:Ubicacion = {
    lat: 20.4165000,
    lon: -2.7025600
  }

  lat : number = 40.4165000;
  lon : number = -3.7025600;
  calle : string ;
  ubicacionesDummy: Ubicacion[] = [this.u1, this.u2, this.u3, this.u4];
  ubicaciones: Ubicacion[] = [];
  ubicacion: Ubicacion = this.u1;

  constructor(private route: ActivatedRoute, private messagesService: MessageService, private geocodingService: GeocodingService) { }

  ngOnInit(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.legitimo = id == localStorage.getItem("id");

    this.messagesService.getCabecerasByUserDesc(id)
      .subscribe(data => {
        this.messagesList = data;
        // console.log(this.messagesList);
      });
  }

  //mostrar algo despues de seleccionar
  showMessageContent(id: string) {
    this.messagesService.getMessageById(id)
      .subscribe(data => {
        this.message = data;
        this.messageContent = "<b>Id</b>: " + this.message.id + "<br>" +
          "<b>De</b>: " + this.message.de + "<br>" +
          "<b>Para</b>: " + this.message.para + "<br>" +
          "<b>Asunto</b>: " + this.message.asunto + "<br>" +
          "<b>Stamp</b>: " + this.message.stamp + "<br>" +
          "<b>Contenido</b>: " + this.message.contenido + "<br>" +
          "<b>Adjunto</b>: <br>";
        this.messageImage = this.message.adjunto;
        console.log("Imagen: " + this.messageImage);
        console.log(this.message);
      });
  }

    //LO DE ABAJO REALMENTE CREO QUE NO SIRVE
    actualizarMapa(){
      console.log("Actualizar mapa", this.calle)
      this.geocodingService.getCoordenadasFromCalle(this.calle).subscribe(data => 
      {
        //UNA CHINCHETA
        this.lat= data.lat;
        this.lon= data.lon;

        //MUCHAS CHINCHETAS
        // console.log(this.ubicaciones);
        
        // this.ubicaciones = [];

        // this.ubicaciones.push();

        //PARA CREAR O ACTUALIZAR
        // this.newMessage.ubicacion = data
      })
    }

    actualizarMapaForm(){
      console.log("Actualizar mapa", this.ubicaciones, this.ubicacion);
      if(this.ubicacion){
        this.ubicaciones.push(this.ubicacion);
      }
    }
}
