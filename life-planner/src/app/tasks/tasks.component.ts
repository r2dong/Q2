import { Component, OnInit } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {TaskModel, TaskWeight} from './task.model';
import { TasksService } from './tasks.service';



@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

/*
 id: string;
//  rid?: Role.id;
  name: string;
  urgent: boolean;
  important: boolean;
  dueDateTime?: Date;
  isComplete: boolean;
  weight: TaskWeight;
//  tagIDs?: string[];
  createdOn?: Date;

 */
export class TasksComponent implements OnInit {

  taskList = new BehaviorSubject([]);
  tasks: TaskModel[];
  taskToEdit: TaskModel;

  tid: string;
  taskName: string;
//  urgent: boolean;
//  important: boolean;
//  dueDateTime: Date;
//  isComplete: boolean;
//  weight: TaskWeight;
  // createdOn: Date;

  constructor(private tasksService: TasksService) {}


  ngOnInit() {
    this.tasksService.getTasks().subscribe(tasks => {
      console.log(tasks);
      this.tasks = tasks;
    });
  }

}
