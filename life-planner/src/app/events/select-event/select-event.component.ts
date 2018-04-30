import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {EventService} from '../event.service';
import {EventModel} from '../event.model';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Location} from '@angular/common';
import {ProjectService} from '../../projects/project.service';
import {ProjectModel} from '../../projects/project.model';
import 'rxjs/add/operator/takeUntil';
import {Subject} from 'rxjs/Subject';
import { OnDestroy } from '@angular/core';
@Component({
  selector: 'app-select-event',
  templateUrl: './select-event.component.html',
  styleUrls: ['./select-event.component.css']
})
export class SelectEventComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<boolean> = new Subject();
  @Input() events: EventModel[];
  @Input() pid: string;
  private allEvents: EventModel[];
  private singleProject: ProjectModel;
  constructor(private eventService: EventService,
              private projectService: ProjectService,
              private router: Router,
              private route: ActivatedRoute,
              private flashMessage: FlashMessagesService,
              private location: Location) { }

  ngOnInit() {
    this.pid = this.route.snapshot.params['pid'];
    console.log('current pid: ' + this.pid);
    if (this.pid !== undefined) {
      this.projectService.getProject(this.pid).takeUntil(this.ngUnsubscribe).subscribe(project => {
        if (project.pid !== undefined) {
          console.log('project found for pid ' + this.pid);
          this.singleProject = project;
          this.eventService.getEvents().subscribe(events => {
            console.log('select-event (no filter):: ' + events.length.toString() + ' events for pid: ' + this.pid);
            this.allEvents = events;
            console.log('before loop');
            for (const sEvent of this.allEvents) {
              console.log('for eid: ' + sEvent.eid + ' the sEvent.pid is: ' + sEvent.pid); // 1 "string" false
            }
          });
          this.eventService.getEvents().map(epics => epics.filter(epic => epic.pid === undefined || epic.pid.length === 0)).subscribe(
            events => {
              console.log('select-event:: found ' + events.length.toString() + ' events for pid: ' + this.pid);
              this.events = events;
            });
        }
      });
    }
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  onAddClick(event: EventModel) {
    console.log('select-event: onAddClick starting pid: ' + this.pid + ' selected event: ' + event.eid);
    this.eventService.addEventToProject(this.pid, event);
    this.flashMessage.show('Event added to this project', {
      cssClass: 'alert-success', timeout: 4000
    });
    this.goBack();
  }

  goBack() {

    this.location.back();
  }
}
