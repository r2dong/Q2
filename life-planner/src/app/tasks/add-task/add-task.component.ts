import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {TaskService} from '../task.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

import {TaskModel, TaskWeight} from '../task.model';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})

export class AddTaskComponent implements OnInit {
  isValidFormSubmitted = true;
  minTaskHours = 0;
  pid: string;
  task: TaskModel = {
    tid: '',
    name: '',
    hours: 0,
    urgent: false,
    important: false,
    dueDateTime: null,
    isComplete: false,
    weight: TaskWeight.NONE
  };
  TaskWeight = TaskWeight;
  // private taskWeights: TaskWeight[];
  private selectedTaskWeight: TaskWeight;


  @ViewChild('taskForm') form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private taskService: TaskService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
  ) {
    // this.taskWeights = this.getTaskWeights();
    console.log('Tadd: weight: ' + this.task.weight);
  }

  ngOnInit() {
    this.pid = this.route.snapshot.params['pid'];
    console.log('Tadd: pid: ' + this.pid);
  }

  onSubmit(form: NgForm) {
    this.isValidFormSubmitted = false;

    if (form.invalid) {
      // Show error
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
      return;
    } else {
      this.isValidFormSubmitted = true;
      this.task = form.value;
      this.task.isComplete = false; // need to seed value
      console.log('Tadd: weight after submit: ' + this.task.weight);
      // Add new client
      this.taskService.addTask(this.task, this.pid);
      // Show message
      this.flashMessage.show('New task added', {
        cssClass: 'alert-success', timeout: 4000
      });
      form.resetForm();
      // Redirect to tasks
      this.location.back();
    }
  }

  goBack() {
    this.location.back();
  }

}
