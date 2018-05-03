import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../project.service';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ProjectModel} from '../project.model';
import {TaskService} from '../../tasks/task.service';
import {TaskModel} from '../../tasks/task.model';
import {Location} from '@angular/common';
import {EventModel} from '../../events/event.model';
import {EventService} from '../../events/event.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  pid: string;
  project: ProjectModel;
  projectTasks: TaskModel[];
  projectEvents: EventModel[];
  btnCompleteText: string;
  btnCompleteStyle: string;
  constructor(
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private location: Location,
    private ts: TaskService,
    private es: EventService,
  ) {
  }

  ngOnInit() {
    // Get id from url
    this.pid = this.route.snapshot.params['pid'];
    // Get project
    console.log('PDC: ngOnInit: getting pid: ' + this.pid);
    this.projectService.getProject(this.pid).subscribe(project => {
      if (project !== null) {
        console.log('PDC: ngOnInit: project found for pid: ' + this.pid);
        this.project = project;

        console.log('PDC: ngOnInit: looking for tasks for pid: ' + this.project.pid);
       // console.log('PDC: ngOnInit: tids count??: ' + project.tids.toString());
        this.ts.findTasks(project.tids).subscribe(tasks => {
          console.log('PDC: ngOnInit: found ' + tasks.length.toString() + ' tasks for pid: ' + this.project.pid);
          this.projectTasks = tasks;
        });
        // console.log('PDC: ngOnInit: looking for events for pid: ' + this.project.pid);
        this.es.findEvents(project.eids).subscribe(events => {
          // console.log('PDC: ngOnInit: found ' + events.length.toString() + ' events for pid: ' + this.project.pid);
          this.projectEvents = events;
        });

        if (project.complete) {
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
      this.projectService.completeProject(this.project);
      this.es.completeEvents(this.projectEvents);
      this.ts.completeTasks(this.projectTasks);
      this.flashMessage.show('Project Complete', {
        cssClass: 'alert-success', timeout: 4000
      });
      event.srcElement.innerHTML = 'Completed';
    } else if (event.srcElement.innerHTML === 'Completed') {
      this.projectService.openCompletedProject(this.project);
      this.es.openCompletedEvents(this.projectEvents);
      this.ts.openCompletedTasks(this.projectTasks);
      this.flashMessage.show('Project opened', {
        cssClass: 'alert-success', timeout: 4000
      });
      event.srcElement.innerHTML = 'Complete?';
    }
  }
  onDeleteClick() {
    if (confirm('Are you sure?')) {
      this.projectService.deleteProject(this.project);
      this.flashMessage.show('Project removed', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.goBack();
    }
  }

  goBack() {
    this.location.back();
  }
}
