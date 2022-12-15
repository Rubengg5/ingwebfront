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

  constructor(private route: ActivatedRoute, private xService: xService) { }

  ngOnInit(): void {

    this.xService.getx()
    .subscribe(data => 
      {
        this.xList = data;
        console.log(this.xList);
      });
  }

  orderByMg(): void {
    this.xList.sort(function(a, b){return b.mg - a.mg});
  }

}
