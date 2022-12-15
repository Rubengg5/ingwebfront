import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { xService } from '../services/x-service';

@Component({
  selector: 'app-x-details',
  templateUrl: './x-details.component.html',
  styleUrls: ['./x-details.component.css']
})
export class XDetailsComponent implements OnInit {

  x: any = null;

  constructor(private route: ActivatedRoute,
    private xService: xService) { }

  ngOnInit(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));

    this.xService.getxById(id)
    .subscribe(data => 
      {
        this.x = data;
        console.log(this.x)
      });
  }

}
