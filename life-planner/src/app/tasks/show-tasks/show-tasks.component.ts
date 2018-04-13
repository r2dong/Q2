import { Component, Input, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { TaskService } from '../task.service';
import { TaskModel } from '../task.model';
import { Router } from '@angular/router';
import {ProjectService} from '../../projects/project.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-show-tasks',
  templateUrl: './show-tasks.component.html',
  styleUrls: ['./show-tasks.component.css']
})

export class ShowTasksComponent implements OnInit {
  @Input() tasks: TaskModel[];
  @Input() pid: string;

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private location: Location,
  ) { }

  ngOnInit() {
    if ( this.router.url === '/tasks/show-tasks') {
      this.taskService.getTasks().subscribe(tasks => {
        this.tasks = tasks;
      });
      this.pid = undefined;
    }
  }
  onRemoveClick(task: TaskModel) {
    if (confirm('Remove task from this model?')) {

      console.log('show-tasks task.pid: ' + task.pid.toString());
      console.log('show-tasks task.tid: ' + task.tid.toString());

      this.projectService.removeTaskFromProject(task.pid, task.tid);
      this.flashMessage.show('Task removed from this project', {
        cssClass: 'alert-success', timeout: 4000
      });
    }
  }

  onDeleteClick(task: TaskModel) {
    if (confirm('Permanently delete task from the system?')) {
      this.taskService.deleteTask(task);
      this.flashMessage.show('Task deleted', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.goBack();
    }
  }

  goBack() {
    this.location.back();
  }
}
