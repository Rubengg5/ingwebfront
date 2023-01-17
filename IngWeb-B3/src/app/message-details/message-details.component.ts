import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../models/message';
import { Ubicacion } from '../models/ubicacion';
import { GeocodingService } from '../services/geocoding.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.css']
})
export class MessageDetailsComponent {
  messagesList: Message[] = [];
  legitimo: Boolean = false;
  messageContent: any;
  isHover: boolean = false;
  message: Message;
  messageImage: string;

  options: Ubicacion[];

  //MAPA
  u1:Ubicacion = {
    lat: 40.4165000,
    lon: -3.7025600
  }

  u2:Ubicacion = {
    lat: 40.4165000,
    lon: -2.7025600
  }

  newUbicacion: Ubicacion;

  lat : number = 40.4165000;
  lon : number = -3.7025600;
  calle : string ;
  ubicaciones: Ubicacion[] = [this.u1, this.u2];

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

    //mapa
    actualizarMapa(){
      console.log("Actualizar mapa", this.calle)
      this.geocodingService.getCoordenadasFromCalle(this.calle).subscribe(data => 
      {
        //UNA CHINCHETA
        this.lat= data.lat;
        this.lon= data.lon;

        //MUCHAS CHINCHETAS
        // this.newUbicacion.lat = data.lat;
        // this.newUbicacion.lon = data.lon;
        // this.ubicaciones.push(this.newUbicacion);

        //PARA CREAR O ACTUALIZAR
        // this.newMessage.ubicacion = data
      })
    }
}
