import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reserva } from '../models/reserva';
import { ReservaService } from '../services/reserva.service';
import {v4 as uuidv4} from 'uuid';
import { ViviendaService } from '../services/vivienda.service';
import { Vivienda } from '../models/vivienda';
import { resolve } from 'path';

@Component({
  selector: 'app-reserva-create',
  templateUrl: './reserva-create.component.html',
  styleUrls: ['./reserva-create.component.css']
})
export class ReservaCreateComponent implements OnInit {
  error : string ="";
  reservaCorrecta : boolean = false;
  reservaPagada : boolean = false;
  // fechasCheck: boolean = false;
  dias : number = -1;
  precio : number = -1;
  status: string="Esperando...";
  recibo: any;
  newReserva: Reserva = {
    id: "",
    idVivienda: "",
    fechaEntrada: "",
    fechaSalida: "",
    nPersonas: 1,
    inquilino: JSON.stringify(localStorage.getItem("id")),
    //inquilino: "8e5500fc-4c51-4021-a05c-dbc1d8b9d4ff",
    precioTotal: -1
  };
  vivienda : Vivienda;

  responseOK: boolean = false;

  constructor(private reservasService: ReservaService, private viviendasService: ViviendaService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.newReserva.idVivienda = String(this.route.snapshot.paramMap.get('id'));
    this.viviendasService.getViviendaById( this.newReserva.idVivienda).subscribe(data =>
      {
        this.vivienda=data
      }
      )

  }

  estadoPaypal(ne : string){
    this.status= ne;
    if (this.status=="Autorizado"){
      this.createReserva();
    }
  }

  reciboPaypal(data : any){
    this.recibo = data;
    this.reservaPagada = true;
  }

  async checkReserva(){
    var isOK = await this.isReservaOK();
    console.log("ISOK", isOK)
      const promise = new Promise((resolve, reject) => {
          resolve(this.isReservaOK());
      });
      promise.then((res) => {
        console.log('Devuelto:', res); // Devuelve: true
        if(res){
          console.log("Reserva OK");
          this.reservaCorrecta = true;
          this.dias = (this.process(this.newReserva.fechaSalida).getTime()-this.process(this.newReserva.fechaEntrada).getTime()) / (1000 * 3600 * 24)
          this.precio = (this.vivienda.precioNoche*this.dias);
        }else{
          this.reservaCorrecta = false;
          console.log("Reserva incorrecta")
      }
    });

  }
  createReserva(){
    this.newReserva.id = uuidv4();
    if(localStorage.getItem("id") != null){
      var user_id : any = localStorage.getItem("id");
      this.newReserva.inquilino = user_id;
    }
    this.newReserva.precioTotal=this.precio;
    console.log("Reserva: ", this.newReserva);
    this.reservasService.createReserva(this.newReserva).subscribe(data => {
      console.log(data);
      this.responseOK = data !== null;
    });

    if(this.responseOK){
      this.router.navigate(['/reserva', this.newReserva.id])
    }
  }

  irAReserva(){
    this.router.navigate(['/reserva', this.newReserva.id])
  }

  isReservaOK(){
      return new Promise (resolve => {
        this.reservasService.getReservaByFechas(this.newReserva.fechaEntrada, this.newReserva.fechaSalida).subscribe(data =>{
        console.log("Datos recibidos: ", data);    
        var isCorrecta = false;
        var comprobado = false;
        if(data.length>0){
          this.error="La vivienda está ocupada en estas fechas";
          // return false;
        }
        else if(this.newReserva.fechaEntrada=="" || this.newReserva.fechaSalida==""){
          this.error ="Rellene todos los campos de fecha";
          // return false;
        }
        else if (this.process(this.newReserva.fechaEntrada).getTime()>=this.process(this.newReserva.fechaSalida).getTime()){
          this.error ="La fecha de salida debe ser posterior a la de llegada";
          // return false;
        }
        else if (this.process(this.newReserva.fechaEntrada).getTime()<= new Date().getTime()){
          this.error ="No puedes reservar una fecha pasada";
          // return false;
        }
        else if (this.newReserva.nPersonas > this.vivienda.maxOcupantes){
          this.error ="El número máximo de ocupantes es " + this.vivienda.maxOcupantes;
          // return false;
        }else{
          isCorrecta = true;
        }
        resolve(isCorrecta);
    })
  })
    

    // if(this.reservaCorrecta){
    //   this.dias = (this.process(this.newReserva.fechaSalida).getTime()-this.process(this.newReserva.fechaEntrada).getTime()) / (1000 * 3600 * 24)
    //   this.precio = (this.vivienda.precioNoche*this.dias);
    // }

    // this.fechasCheck = true;
    
  }
  process(date: any){
    var parts = date.split("-");
    return new Date(parts[0], parts[1] - 1, parts[2]);
 }
}


