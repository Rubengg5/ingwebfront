import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import axios from "axios";


@Component({
  selector: 'app-imagen',
  templateUrl: './imagen.component.html',
  styleUrls: ['./imagen.component.css']
})
export class ImagenComponent implements OnInit {
  datos : unknown = "-1";
  urlImagen : string = "null";
  constructor() { }

  ngOnInit(): void {
  }

  //Capturamos el archivo desde el PC del usuario
  async capturarFile($event: Event) {
    const target = $event.target as HTMLInputElement
    if (target.files !== null){
      let file = (target.files[0]);
      this.datos = await this.encodeImageFileAsURL(file)
      this.subirImagenConAPI(this.datos)
    }
    }
  //Lo pasamos a Base64 para poder subirlo manualmente con la API
  encodeImageFileAsURL(element: File | null) {
    return new Promise(resolve=>{
    if (element !== null) {
      var file = element
      var reader = new FileReader();
      reader.onloadend = function() {
        resolve(reader.result)
    }
    reader.readAsDataURL(file);
    }
  })
  }

  //Subimos la imagen en base64 con la api de cloudinary
  subirImagenConAPI(data: unknown){
      var nombreArchivo=""
      const payload = { "file" : data , "api_key": environment.cloudinaryApiKey, "upload_preset": environment.cloudinaryUploadPreset };
      console.log(payload)
      axios.post(environment.cloudinaryApiUrl, payload).then((response) => {
        console.log(response.data);
        nombreArchivo = response.data["url"]
        this.urlImagen=nombreArchivo
    }).catch((error) => {
        console.error(error);
    });
    }
}
