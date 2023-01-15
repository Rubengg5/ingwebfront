import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Console } from 'console';
import { Log } from '../models/log';
import { LogService } from '../services/log.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent {
  logsList: Log[] = [];
  legitimo: Boolean = false;
  log: Log;

  constructor(private route: ActivatedRoute, private LogsService: LogService) { }

  ngOnInit(): void {
    this.legitimo = localStorage.getItem("id") != null;
    console.log(this.legitimo);
    

    this.LogsService.getLogs()
      .subscribe(data => {
        this.logsList = data;
        console.log(this.logsList);
      });
  }
}
