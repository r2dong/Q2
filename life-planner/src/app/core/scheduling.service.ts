import { Injectable } from '@angular/core';
// import { TaskService } from '../Tasks/task.service';
// import { DummyTaskModel } from '../tasks/task.model'; stubbing for now
import { Observable } from 'rxjs';

// stubbing interface, use imported interface when actual one completed
export interface DummyTaskModel {
  //tid?: string;
  //rid?: string; // Role.id;
  name: string; // assume no identical names for now
  //pid?: string;
  urgent: boolean;
  important: boolean;
  dueDateTime?: string; // Date;
  isComplete: boolean;
  weight?: number; // for developing let it be a number
  //tagIDs?: string[];
  //createdAt?: Date;
  //updatedAt?: Date;
}

// dummy tasks for testing algorithms
let dummyTasks: DummyTaskModel[] = [
  {
    name: "rob a bank",
    urgent: true,
    important: true,
    dueDateTime: '2017-04-20',
    isComplete: false,
    weight: 10
  },
  {
    name: "pass this course",
    urgent: false,
    important: false,
    dueDateTime: '2017-04-30',
    isComplete: false,
    weight: 6
  },
  {
    name: "go to the gym",
    urgent: true,
    important: false,
    dueDateTime: '2017-04-15',
    isComplete: false,
    weight: 5
  },
  {
    name: "eat tacos",
    urgent: false,
    important: true,
    dueDateTime: '2017-04-17',
    isComplete: false,
    weight: 1
  },
]

@Injectable()
export class SchedulingService {

  constructor() {}
  //constructor(private taskService: TaskService) {}
  
  //createScheduleObWrapper() {
  //  this.taskService.getTasks().subscribe(tasks => {});
  //}

  /* for now complete all urgent tasks first, then interleave between non
  urgent ones */
  createSchedule(): DummyTaskModel[] {
    let tasks: DummyTaskModel[] = dummyTasks;
    /* probably go back to 3330 for scheduling algorithms for all urgent
    tasks, the work around extra time with remaining time */
    let schedule: DummyTaskModel[] = [];
    let q1: DummyTaskModel[] = [];
    let q2: DummyTaskModel[] = [];
    let q3: DummyTaskModel[] = [];
    let q4: DummyTaskModel[] = [];
    let deadlyUrgent: DummyTaskModel[] = []; // finish everything here before interleaving
    
    // characterize all tasks
    for (let i: number = 0; i < tasks.length; i++) {
      if (tasks[i].urgent && tasks[i].important) {
        q1.push(tasks[i]);
        console.log("pushing " + tasks[i].name + " to q1");
      }
      else if (tasks[i].urgent && !tasks[i].important)
        q3.push(tasks[i]);
      else if (!tasks[i].urgent && tasks[i].important)
        q2.push(tasks[i]);
      else if (!tasks[i].urgent && !tasks[i].important)
        q4.push(tasks[i]);
    }

    // complete all urgent stuff and then interleave
    for (let i: number = 0; i < q1.length; i++)
      schedule.push(q1[i]);
    for (let i: number = 0; i < q3.length; i++)
      schedule.push(q3[i]);
    // interleave
    let i2: number = 0;
    let i4: number = 0;
    let inter: number = 0;
    while (i2 < q2.length && i4 < q2.length)
      if (inter % 2 == 0)
        schedule.push(q2[i2++]);
      else
        schedule.push(q4[i4++]);
    for (i2; i2 < q2.length; i2++)
      schedule.push(q2[i2++]);
    for (i4; i4 < q4.length; i4++)
      schedule.push(q4[i4++]); 
    return schedule;
  }
}
