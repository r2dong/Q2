import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Router, ActivatedRoute} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import {EventModel} from '../event.model';
import {Location} from '@angular/common';
@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  eid: string;
  event: EventModel;
  constructor(
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.eid = this.route.snapshot.params['eid'];
    // get client
    this.eventService.getEvent(this.eid).subscribe(event => {
      if (event != null) {
        console.log('event found for eid: ' + this.eid);
      }
      this.event = event;
    });
  }
  onSubmit({value, valid}: {value: EventModel, valid: boolean}) {
    if (!valid) {
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      // Add id to client
      value.eid = this.eid;
      value.createdAt = this.event.createdAt;
      // Update client
      this.eventService.updateEvent(value);
      this.flashMessage.show('Event updated', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.goBack();
    }
  }

  goBack() {
    this.location.back();
  }

}
