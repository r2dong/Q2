import { Component, OnInit } from '@angular/core';
import {TaskService} from './task.service';
import {TaskModel, TaskWeight} from './task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit {
  tasks: TaskModel[];

  constructor(private ts: TaskService) { }


  ngOnInit() {
    this.ts.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }


}
