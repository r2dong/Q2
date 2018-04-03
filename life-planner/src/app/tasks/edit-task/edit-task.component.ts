import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { TaskModel, TaskWeight } from '../task.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  tid: string;
  task: TaskModel;
  TaskWeight = TaskWeight;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.tid = this.route.snapshot.params['tid'];
    // Get client
    this.taskService.getTask(this.tid).subscribe(task => {
      if (task != null) {
        console.log('task found for tid: ' + this.tid);
      }
      this.task = task;
    });
  }

  onSubmit({value, valid}: {value: TaskModel, valid: boolean}) {
    if (!valid) {
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      // Add id to client
      value.tid = this.tid;
      value.createdAt = this.task.createdAt;
      // Update client
      this.taskService.updateTask(value);
      this.flashMessage.show('Task updated', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.goBack();
    }
  }

  goBack(){
    this.location.back();
  }

}
