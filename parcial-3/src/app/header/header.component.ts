import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userId: any = localStorage.getItem("id");
  isLoggedIn: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if(this.userId != null) this.isLoggedIn = true;
    else this.isLoggedIn = false;
  }

}
