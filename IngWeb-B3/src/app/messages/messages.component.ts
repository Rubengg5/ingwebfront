import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../models/message';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  messagesList: Message[] = [];
  legitimo : Boolean = false;

  constructor(private route: ActivatedRoute, private messagesService: MessageService) { }

  ngOnInit(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.legitimo = id == localStorage.getItem("id");

    this.messagesService.getCabecerasByUserDesc(id)
    .subscribe(data => 
      {
        this.messagesList = data;
        console.log(this.messagesList);
      });
  }

}
