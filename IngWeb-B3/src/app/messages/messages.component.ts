import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Message } from '../models/message';
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

  constructor(private route: ActivatedRoute, private messagesService: MessageService) { }

  ngOnInit(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.legitimo = id == localStorage.getItem("id");

    this.messagesService.getCabecerasByUserDesc(id)
      .subscribe(data => {
        this.messagesList = data;
        console.log(this.messagesList);
      });
  }

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
}
