import {Component, Input, NgModule, OnInit, ViewChild} from '@angular/core';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import {TaskModel, TaskWeight} from '../task.model';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
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
    private router: Router
  ) {
    // this.taskWeights = this.getTaskWeights();
    console.log('Tadd: weight: ' + this.task.weight);
  }

  ngOnInit() {
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
      this.taskService.addTask(value);
      // Show message
      this.flashMessage.show('New client added', {
        cssClass: 'alert-success', timeout: 4000
      });
      // Redirect to dash
      this.router.navigate(['/home']);
    }
  }

}
