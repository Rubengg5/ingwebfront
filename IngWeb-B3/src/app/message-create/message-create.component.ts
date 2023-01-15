import { Component } from '@angular/core';
import { Message } from '../models/message';
import { v4 as uuidv4 } from 'uuid';
import { MessageService } from '../services/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { ParseError } from '@angular/compiler';

@Component({
  selector: 'app-message-create',
  templateUrl: './message-create.component.html',
  styleUrls: ['./message-create.component.css']
})
export class MessageCreateComponent {

  datos: unknown = "-1";
  responseOK: boolean = false;
  loggedUser: any = localStorage.getItem("id");

  newMessage: Message = {
    id: "",
    de: this.loggedUser,
    para: "",
    asunto: "",
    stamp: (new Date(Date.now())),
    contenido: "",
    adjunto: "",
  }

  constructor(private messageService: MessageService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // const id = String(this.route.snapshot.paramMap.get('id'));
  }

  createMessage() {
    this.newMessage.id = uuidv4();
    //Si se ha cargado una imagen desde el pc del cliente entonces la subimos a Cloudinary y se guarda en newVivienda su nueva ruta relativa
    if (this.datos !== "-1") {
      //this.mandarAPI(this.datos)
    }
    this.messageService.createMessage(this.newMessage).subscribe(data => {
      this.responseOK = (data !== null);
      console.log(this.responseOK);
      console.log(this.newMessage);
      if (this.responseOK) {
        this.router.navigate(['/messages', this.newMessage.de]);
      }
    });
  }

  async capturarFile($event: Event) {
    const target = $event.target as HTMLInputElement
    if (target.files !== null) {
      let file = (target.files[0]);
      this.datos = await this.encodeImageFileAsURL(file)
      this.mandarAPI(this.datos)
    }
  }

  encodeImageFileAsURL(element: File | null) {
    return new Promise(resolve => {
      if (element !== null) {
        var file = element
        var reader = new FileReader();
        reader.onloadend = function () {
          resolve(reader.result)
        }
        reader.readAsDataURL(file);
      }
    })
  }

  mandarAPI(data: unknown) {
    var nombreArchivo = ""
    const payload = { "file": data, "api_key": "714814147251835", "upload_preset": "ruben_examen" };
    console.log(payload)
    axios.post(environment.cloudinaryApiUrl, payload).then((response) => {
      console.log(response.data);
      nombreArchivo = response.data["url"];
      this.newMessage.adjunto = nombreArchivo;
    }).catch((error) => {
      console.error(error);
    });
  }
}
