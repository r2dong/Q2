import { Component, Input, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import {EventService} from '../event.service';
import {EventModel} from '../event.model';
import { Router } from '@angular/router';
import {ProjectService} from '../../projects/project.service';
import {Location} from '@angular/common';
@Component({
  selector: 'app-show-events',
  templateUrl: './show-events.component.html',
  styleUrls: ['./show-events.component.css']
})
export class ShowEventsComponent implements OnInit {
  @Input() events: EventModel[];
  @Input() pid: string;
  selectedEvent: EventModel;
  constructor(    private eventService: EventService,
                  private projectService: ProjectService,
                  private router: Router,
                  private flashMessage: FlashMessagesService,
                  private location: Location,
  ) { }

  ngOnInit() {
    if ( this.router.url === '/events/show-events') {
      this.eventService.getEvents().subscribe(events => {
        this.events = events;
      });
      this.pid = undefined;
    }
  }
  onToggleCompleteClick(event: EventModel) {
    event.complete = !event.complete;
    this.selectedEvent = event;
    if (event.complete){
      this.eventService.completeEvent(this.selectedEvent);
      this.flashMessage.show('Event completed', {
        cssClass: 'alert-success', timeout: 4000
      });
    } else {
      this.eventService.openCompletedEvent(this.selectedEvent);
      this.flashMessage.show('Event is Open', {
        cssClass: 'alert-success', timeout: 4000
      });
    }
  }
  onRemoveClick(event: EventModel) {
    if (confirm('Remove event from this project?')) {
      console.log('show-events event.pid: ' + event.pid);
      console.log('show-events event.eid: ' + event.eid);
      this.eventService.removeEventFromProject(event);
      this.flashMessage.show('Event removed from this project', {
        cssClass: 'alert-success', timeout: 4000
      });
    }
  }
  onDeleteClick(event: EventModel) {
    if (confirm('Permanently delete event from the system?')) {
      this.eventService.deleteEvent(event);
      this.flashMessage.show('Event deleted', {
        cssClass: 'alert-success', timeout: 4000
      });
    }
  }

  goBack() {
    this.location.back();
  }

}
