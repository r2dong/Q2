import { Component, OnInit } from '@angular/core';
import {EventService} from '../event.service';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {EventModel} from '../event.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  eid: string;
  event: EventModel;
  deletedEventName: string;
  btnCompleteText: string;
  btnCompleteStyle: string;
  $click: string;
  constructor(
    private eventsService: EventService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private location: Location,
  ) {}

  ngOnInit() {
    // Get id from url
    this.eid = this.route.snapshot.params['eid'];
    // Get task
    console.log('getting eid: ' + this.eid);
    this.eventsService.getEvent(this.eid).subscribe(event => {
      if (event != null) {
        console.log('event found for eid: ' + this.eid);
        this.event = event;
       if (event.complete) {
         this.btnCompleteStyle = 'grey lighten-1';
         this.btnCompleteText =  'Completed';
       } else {
         this.btnCompleteStyle = '';
         this.btnCompleteText = 'Complete?';
       }
      }
    });

  }
  onCompleteClick(event) {
    if (event.srcElement.innerHTML === 'Complete?') {
      this.eventsService.completeEvent(this.event);
      this.flashMessage.show('Event Complete', {
        cssClass: 'alert-success', timeout: 4000
      });
      event.srcElement.innerHTML = 'Completed';
    } else if (event.srcElement.innerHTML === 'Completed') {
      this.eventsService.openCompletedEvent(this.event);
      this.flashMessage.show('Event opened', {
        cssClass: 'alert-success', timeout: 4000
      });
      event.srcElement.innerHTML = 'Complete?';
    }
  }

  onDeleteClick() {
    if (confirm('Are you sure?')) {
      this.deletedEventName = this.event.name;
      this.eventsService.deleteEvent(this.event);
      this.flashMessage.show('Event: ' + this.deletedEventName + ' removed', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.goBack();
    }
  }

  goBack() {
    this.location.back();
  }
}
