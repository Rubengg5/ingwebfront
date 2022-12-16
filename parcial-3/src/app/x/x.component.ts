import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { x } from '../models/x';
import { xService } from '../services/x-service';

@Component({
  selector: 'app-x',
  templateUrl: './x.component.html',
  styleUrls: ['./x.component.css']
})
export class XComponent implements OnInit {

  xList: x[] = [];
  userId: any = localStorage.getItem("id");

  constructor(private route: ActivatedRoute, private xService: xService) { }

  ngOnInit(): void {

    console.log(localStorage);


    this.xService.getxByUsuario(this.userId)
    .subscribe(data => 
      {
        this.xList = data;
        console.log(this.xList);
      });
  }

  orderXByMg(): void {
    this.xList.sort(function(a, b){return b.mg - a.mg});
  }

  // filterXByMg(mgs: Number){
  //   this.viviendaService.getViviendaByLocalidad(localidad)
  //   .subscribe(data => 
  //     {
  //       this.viviendaList = data;
  //       console.log(this.viviendaList);
  //     });
  // }

}
