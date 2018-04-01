import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ProjectModel } from '../project.model';
import {TaskService} from '../../tasks/task.service';
import {TaskModel} from '../../tasks/task.model';
import {Location} from '@angular/common';
@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  pid: string;
  project: ProjectModel;
  projectTasks: TaskModel[];
  // projectEvents: EventModel[];

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private location: Location,
    private ts: TaskService,
    // private es: EventService,
  ) { }

  ngOnInit() {
    // Get id from url
    this.pid = this.route.snapshot.params['pid'];
    // Get project
    console.log('getting pid: ' + this.pid);
    this.projectService.getProject(this.pid).subscribe(project => {
      if (project != null) {
        console.log('project found for pid: ' + this.pid);
      }
      this.project = project;
      if ( project !== null ) {
        this.ts.findTasks(project.tids).subscribe(tasks => {
          this.projectTasks = tasks;
        });
      }

      /*
      this.es.findEvents(project.eids).subscribe(events => {
        this.projectEvents = events;
      });
       */
    });
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

  goBack(){
    this.location.back();
  }
}
