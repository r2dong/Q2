import {Component, OnInit, ViewChild} from '@angular/core';
import { TaskService } from '../task.service';
import {ActivatedRoute, Router} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import {TaskModel, TaskWeight} from '../task.model';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})

export class AddTaskComponent implements OnInit {
  pid: string;
  task: TaskModel = {
    tid: '',
    name: '',
    dueDateTime: '',
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
    console.log(this.pid);
  }

  onSubmit({value, valid}: {value: TaskModel, valid: boolean}) {
    if (!valid) {
      // Show error
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      console.log('Tadd: weight after submit: ' + value.weight);
      // Add new client
      this.taskService.addTask(value, this.pid);
      // Show message
      this.flashMessage.show('New client added', {
        cssClass: 'alert-success', timeout: 4000
      });
      // Redirect to tasks
      this.location.back();
    }
  }

  goBack() {
    this.location.back();
  }

}
