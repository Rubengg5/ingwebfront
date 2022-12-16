import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { xService } from '../services/x-service';
import { x } from '../models/x';
import { Ubicacion } from '../models/ubicacion';

@Component({
  selector: 'app-x-details',
  templateUrl: './x-details.component.html',
  styleUrls: ['./x-details.component.css']
})
export class XDetailsComponent implements OnInit {
  ubicacion: Ubicacion = {
    latitud: 0,
    longitud: 0
  }
  xActual: x = {
    id: "",
    name: "",
    mg:0,
    usuario: "",
    urlImagen: "",
    ubicacion: this.ubicacion
  }
  

  constructor(private route: ActivatedRoute,
    private xService: xService) { }

  ngOnInit(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));

    this.xService.getxById(id)
    .subscribe(data => 
      {
        this.xActual = data;
        
        this.xActual.ubicacion = data.ubicacion
        console.log(this.xActual)
      });
  }

}
