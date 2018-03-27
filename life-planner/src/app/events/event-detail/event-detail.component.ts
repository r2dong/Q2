import { Component, OnInit } from '@angular/core';
import {EventService} from "../event.service";
import{ActivatedRoute, Router, Params} from '@angular/router';
import{FlashMessagesService} from 'angular2-flash-messages';
import {EventModel} from "../event.model";

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  eid: string;
  event: EventModel;
  deletedEventName: string;
  constructor(private eventsService: EventService,
              private router: Router,
              private route: ActivatedRoute,
              private flashMessage: FlashMessagesService) {
  }

  ngOnInit() {
    // Get id from url
    this.eid = this.route.snapshot.params['eid'];
    // Get task
    console.log('getting eid: ' + this.eid);
    this.eventsService.getEvent(this.eid).subscribe(event => {
      if (event != null) {
        console.log('event found for eid: ' + this.eid);
      }
      this.event = event;
    });

  }

  onDeleteClick() {
    if (confirm('Are you sure?')) {
      this.deletedEventName = this.event.name;
      this.eventsService.deleteEvent(this.event);
      this.flashMessage.show('Event: ' + this.deletedEventName +' removed', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/events']);
    }
  }
}
