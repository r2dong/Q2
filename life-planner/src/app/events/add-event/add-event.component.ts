import {Component, OnInit, ViewChild} from '@angular/core';
import {EventService} from '../event.service';
import {ActivatedRoute, Router} from '@angular/router';
import{FlashMessagesService} from 'angular2-flash-messages';
import{EventModel} from '../event.model';
import{Location} from '@angular/common';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  event: EventModel = {
    eid: '',
    name: '',
    sdate: '',
    stime: '',
    edate: '',
    etime: '',
    important: false
  };
  pid: string;
  @ViewChild('eventForm') form: any;

  constructor(private flashMessage: FlashMessagesService,
              private eventService: EventService,
              private router: Router,
              private location: Location,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.pid = this.route.snapshot.params['pid'];
  }
  onSubmit({value, valid}: {value: EventModel, valid: boolean}) {
    if (!valid) {
      // Show error
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      // Add new event
      this.eventService.addEvent(value, this.pid);
      // Show message
      this.flashMessage.show('New event added', {
        cssClass: 'alert-success', timeout: 4000
      });
      // Redirect to previous page
      this.goBack();
    }
  }

  goBack() {
    this.location.back();
  }
}
