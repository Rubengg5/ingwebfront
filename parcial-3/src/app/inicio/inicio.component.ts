import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  isLoggedIn: boolean = false;
  userId: any = localStorage.getItem("id");


  constructor() { }

  ngOnInit(): void {
    if(this.userId != null) this.isLoggedIn = true;
    else this.isLoggedIn = false;
  }

}
