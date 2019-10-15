import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@app/modules/core';
import { Event } from './event.model';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  events: Object[];

  constructor(private ApiService:ApiService) {
    console.log(EventComponent)
   }

  ngOnInit() {
    this.ApiService.get('events').subscribe(events=>{
      this.events = events
    });    
  }

}
