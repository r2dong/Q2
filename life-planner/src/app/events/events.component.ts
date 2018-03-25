import { Component, OnInit } from '@angular/core';
import {EventService} from './event.service';
import {EventModel} from './event.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: EventModel[];
  constructor(private es: EventService, private router: Router ) { }

  ngOnInit() {
    this.es.getEvents().subscribe(events => {
      this.events = events;
    })
  }

}
