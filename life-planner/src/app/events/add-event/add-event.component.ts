import {Component, OnInit, ViewChild} from '@angular/core';
import {EventService} from "../../events/event.service";
import {Router} from "@angular/router";
import{FlashMessagesService} from 'angular2-flash-messages';
import{EventModel} from "../../events/event.model";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  events: EventModel={
    eid: '',
    name:'',
    sdatetime:'',
  };
  @ViewChild('eventForm') form: any;

  constructor(private flashMessage: FlashMessagesService,
              private eventService: EventService,
              private router: Router) { }

  ngOnInit() {
  }
  onSubmit({value, valid}: {value: EventModel, valid: boolean}) {
    if (!valid) {
      // Show error
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      // Add new client
      this.eventService.addEvent(value);
      // Show message
      this.flashMessage.show('New client added', {
        cssClass: 'alert-success', timeout: 4000
      });
      // Redirect to dash
      this.router.navigate(['/home']);
    }
  }
}
