import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {TaskService} from '../task.service';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

import {TaskModel, TaskWeight} from '../task.model';
import {Location} from '@angular/common';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  isValidFormSubmitted = true;
  minTaskHours = 0;
  tid: string;
  task: TaskModel;
  TaskWeight = TaskWeight;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private location: Location,
  ) {
  }

  ngOnInit() {
    this.tid = this.route.snapshot.params['tid'];
    // Get client
    this.taskService.getTask(this.tid).subscribe(task => {
      if (task != null) {
        console.log('task found for tid: ' + this.tid);
        console.log('task found has isComplete checkbox: ' + task.isComplete);
        console.log('task found has urgent checkbox: ' + task.urgent);
        console.log('task found has important checkbox: ' + task.important);
        this.task = task;
      }
    });
  }

  onSubmit(form: NgForm) {
    this.isValidFormSubmitted = false;

    console.log('form invalid?: ' + form.invalid);
    console.log('form pristine?: ' + form.pristine);
    console.log('form valid?: ' + form.valid);
    if (form.invalid) {
      // Show error
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
      return;
    } else {
      this.isValidFormSubmitted = true;
      this.task = form.value;
      // Add id to client
      this.task.tid = this.tid;
      // Update client
      this.taskService.updateTask(this.task);
      this.flashMessage.show('Task updated', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.goBack();
    }
  }

  goBack() {
    this.location.back();
  }

}
